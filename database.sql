-- DATABASE SCHEMA FOR ENGIPREP HUB

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Notes Table
create table if not exists notes (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  subject text not null,
  semester int not null,
  content text,
  type text check (type in ('notes', 'cheat-sheet', 'program', 'question', 'PYQ', 'Revision')) default 'notes',
  weightage int default 3, -- 1-5 scale of importance
  frequency int default 1, -- how many times appeared in exams
  is_published boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. User Progress Table
create table if not exists user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  note_id uuid references notes(id) on delete cascade,
  status boolean default false,
  updated_at timestamp with time zone default now(),
  unique(user_id, note_id)
);

-- 3. Bookmarks Table
create table if not exists bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  note_id uuid references notes(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, note_id)
);

-- 4. User Profiles (to handle roles)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  username text,
  full_name text,
  branch text,
  semester int,
  role text check (role in ('user', 'admin')) default 'user',
  is_pro boolean default false,
  xp int default 0,
  streak int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS (Row Level Security)

-- Notes: Public read, Admin write
alter table notes enable row level security;
create policy "Public read access for published notes" on notes for select using (is_published = true);
create policy "Admin full access for notes" on notes for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- Progress: User only
alter table user_progress enable row level security;
create policy "Users can manage their own progress" on user_progress for all using (auth.uid() = user_id);

-- Bookmarks: User only
alter table bookmarks enable row level security;
create policy "Users can manage their own bookmarks" on bookmarks for all using (auth.uid() = user_id);

-- Profiles: Public read (for blog authors), User manage self
alter table profiles enable row level security;
create policy "Public can view profiles" on profiles for select using (true);
create policy "Users can manage own profile" on profiles for all using (auth.uid() = id);

-- Trigger for profile creation on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'User'), 
    'user'
  )
  on conflict (id) do update 
  set 
    email = excluded.email,
    full_name = coalesce(excluded.full_name, profiles.full_name);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Study Goals Table
create table if not exists study_goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  subject text,
  target_date date,
  is_completed boolean default false,
  created_at timestamp with time zone default now()
);

-- 6. Blog Posts Table
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  author_id uuid references profiles(id),
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS for Blog
alter table blog_posts enable row level security;
create policy "Public read access for published blog posts" on blog_posts for select using (is_published = true);
create policy "Admin full access for blog posts" on blog_posts for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- 7. User Activity (for Admin Analytics)
create table if not exists user_activity (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  action text not null, -- e.g., 'view_note', 'complete_note', 'bookmark'
  metadata jsonb,
  created_at timestamp with time zone default now()
);

alter table user_activity enable row level security;
create policy "Users can view own activity" on user_activity for select using (auth.uid() = user_id);
create policy "Admins can view all activity" on user_activity for select using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin')
);

-- 8. Notifications
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

alter table notifications enable row level security;
create policy "Users can manage own notifications" on notifications for all using (auth.uid() = user_id);

-- 11. User Stats (Mental Memory System)
create table if not exists user_stats (
  user_id uuid primary key references auth.users(id) on delete cascade,
  streak_count int default 0,
  last_active_at timestamp with time zone default now(),
  total_study_minutes int default 0,
  weak_subjects text[] default '{}',
  completed_pyqs uuid[] default '{}',
  reputation_points int default 0,
  contribution_count int default 0
);

-- 12. Community Contribution System
create type contribution_status as enum ('pending', 'approved', 'rejected');

create table if not exists contributions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  subject text not null,
  semester int not null,
  unit int,
  content_type text not null,
  file_url text not null,
  file_type text,
  status contribution_status default 'pending',
  admin_feedback text,
  tags text[] default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS for Contributions
alter table contributions enable row level security;

create policy "Users can view own contributions" 
  on contributions for select 
  using (auth.uid() = user_id);

create policy "Users can submit contributions" 
  on contributions for insert 
  with check (auth.uid() = user_id);

create policy "Admins can manage all contributions"
  on contributions for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Trigger to sync approved contributions to notes
create or replace function handle_contribution_approval()
returns trigger as $$
begin
  if (new.status = 'approved' and old.status = 'pending') then
    -- Convert contribution to a public note
    insert into public.notes (
      title, 
      slug, 
      subject, 
      semester, 
      content, 
      type,
      is_published
    ) values (
      new.title,
      lower(replace(new.title, ' ', '-')) || '-' || floor(random()*1000),
      new.subject,
      new.semester,
      '<h2>Description</h2><p>' || new.description || '</p><br><a href="' || new.file_url || '" class="btn-primary" target="_blank">Download Resource</a>',
      lower(new.content_type),
      true
    );

    -- Reward the contributor
    update public.user_stats 
    set reputation_points = reputation_points + 50,
        contribution_count = contribution_count + 1
    where user_id = new.user_id;

  end if;
  return new;
