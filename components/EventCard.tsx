import type { EventItem } from "@/lib/types";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card">
      <div className="timeBlock">
        <strong>{event.timeLabel || "—"}</strong>
        <span>{event.dateLabel}</span>
      </div>
      <div className="contentBlock">
        <h3>{event.title}</h3>
        {event.detail ? <p>{event.detail}</p> : null}
        <div className="metaRow">
          <span className="badge venue">{event.venue}</span>
          <span className="badge genre">{event.genre}</span>
          {event.priceText ? (
            <span className={`badge ${event.isFree ? "free" : "price"}`}>{event.priceText}</span>
          ) : null}
        </div>
        {event.sourceUrl ? (
          <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="ticketLink">
            Ver ingressos
          </a>
        ) : null}
      </div>
    </article>
  );
}
