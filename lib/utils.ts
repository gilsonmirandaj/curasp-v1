import type { EventItem, RawEvent } from "@/lib/types";

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function normalizeEvent(event: RawEvent, index: number): EventItem {
  const title = (event.name || "Evento sem nome").trim();
  const venue = (event.venue || "Local a confirmar").trim();
  const genre = (event.genre || "Sem gênero").trim();
  const priceText = (event.price || "").trim();
  const datePart = event.iso || event.date || `sem-data-${index}`;
  const slug = `${slugify(title)}-${slugify(venue)}-${slugify(datePart)}`;

  return {
    id: slug,
    slug,
    title,
    detail: (event.detail || "").trim(),
    dateLabel: (event.date || "A confirmar").trim(),
    timeLabel: (event.time || "—").trim(),
    startDate: event.iso || null,
    venue,
    venueSlug: (event.v || slugify(venue)).trim(),
    genre,
    priceText,
    isFree: /grat|free/i.test(priceText),
    sourceUrl: (event.url || "").trim(),
  };
}

export function compareEvents(a: EventItem, b: EventItem) {
  const da = a.startDate ?? "9999-12-31";
  const db = b.startDate ?? "9999-12-31";
  return da.localeCompare(db) || a.title.localeCompare(b.title);
}
