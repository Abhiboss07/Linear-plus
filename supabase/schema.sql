-- Create tables for Linear+
-- Run this in your Supabase SQL Editor

create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null
);

create table if not exists issues (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  priority text check (priority in ('Low', 'Medium', 'High')),
  status text default 'Backlog',
  project_id uuid references projects(id)
);

-- RLS Policies (Simple for demo)
alter table projects enable row level security;
alter table issues enable row level security;

create policy "Public read access" on projects for select using (true);
create policy "Public insert access" on projects for insert with check (true);
create policy "Public read access" on issues for select using (true);
create policy "Public insert access" on issues for insert with check (true);

-- Seed data
insert into projects (name, slug) values ('Demo Project', 'demo');
