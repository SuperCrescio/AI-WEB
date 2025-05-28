-- Schema database Supabase per AI-WEB

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  created_at timestamp with time zone default now()
);

create table if not exists public.prompts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  content text,
  created_at timestamp with time zone default now()
);

create table if not exists public.files (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  filename text,
  path text,
  mimetype text,
  created_at timestamp with time zone default now()
);

alter table public.prompts enable row level security;
alter table public.files enable row level security;
alter table public.users enable row level security;

create policy "allow_prompt_owner" on public.prompts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "allow_file_owner" on public.files
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "allow_own_user" on public.users
  for select using (id = auth.uid());

create policy "allow_update_own_user" on public.users
  for update using (id = auth.uid()) with check (id = auth.uid());
