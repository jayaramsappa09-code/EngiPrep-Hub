CREATE TABLE IF NOT EXISTS public.years (
    id int PRIMARY KEY,
    name text UNIQUE NOT NULL,
    description text
);

CREATE TABLE IF NOT EXISTS public.semesters (
    id int PRIMARY KEY,
    year_id int REFERENCES public.years(id),
    name text NOT NULL,
    is_active boolean DEFAULT false, -- Feature flag for public access
    description text
);

-- Update subjects table
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS year_id int REFERENCES public.years(id);
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS semester_id int REFERENCES public.semesters(id);

CREATE TABLE IF NOT EXISTS public.units (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id uuid REFERENCES public.subjects(id),
    unit_number int NOT NULL,
    title text NOT NULL,
    description text
);

CREATE TABLE IF NOT EXISTS public.topics (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id uuid REFERENCES public.units(id),
    title text NOT NULL,
    content text, -- Optional rich text
    video_url text
);

-- Map existing notes to topics or units if necessary, 
-- or link notes to topics:
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS topic_id uuid REFERENCES public.topics(id);
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS unit_id uuid REFERENCES public.units(id);
