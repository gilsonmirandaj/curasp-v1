const periods = [
  { value: "upcoming", label: "Próximos" },
  { value: "today", label: "Hoje" },
  { value: "week", label: "Esta semana" },
  { value: "all", label: "Todos" },
];

export function Filters({
  venues,
  genres,
  currentVenue,
  currentGenre,
  currentPeriod,
  currentQuery,
  freeOnly,
}: {
  venues: { slug: string; name: string }[];
  genres: string[];
  currentVenue: string;
  currentGenre: string;
  currentPeriod: string;
  currentQuery: string;
  freeOnly: boolean;
}) {
  return (
    <form className="filters" method="get">
      <input type="text" name="q" placeholder="Buscar artista, casa ou gênero" defaultValue={currentQuery} />

      <div className="filterGrid">
        <select name="period" defaultValue={currentPeriod || "upcoming"}>
          {periods.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select name="venue" defaultValue={currentVenue}>
          <option value="">Todas as casas</option>
          {venues.map((venue) => (
            <option key={venue.slug} value={venue.slug}>
              {venue.name}
            </option>
          ))}
        </select>

        <select name="genre" defaultValue={currentGenre}>
          <option value="">Todos os gêneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <label className="checkboxRow">
        <input type="checkbox" name="freeOnly" value="true" defaultChecked={freeOnly} />
        Apenas eventos grátis
      </label>

      <button type="submit">Aplicar filtros</button>
    </form>
  );
}
