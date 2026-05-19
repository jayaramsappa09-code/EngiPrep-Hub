-- STUDENT IDENTITY SYSTEM SETUP (SUPABASE SQL) - ANTI-RECURSION VERSION
-- This script fixes the "infinite recursion detected in policy for relation 'profiles'" error.

-- 1. Table Consistency
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

-- 2. SECURITY: Drop ALL potentially recursive policies
-- These names often conflict and cause the infinite recursion error.
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are publicly viewable" ON public.profiles;
DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own record" ON public.profiles;

-- 3. IDENTITY RE-INITIALIZATION (Non-Recursive Policies)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view any profile (Standard for Social/Edu apps)
CREATE POLICY "Profiles are publicly viewable" 
  ON public.profiles FOR SELECT 
  USING (true);

-- Policy: Users can only edit THEIR OWN profile
CREATE POLICY "Users can manage own profile" 
  ON public.profiles FOR ALL 
  USING (auth.uid() = id);

-- 4. LOGIN / SIGNUP RESILIENCE (Trigger Fix)
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
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-attach trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Backfill & Admin Helper
-- Ensure all current users have a row
INSERT INTO public.profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Admin Check Function (Non-recursive)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;
