export type RawEvent = {
  name: string;
  detail?: string;
  date?: string;
  time?: string;
  iso?: string;
  venue?: string;
  v?: string;
  genre?: string;
  price?: string;
  url?: string;
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  detail: string;
  dateLabel: string;
  timeLabel: string;
  startDate: string | null;
  venue: string;
  venueSlug: string;
  genre: string;
  priceText: string;
  isFree: boolean;
  sourceUrl: string;
};
