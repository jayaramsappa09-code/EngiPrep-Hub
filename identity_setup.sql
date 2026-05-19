-- ========================================================
-- STUDENT IDENTITY SYSTEM SETUP (SUPABASE SQL)
-- Direct Non-Recursive Solution for RLS Policies and Schema
-- ========================================================

-- 1. Create or Align Profiles Table
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

-- Quick columns check
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS branch TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS semester INT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. DYNAMICALLY DROP ALL PREVIOUS COLLIDING POLICIES ON PROFILES
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


-- 3. IDENTITY RE-INITIALIZATION (Strictly Non-Recursive Policies)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy (SELECT): Anyone can view profiles (Public community)
CREATE POLICY "Profiles are publicly viewable" 
  ON public.profiles FOR SELECT 
  USING (true);

-- Policy (ALL): Users can only manage their own profile row (No subquery role check to avoid recursion!)
CREATE POLICY "Users can manage own profile" 
  ON public.profiles FOR ALL 
  USING (auth.uid() = id);


-- 4. LOGIN / SIGNUP SYNC TRIGGER (Resilient Trigger Fix)
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

-- Re-attach Trigger safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 5. Backfill missing accounts
INSERT INTO public.profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
ON CONFLICT (id) DO NOTHING;


-- 6. Safe non-recursive Admin check function (SECURITY DEFINER bypasses RLS on profiles)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Safe Admin Policy using is_admin() (completely non-recursive because functions run as owner bypassing RLS)
CREATE POLICY "Admins have master access on profiles" 
  ON public.profiles FOR ALL 
  USING (public.is_admin());

-- Force refresh postgres schema cache
NOTIFY pgrst, 'reload schema';
