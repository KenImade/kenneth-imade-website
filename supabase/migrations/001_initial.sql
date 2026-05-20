-- ============================================================
-- Portfolio — initial schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Projects ───────────────────────────────────────────────────
create table if not exists projects (
  id               uuid        primary key default gen_random_uuid(),
  title            text        not null,
  description      text,
  tags             text[]      not null default '{}',
  live_url         text,
  repo_url         text,
  cover_image_url  text,
  published        boolean     not null default false,
  sort_order       int         not null default 0,
  created_at       timestamptz not null default now()
);

-- Posts ──────────────────────────────────────────────────────
create table if not exists posts (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  slug         text        not null,
  excerpt      text,
  content      text        not null default '',
  published    boolean     not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  constraint posts_slug_unique unique (slug)
);

-- Contact messages ───────────────────────────────────────────
create table if not exists contact_messages (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz not null default now()
);

-- ── Row Level Security ───────────────────────────────────────
alter table projects        enable row level security;
alter table posts           enable row level security;
alter table contact_messages enable row level security;

-- Public: read published content only
create policy "public read projects"
  on projects for select
  using (published = true);

create policy "public read posts"
  on posts for select
  using (published = true);

-- Owner (authenticated): full access to all rows
create policy "owner all projects"
  on projects for all
  using     (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "owner all posts"
  on posts for all
  using     (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "owner read messages"
  on contact_messages for select
  using (auth.role() = 'authenticated');

-- contact_messages INSERT is handled server-side via the service role key
-- (bypasses RLS entirely), so no insert policy is needed here.
