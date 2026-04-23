create extension if not exists pgcrypto;

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  city text not null default 'São Paulo',
  state text not null default 'SP',
  neighborhood text,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  detail text,
  date_label text,
  time_label text,
  start_date date,
  genre text,
  price_text text,
  is_free boolean not null default false,
  source_url text,
  venue_id uuid references public.venues(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace view public.events_view as
select
  e.id,
  e.slug,
  e.title,
  coalesce(e.detail, '') as detail,
  coalesce(e.date_label, 'A confirmar') as date_label,
  coalesce(e.time_label, '—') as time_label,
  e.start_date,
  coalesce(v.name, 'Local a confirmar') as venue,
  coalesce(v.slug, 'local-a-confirmar') as venue_slug,
  coalesce(e.genre, 'Sem gênero') as genre,
  coalesce(e.price_text, '') as price_text,
  e.is_free,
  coalesce(e.source_url, '') as source_url
from public.events e
left join public.venues v on v.id = e.venue_id;
