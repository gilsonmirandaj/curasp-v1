import { EventCard } from "@/components/EventCard";
import { Filters } from "@/components/Filters";
import { getFilteredEvents, getGenreOptions, getVenueOptions } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const [events, venues, genres] = await Promise.all([
    getFilteredEvents(searchParams),
    getVenueOptions(),
    getGenreOptions(),
  ]);

  const currentVenue = Array.isArray(searchParams.venue) ? searchParams.venue[0] ?? "" : searchParams.venue ?? "";
  const currentGenre = Array.isArray(searchParams.genre) ? searchParams.genre[0] ?? "" : searchParams.genre ?? "";
  const currentPeriod = Array.isArray(searchParams.period) ? searchParams.period[0] ?? "upcoming" : searchParams.period ?? "upcoming";
  const currentQuery = Array.isArray(searchParams.q) ? searchParams.q[0] ?? "" : searchParams.q ?? "";
  const freeOnly = (Array.isArray(searchParams.freeOnly) ? searchParams.freeOnly[0] : searchParams.freeOnly) === "true";

  return (
    <main className="pageShell">
      <header className="hero">
        <span className="eyebrow">CuraSP</span>
        <h1>Agenda curada de shows em São Paulo</h1>
        <p>
          MVP em Next.js + Supabase. Sem banco configurado, o projeto funciona com fallback local.
        </p>
      </header>

      <Filters
        venues={venues}
        genres={genres}
        currentVenue={currentVenue}
        currentGenre={currentGenre}
        currentPeriod={currentPeriod}
        currentQuery={currentQuery}
        freeOnly={freeOnly}
      />

      <section className="sectionHeader">
        <div>
          <h2>Eventos</h2>
          <p>{events.length} resultado(s)</p>
        </div>
        <a href="/api/events" target="_blank" rel="noreferrer">
          Ver API JSON
        </a>
      </section>

      <section className="cardList">
        {events.length ? events.map((event) => <EventCard key={event.id} event={event} />) : <p>Nenhum evento encontrado.</p>}
      </section>
    </main>
  );
}
