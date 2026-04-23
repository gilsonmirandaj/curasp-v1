import { createClient } from "@supabase/supabase-js";
import rawData from "@/events.json";
import type { EventItem, RawEvent } from "@/lib/types";
import { compareEvents, normalizeEvent } from "@/lib/utils";

function getFallbackEvents(): EventItem[] {
  const events = (Array.isArray(rawData) ? rawData : rawData.events || []) as RawEvent[];
  return events.map(normalizeEvent).sort(compareEvents);
}

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getEvents(): Promise<EventItem[]> {
  if (!hasSupabaseEnv()) {
    return getFallbackEvents();
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error } = await supabase
    .from("events_view")
    .select("id, slug, title, detail, date_label, time_label, start_date, venue, venue_slug, genre, price_text, is_free, source_url")
    .order("start_date", { ascending: true });

  if (error || !data) {
    return getFallbackEvents();
  }

  return data.map((row: any) => ({
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    detail: row.detail || "",
    dateLabel: row.date_label || "A confirmar",
    timeLabel: row.time_label || "—",
    startDate: row.start_date || null,
    venue: row.venue || "Local a confirmar",
    venueSlug: row.venue_slug || "local-a-confirmar",
    genre: row.genre || "Sem gênero",
    priceText: row.price_text || "",
    isFree: Boolean(row.is_free),
    sourceUrl: row.source_url || "",
  }));
}

export async function getFilteredEvents(searchParams?: URLSearchParams | Record<string, string | string[] | undefined>) {
  const events = await getEvents();
  const getParam = (key: string) => {
    if (!searchParams) return "";
    if (searchParams instanceof URLSearchParams) return searchParams.get(key) || "";
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] || "" : value || "";
  };

  const q = getParam("q").toLowerCase().trim();
  const venue = getParam("venue").toLowerCase().trim();
  const genre = getParam("genre").toLowerCase().trim();
  const period = getParam("period").toLowerCase().trim() || "upcoming";
  const freeOnly = getParam("freeOnly").toLowerCase() === "true";

  const today = new Date().toISOString().slice(0, 10);
  const weekEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  return events.filter((event) => {
    if (q) {
      const haystack = `${event.title} ${event.detail} ${event.venue} ${event.genre}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (venue && event.venueSlug.toLowerCase() !== venue && event.venue.toLowerCase() !== venue) return false;
    if (genre && !event.genre.toLowerCase().includes(genre)) return false;
    if (freeOnly && !event.isFree) return false;

    if (period !== "all") {
      const iso = event.startDate;
      if (period === "upcoming" && iso && iso < today) return false;
      if (period === "today" && iso !== today) return false;
      if (period === "week" && (iso === null || iso < today || iso > weekEnd)) return false;
    }

    return true;
  });
}

export async function getVenueOptions() {
  const events = await getEvents();
  const map = new Map<string, string>();
  for (const event of events) {
    map.set(event.venueSlug, event.venue);
  }
  return [...map.entries()].map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getGenreOptions() {
  const events = await getEvents();
  const set = new Set<string>();
  for (const event of events) {
    event.genre.split(/[\/,]/).forEach((item) => {
      const value = item.trim();
      if (value) set.add(value);
    });
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
