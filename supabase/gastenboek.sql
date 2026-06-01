-- Gastenboek — tabel + Row Level Security voor Martenastate
-- Plak dit in het Supabase-dashboard → SQL Editor → Run.
-- Nodig na een project-restore waarbij de tabel is gewist (PGRST205:
-- "Could not find the table 'public.gastenboek'"). De frontend
-- (gastenboek.html) verwacht exact deze kolommen.

create table if not exists public.gastenboek (
  id      uuid        primary key default gen_random_uuid(),
  naam    text        not null,
  bericht text        not null,
  datum   timestamptz not null default now(),
  likes   integer     not null default 0
);

-- Row Level Security aanzetten
alter table public.gastenboek enable row level security;

-- Iedereen (anon) mag berichten lezen
drop policy if exists "gastenboek lezen" on public.gastenboek;
create policy "gastenboek lezen" on public.gastenboek
  for select using (true);

-- Iedereen mag een bericht plaatsen
drop policy if exists "gastenboek plaatsen" on public.gastenboek;
create policy "gastenboek plaatsen" on public.gastenboek
  for insert with check (true);

-- Iedereen mag liken (UPDATE op de likes-kolom)
-- NB: bewust open gelaten, conform eerdere keuze. Wil je het strakker:
-- beperk later tot alleen de likes-kolom of voeg een honeypot toe.
drop policy if exists "gastenboek liken" on public.gastenboek;
create policy "gastenboek liken" on public.gastenboek
  for update using (true) with check (true);

-- PostgREST de nieuwe tabel laten zien (schema-cache verversen)
notify pgrst, 'reload schema';
