-- Update Profiles table to include missing columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS branch TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS semester INT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS xp INT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS streak INT DEFAULT 0;

-- Ensure RLS policies are up to date
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- If someone wanted to use upsert, they might need INSERT permission too
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
