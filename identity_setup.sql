-- STUDENT IDENTITY SYSTEM SETUP (SUPABASE SQL)
-- Direct FIX for "bio" column missing and "Login from Mail" issues.

-- 1. Create or Update Profiles Table
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
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- 2. Add missing columns safely if table existed but was old
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS branch TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS semester INT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS xp INT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS streak INT DEFAULT 0;

-- 3. Identity Trigger (Ensures login works seamlessly)
-- Handles both new signups and legacy users who might be missing a profile row.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-attach trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- 5. Backfill profiles for existing users (run this once)
INSERT INTO public.profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
ON CONFLICT (id) DO NOTHING;
