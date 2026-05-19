-- STUDENT IDENTITY SYSTEM SETUP (SUPABASE SQL) - RECURSION FIX
-- Direct FIX for "bio" column missing, "Login from Mail", and "Infinite Recursion" issues.

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

-- Ensure "bio" and other columns exist (for existing tables)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS branch TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS semester INT;

-- 2. Resilient Identity Trigger (Fixes Login/Signup Failures)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  default_name TEXT;
BEGIN
  default_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'name', 
    split_part(NEW.email, '@', 1)
  );

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    default_name,
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

-- 3. Safety Check: Sync any missing users immediately
-- Run this once to fix users who "can't login" due to missing profile rows
INSERT INTO public.profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 4. NON-RECURSIVE RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public Read (No recursion)
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles 
  FOR SELECT USING (true);

-- Policy 2: User Manage Self (No recursion)
DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
CREATE POLICY "Users can manage own profile" ON public.profiles 
  FOR ALL USING (auth.uid() = id);

-- Policy 3: Admin Global View (No recursion)
-- We check role but since its on profiles for all, we must be careful.
-- Actually, the "Public can view profiles" already allows admins to SELECT.
-- If an admin needs to UPDATE others, use a SECURITY DEFINER function to avoid recursion.
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;
