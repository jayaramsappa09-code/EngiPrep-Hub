-- ==========================================
-- ENGIPREP HUB SCHEMA FIXES & UPGRADES
-- Completely fixes Infinite Recursion on Profiles and aligns Tables
-- ==========================================

-- 1. Table Consistency Repairs
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  branch text,
  semester int,
  college_year int,
  bio text,
  skills text[],
  role text CHECK (role IN ('user', 'admin')) DEFAULT 'user',
  is_pro boolean DEFAULT false,
  xp int DEFAULT 0,
  streak int DEFAULT 0,
  trust_score int DEFAULT 10,
  contributions_count int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT username_length CHECK (username IS NULL OR char_length(username) >= 3)
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS branch TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS semester INT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Ensure custom comment_status enum exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'comment_status') THEN
        CREATE TYPE comment_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END $$;

-- 2. DYNAMIC CLEANUP OF ALL CONTENDING PROFILE POLICIES
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'profiles'
    LOOP
        EXECUTE format('DROP POLICY %I ON public.profiles', pol.policyname);
    END LOOP;
END $$;


-- 3. SETUP OF CLEAN NON-RECURSIVE RLS FOR PROFILE TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Select: Public access
CREATE POLICY "Profiles are publicly viewable" ON public.profiles FOR SELECT USING (true);

-- Edit: Own profile row only
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);


-- 4. SIGNUP SYNCHRONIZER (SECURITY DEFINER Trigger Function)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();

  -- Safe user stats initialization
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Rebind system triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 5. Safe non-recursive Admin Check Function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Bind Admin Access Policy dynamically
CREATE POLICY "Admins bypass RLS restrictions" ON public.profiles FOR ALL USING (public.is_admin());


-- 6. Re-align comments policies safely incorporating the recursive-free admin checks
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  guest_name TEXT,
  content TEXT NOT NULL,
  parent_id uuid REFERENCES public.blog_comments(id) ON DELETE CASCADE,
  status comment_status DEFAULT 'pending',
  admin_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Drop prior comments rule names
DROP POLICY IF EXISTS "Anyone can view comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Authenticated users can post comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Users can manage own comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON public.blog_comments;

CREATE POLICY "Anyone can view approved comments" ON public.blog_comments
  FOR SELECT USING (status = 'approved' OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Authenticated users can post comments" ON public.blog_comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can manage own comments" ON public.blog_comments
  FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can delete own comments" ON public.blog_comments
  FOR DELETE USING (auth.uid() = user_id OR public.is_admin());


-- Force refresh API Gateway schema caches
NOTIFY pgrst, 'reload schema';