end;
$$ language plpgsql;

create trigger on_contribution_approved
  after update on contributions
  for each row
  when (new.status = 'approved')
  execute function handle_contribution_approval();

-- 9. INITIAL DATA SEEDING
-- (Note: Only running if empty or on conflict ignore)

-- Insert sample notes for all 8 subjects
INSERT INTO public.notes (title, slug, subject, semester, type, content)
VALUES 
('Matrices & Linear Algebra', 'maths-1-matrices', 'Mathematics I', 1, 'notes', '<h1>Matrices</h1><p>Fundamental concepts of Rank, Echelon form, and LU decomposition.</p>'),
('Wave Optics', 'physics-wave-optics', 'Engineering Physics', 1, 'notes', '<h1>Interference & Diffraction</h1><p>Study of Huygens Principle, Youngs double slit, and Fraunhofer diffraction.</p>'),
('Recursion in C', 'c-programming-recursion', 'C Programming', 1, 'program', '<h1>Recursion in C</h1><pre>void recurse() { ... }</pre><p>Base cases and recursive step analysis.</p>'),
('The Art of Listening', 'english-listening', 'English Communication Skills', 1, 'notes', '<h1>Communication Skills</h1><p>Effective listening techniques and barriers to communication.</p>'),
('Differential Equations', 'maths-2-diff-eq', 'Mathematics II', 2, 'notes', '<h1>ODEs</h1><p>Solving first and second order linear differential equations with constant coefficients.</p>'),
('Water Technology', 'chemistry-water', 'Engineering Chemistry', 2, 'notes', '<h1>Water Treatment</h1><p>Hardness of water, estimation by EDTA, and zeolite process.</p>'),
('Linked List Basics', 'ds-linked-list', 'Data Structures Basics', 2, 'notes', '<h1>Advanced Data Structures</h1><p>Single, double, and circular linked lists with operations.</p>'),
('Ecosystems & Biodiversity', 'env-biodiversity', 'Environmental Science', 2, 'notes', '<h1>Environmental Studies</h1><p>Classification of ecosystems, food chains, and conservation of biodiversity.</p>')
ON CONFLICT (slug) DO NOTHING;

-- 10. Subjects Table
create table if not exists subjects (
  id uuid primary key default uuid_generate_v4(),
  title text unique not null,
  code text not null,
  semester int not null,
  description text,
  color text default 'blue',
  created_at timestamp with time zone default now()
);

alter table subjects enable row level security;
create policy "Public read access for subjects" on subjects for select using (true);

-- Seed Subjects
INSERT INTO public.subjects (title, code, semester, description, color)
VALUES
('Engineering Mathematics I', 'M1', 1, 'Matrices, Sequences, and Calculus.', 'blue'),
('Engineering Physics', 'PH', 1, 'Optics, Semiconductors, and Lasers.', 'purple'),
('C Programming', 'C', 1, 'Problem solving and logic in C.', 'emerald'),
('English Communication Skills', 'EN', 1, 'Professional technical English.', 'rose'),
('Engineering Mathematics II', 'M2', 2, 'ODEs and Integral Calculus.', 'blue'),
('Engineering Chemistry', 'CH', 2, 'Materials and Water technology.', 'amber'),
('Data Structures Basics', 'DS', 2, 'Advanced arrays, stacks, and queues.', 'indigo'),
('Environmental Science', 'ES', 2, 'Eco studies and social issues.', 'rose')
ON CONFLICT (title) DO NOTHING;

-- 13. Blog Comments Table
CREATE TYPE comment_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE IF NOT EXISTS public.blog_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  status comment_status DEFAULT 'pending',
  admin_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view comments" ON public.blog_comments;
CREATE POLICY "Anyone can view approved comments" ON public.blog_comments
  FOR SELECT USING (status = 'approved' OR (auth.uid() IS NOT NULL AND (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  )));

DROP POLICY IF EXISTS "Authenticated users can post comments" ON public.blog_comments;
CREATE POLICY "Authenticated users can post comments" ON public.blog_comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own comments" ON public.blog_comments;
CREATE POLICY "Users can manage own comments" ON public.blog_comments
  FOR UPDATE USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

DROP POLICY IF EXISTS "Users can delete own comments" ON public.blog_comments;
CREATE POLICY "Users can delete own comments" ON public.blog_comments
  FOR DELETE USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 1. Get the user_id from the user list in Supabase Auth
-- 2. Run: UPDATE public.profiles SET role = 'admin' WHERE id = 'USER_ID_HERE';
