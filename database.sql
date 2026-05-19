-- ==========================================
-- ENGIPREP HUB - UNIFIED MASTER DATABASE SCHEMA
-- Designed with Non-Recursive RLS & Bulletproof Supabase Triggers
-- ==========================================

-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM & STATUS TYPE INITIALIZATION WITH EXISTENCE CHECKS
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contribution_status') THEN
        CREATE TYPE contribution_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'comment_status') THEN
        CREATE TYPE comment_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END $$;


-- 2. DYNAMIC POLICY CLEANUP (Eliminates old recursive definitions on profiles)
DO $$
DECLARE
    pol RECORD;
BEGIN
    -- Drop all policies on profiles to prevent any infinite recursion
    FOR pol IN 
        SELECT policyname, tablename 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'profiles'
    LOOP
        EXECUTE format('DROP POLICY %I ON public.profiles', pol.policyname);
    END LOOP;
END $$;


-- 3. CORE SCHEMA TABLE DEFINITIONS

-- user profiles
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

-- Ensure all columns exist on profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS branch TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS semester INT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS college_year INT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- subjects
CREATE TABLE IF NOT EXISTS public.subjects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text UNIQUE NOT NULL,
  code text NOT NULL,
  semester int NOT NULL,
  description text,
  color text DEFAULT 'blue',
  created_at timestamp with time zone DEFAULT now()
);

-- notes database
CREATE TABLE IF NOT EXISTS public.notes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  subject text NOT NULL,
  semester int NOT NULL,
  content text,
  type text CHECK (type IN ('notes', 'cheat-sheet', 'program', 'question', 'PYQ', 'Revision')) DEFAULT 'notes',
  weightage int DEFAULT 3, -- 1 to 5 scale of importance
  frequency int DEFAULT 1, -- exam occurrences counter
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Ensure weightage and frequency columns exist on notes (for pre-existing tables)
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS weightage int DEFAULT 3;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS frequency int DEFAULT 1;

-- Ensure notes type check constraint is fully updated to support 'Revision' type
ALTER TABLE public.notes DROP CONSTRAINT IF EXISTS notes_type_check;
ALTER TABLE public.notes ADD CONSTRAINT notes_type_check CHECK (type IN ('notes', 'cheat-sheet', 'program', 'question', 'PYQ', 'Revision'));

-- users study progress tracks
CREATE TABLE IF NOT EXISTS public.user_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id uuid REFERENCES public.notes(id) ON DELETE CASCADE,
  status boolean DEFAULT false,
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, note_id)
);

-- bookmarks
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id uuid REFERENCES public.notes(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, note_id)
);

-- study goals planner
CREATE TABLE IF NOT EXISTS public.study_goals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  subject text,
  target_date date,
  is_completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  category text DEFAULT 'General',
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Ensure category column exists
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category text DEFAULT 'General';

-- blog comments table
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

-- analytic tracking table
CREATE TABLE IF NOT EXISTS public.user_activity (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL, -- 'view_note', 'complete_note', 'bookmark'
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- system notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- gamified memory stats tracker
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_count int DEFAULT 0,
  last_active_at timestamp with time zone DEFAULT now(),
  total_study_minutes int DEFAULT 0,
  weak_subjects text[] DEFAULT '{}',
  completed_pyqs uuid[] DEFAULT '{}',
  reputation_points int DEFAULT 0,
  contribution_count int DEFAULT 0
);

-- user community collections (contributions)
CREATE TABLE IF NOT EXISTS public.contributions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  semester int NOT NULL,
  unit int,
  content_type text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  status contribution_status DEFAULT 'pending',
  admin_feedback text,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);


-- 4. POWERFUL SECURITY & UTILITIES (SECURITY DEFINER avoid list recursive checks)

-- Admin Check Logic (Completely bypasses any profile RLS policy by running as security definer)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;


-- Signup Sync Logic (Robust new profile creation with on conflict updates)
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

-- Re-attach cleanup triggers safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Contribution approval automation logic
CREATE OR REPLACE FUNCTION public.handle_contribution_approval()
RETURNS trigger AS $$
BEGIN
  IF (NEW.status = 'approved' AND OLD.status = 'pending') THEN
    
    -- Inject as notes
    INSERT INTO public.notes (
      title, 
      slug, 
      subject, 
      semester, 
      content, 
      type,
      is_published
    ) VALUES (
      NEW.title,
      lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || floor(random()*1000),
      NEW.subject,
      NEW.semester,
      '<h2>Description</h2><p>' || NEW.description || '</p><br><a href="' || NEW.file_url || '" class="btn-primary" target="_blank">Download Resource</a>',
      lower(NEW.content_type),
      true
    );

    -- Increase score & reputation
    UPDATE public.user_stats 
    SET reputation_points = reputation_points + 50,
        contribution_count = contribution_count + 1
    WHERE user_id = NEW.user_id;

    UPDATE public.profiles
    SET contributions_count = contributions_count + 1
    WHERE id = NEW.user_id;

  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_contribution_approved ON public.contributions;
CREATE TRIGGER on_contribution_approved
  AFTER UPDATE ON public.contributions
  FOR EACH ROW
  WHEN (NEW.status = 'approved')
  EXECUTE FUNCTION public.handle_contribution_approval();


-- 5. ROW LEVEL SECURITY (RLS) POLICIES DEFINITIONS

-- Enable overall row protection
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- Dynamic drop helper before defining rules
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname, tablename 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename IN ('profiles', 'notes', 'subjects', 'user_progress', 'bookmarks', 'study_goals', 'blog_posts', 'blog_comments', 'user_activity', 'notifications', 'user_stats', 'contributions')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- profiles Table Policies
CREATE POLICY "Public profiles are visible to all users" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can edit own profile updates" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Super admin powers on profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- notes policies
CREATE POLICY "Readable by everyone" ON public.notes FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admin write access on notes" ON public.notes FOR ALL USING (public.is_admin());

-- subjects policies
CREATE POLICY "Anyone can look up subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Admins manage subjects" ON public.subjects FOR ALL USING (public.is_admin());

-- user progress progress tracking
CREATE POLICY "User progress access control" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- bookmarks policies
CREATE POLICY "Bookmarks management" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- study goals planner policies
CREATE POLICY "Goals management" ON public.study_goals FOR ALL USING (auth.uid() = user_id);

-- blog posts tables policies
CREATE POLICY "Anyone views published articles" ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins handle publication writing" ON public.blog_posts FOR ALL USING (public.is_admin());

-- blog comments table policies
CREATE POLICY "Public sees approved comments" ON public.blog_comments FOR SELECT USING (status = 'approved' OR auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users push replies" ON public.blog_comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY "Own comments editing" ON public.blog_comments FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Comments removal rules" ON public.blog_comments FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- activity analytics policies
CREATE POLICY "Self view tracking activity logs" ON public.user_activity FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Insertion activity logs" ON public.user_activity FOR INSERT WITH CHECK (auth.uid() = user_id);

-- notifications alerts policies
CREATE POLICY "Alert system tracking" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- user stats cards policies
CREATE POLICY "Owner statistics analysis" ON public.user_stats FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Statistics administrative modification" ON public.user_stats FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- user collections contributions policies
CREATE POLICY "Contributions tracking select" ON public.contributions FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Contributions creation check" ON public.contributions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Contributions self updates or admin" ON public.contributions FOR ALL USING (auth.uid() = user_id OR public.is_admin());


-- 6. SEED PREPARATION DATA

-- subjects seeding
INSERT INTO public.subjects (title, code, semester, description, color)
VALUES
('Engineering Mathematics I', 'M1', 1, 'Matrices, Sequences, and Calculus.', 'blue'),
('Engineering Physics', 'PH', 1, 'Optics, Semiconductors, and Lasers.', 'purple'),
('C Programming', 'C', 1, 'Problem solving and logic in C.', 'emerald'),
('Basic Electrical Engineering', 'BEEE', 1, 'Fundamentals of circuits and machines.', 'amber'),
('English Communication Skills', 'EN', 1, 'Professional technical English.', 'rose'),
('Engineering Mathematics II', 'M2', 2, 'ODEs and Integral Calculus.', 'blue'),
('Engineering Chemistry', 'CH', 2, 'Materials and Water technology.', 'amber'),
('Data Structures', 'DS', 2, 'Advanced arrays, stacks, and queues.', 'indigo'),
('Environmental Science', 'ES', 2, 'Eco studies and social issues.', 'rose')
ON CONFLICT (title) DO UPDATE SET 
  code = EXCLUDED.code, 
  semester = EXCLUDED.semester, 
  description = EXCLUDED.description, 
  color = EXCLUDED.color;


-- curriculum notes seeds (Includes complete JNTUK R23 curriculum notes!)
INSERT INTO public.notes (title, slug, subject, semester, type, weightage, frequency, content)
VALUES

-- Math - I Complete Revision Notes with LaTeX
('M-I: Complete Exam Revision Notes', 'm1-complete-revision', 'Engineering Mathematics I', 1, 'Revision', 5, 10, '
# ENGINEERING MATHEMATICS - I (JNTUK R23 Syllabus)

## UNIT 1: MATRICES
* **Rank of a Matrix:** Defined as the size of the largest non-zero minor. Computationally solved by reducing the matrix to **Row-Echelon Form** using elementary row operations:
  * Non-zero row count matches the Rank $\rho(A)$.
* **Consistency of Linear Equations:** For $AX = B$:
  * **Consistent:** Rank of Co-efficient Matrix $A$ is equal to the Rank of Augmented Matrix $[A|B]$.
  * **Unique Solution:** $\rho(A) = \rho(A|B) = n$ (where $n$ is number of variables).
  * **Infinite Solutions:** $\rho(A) = \rho(A|B) < n$.
* **Eigenvalues & Eigenvectors:** Characteristic equation:
  $$|A - \lambda I| = 0$$
* **Cayley-Hamilton Theorem:** Every square matrix satisfies its own characteristic equation:
  $$a_n A^n + a_{n-1} A^{n-1} + \dots + a_0 I = 0$$
  * Highly useful to calculate matrix inverses $A^{-1}$ and powers $A^n$.

## UNIT 2: MEAN VALUE THEOREMS
* **Rolles Theorem:** If $f(x)$ is continuous in $[a, b]$, differentiable in $(a, b)$, and $f(a) = f(b)$, then there exists at least one $c \in (a, b)$ such that:
  $$f''(c) = 0$$
* **Lagranges Mean Value Theorem (LMVT):** If $f(x)$ is continuous in $[a,b]$ and differentiable in $(a,b)$, then there exists $c \in (a,b)$ such that:
  $$f''(c) = \frac{f(b) - f(a)}{b - a}$$
* **Cauchy Mean Value Theorem:** If $f(x)$ and $g(x)$ satisfy continuity/differentiability, then:
  $$\frac{f''(c)}{g''(c)} = \frac{f(b) - f(a)}{g(b) - g(a)}$$

## UNIT 3: MULTIVARIABLE CALCULUS & PARTIAL DIFFERENTIATION
* **Partial Derivative:** Rate of change along a specific variable coordinate axis, keeping all other variables constant.
* **Total Derivative:**
  $$du = \frac{\partial u}{\partial x}dx + \frac{\partial u}{\partial y}dy + \frac{\partial u}{\partial z}dz$$
* **Jacobian Determinant (Transformations):** For $u = f(x,y), v=g(x,y)$:
  $$J = \frac{\partial(u,v)}{\partial(x,y)} = \begin{vmatrix} \frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} \\ \frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} \end{vmatrix}$$
* **Extreme Value Criterion (Maxima/Minima):**
  * Let $r = \frac{\partial^2 f}{\partial x^2}$, $s = \frac{\partial^2 f}{\partial x \partial y}$, $t = \frac{\partial^2 f}{\partial y^2}$.
  * If $rt - s^2 > 0$ and $r < 0$, coordinate is an absolute **Maximum**.
  * If $rt - s^2 > 0$ and $r > 0$, coordinate is an absolute **Minimum**.

## UNIT 4: MULTIPLE INTEGRALS
* **Double Integrals:** Used to calculate area in 2D space:
  $$\text{Area} = \iint_{R} dx \, dy$$
* **Change of Order of Integration:** Helps convert complicated variable limits into integrable configurations by drawing regions and swapping horizontal/vertical strips.

## UNIT 5: SPECIAL FUNCTIONS
* **Beta Function:**
  $$B(m,n) = \int_{0}^{1} x^{m-1} (1-x)^{n-1} dx$$
* **Gamma Function:**
  $$\Gamma(n) = \int_{0}^{\infty} e^{-x} x^{n-1} dx$$
* **Symmetrical Beta-Gamma Relation Formula:**
  $$B(m, n) = \frac{\Gamma(m)\Gamma(n)}{\Gamma(m+n)}$$

---

🔥 **TOP IMPORTANT QUESTIONS FOR EXAMS**
1. Reduce the matrix to row-echelon form and find its rank:
   $$A = \begin{pmatrix} 1 & 2 & 3 & 0 \\ 2 & 4 & 3 & 2 \\ 3 & 2 & 1 & 3 \\ 6 & 8 & 7 & 5 \end{pmatrix}$$
2. Verify Cayley-Hamilton theorem for $A = \begin{pmatrix} 2 & -1 & 1 \\ -1 & 2 & -1 \\ 1 & -1 & 2 \end{pmatrix}$ and find $A^{-1}$.
3. Examine the extreme values of $f(x, y) = x^3 + y^3 - 3axy$.
4. Evaluate $\int_{0}^{1} \int_{x}^{\sqrt{x}} xy \, dy \, dx$ by changing the order of integration.
5. Prove that $\Gamma(1/2) = \sqrt{\pi}$.
'),

-- Engineering Physics Complete Notes
('Physics: Wave Optics & Quantum Mech', 'physics-unit-1-3', 'Engineering Physics', 1, 'notes', 4, 8, '
# ENGINEERING PHYSICS

## UNIT 1: WAVE OPTICS
* **Interference:** Phenomenon of redistribution of light energy due to superposition of coherent light waves.
* **Newtons Rings (Reflective):** Formed due to interference in a variable thickness air film between glass surfaces.
  * **Diameter of Bright Rings:** $D_n^2 = 2(2n-1)\lambda R$.
  * **Diameter of Dark Rings:** $D_n^2 = 4n\lambda R$.
  * Best technique to find radius of curvature $R$ or light wavelength $\lambda$.
* **Diffraction:** Bending of light rays around the edges of obstacle apertures:
  * **Fraunhofer vs Fresnel:** Fraunhofer places the system components at virtual infinity by using collimating/focusing optical lenses.

## UNIT 2: LASERS & FIBER OPTICS
* **Spontaneous vs Stimulated Emission:**
  * **Spontaneous:** Atoms move randomly, emitting phase-incoherent photons.
  * **Stimulated:** External photons force high-energy state atoms down, producing coherent, single-phase laser beams.
* **Population Inversion:** State of system where the number of atoms in excited stats ($N_2$) exceeds ground levels ($N_1$). Required to activate amplification.
* **Numerical Aperture (NA):** The efficiency index of light collection within optical fibers:
  $$NA = \sqrt{n_{\text{core}}^2 - n_{\text{cladding}}^2}$$

## UNIT 3: QUANTUM MECHANICS basics
* **De-Broglie Wave Theory:** Matter exhibits dual states. Particles has corresponding waves of:
  $$\lambda = \frac{h}{p} = \frac{h}{mv}$$
* **Heisenbergs Uncertainty Principle:** It is physically impossible to simultaneously compute momentum ($p$) and coordinate position ($x$) with absolute precision:
  $$\Delta x \cdot \Delta p \ge \frac{\hbar}{2}$$
* **Schrodinger Wave Equation (Time Independent):**
  $$\nabla^2 \psi + \frac{2m}{\hbar^2}(E - V)\psi = 0$$

---

🔥 **TOP IMPORTANT QUESTIONS FOR EXAMS**
1. Derive the diameter formulation of dark/bright fringes in Newtons Rings setup.
2. Formulate the conditions of Population Inversion. Explain Helium-Neon Laser construction.
3. Formulate and solve Schrodinger wave solution for an trapped particles inside a infinitely deep 1D box.
4. Calculate the Numerical Aperture of fiber with Core refractive index 1.55 and Cladding index 1.50.
'),

-- PPS (C Programming)
('PPS: C Language Fundamentals', 'pps-c-notes', 'C Programming', 1, 'program', 5, 12, '
# PROGRAMMING FOR PROBLEM SOLVING USING C

## UNIT 1: C BASICS & OPERATORS
* **Structure of a C Program:** Preprocessors $\to$ global values $\to$ local main routine.
* **Tokens:** Smallest logical code elements (keywords, constants, identifiers).
* **Data Types sizes:** `char` (1 Byte), `int` (2 or 4 Bytes), `float` (4 Bytes), `double` (8 Bytes).
* **Control structures flow:** logical conditions check (`&&`, `||`, `!`).

## UNIT 2: CONTROL FLOW LOOPS
* **Conditional:** `if-else`, nesting cascades, and `switch` block mappings.
* **Loops:**
  * `for` loops (known bounds evaluation).
  * `while` (pre-checking loops).
  * `do-while` (post-checking loops, guaranteed execution of at least once).

## UNIT 3: ARRAYS & STRINGS
* **Array Definition:** Sequential block of homogeneous data variables stored in contiguous addresses.
  * `int arr[5] = {10, 20, 30, 40, 50};`
* **Strings:** Null-terminated (`\0`) character sequence.
  * Essential string library operations:
    * `strlen(str)`: Length computation.
    * `strcpy(dest, src)`: Copier.
    * `strcmp(str1, str2)`: Comparator returning 0 if identical.

## UNIT 4: FUNCTIONS & POINTERS
* **Functions:** Modular code blocks designed for reuse.
  * **Recursion:** Call structure where functions call themselves recursively. Must have a base end.
* **Pointers:** Memory coordinates storage variables:
  * Reference operator (`&` - yields memory address).
  * Dereference pointer operator (`*` - yields value at points).

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    printf("Swapped values: x = %d, y = %d\n", x, y);
    return 0;
}
```

## UNIT 5: STRUCTURES & FILES
* **Structures:** User-declared composite data container storing heterogeneous elements:
  ```c
  struct Student {
      char name[50];
      int roll;
      float marks;
  };
  ```
* **File Operations:** Uses standard system file handlers (`fopen()`, `fclose()`, `fscanf()`, `fprintf()`).

---

🔥 **TOP IMPORTANT QUESTIONS FOR EXAMS**
1. Compare Call-by-Value with Call-by-Reference utilizing clean code structures.
2. Solve recursive implementation program calculating Nth Fibonacci number in C.
3. Describe multi-dimensional arrays logic. Write code checking matrix multiplication in C.
4. Explain file operations. Write code reading database records and copying contents.
'),

-- Engineering Chemistry Complete Notes
('Chemistry: Water Tech & Bonding', 'chem-water-tech', 'Engineering Chemistry', 2, 'notes', 4, 7, '
# ENGINEERING CHEMISTRY

## UNIT 1: MOLECULAR STRUCTURE & BONDING
* **Valence Bond (VB) Theory vs Molecular Orbital (MO) Theory:**
  * **VB Theory:** Bonding results from overlap of atomic orbitals on individual atoms.
  * **MO Theory:** Atomic orbitals merge to form molecular orbitals ($\sigma, \sigma^*, \pi, \pi^*$) delocalized over the whole molecule.
* **Bond Order Calculation:** Shows stability of molecules:
  $$\text{Bond Order} = \frac{N_{\text{bonding}} - N_{\text{anti-bonding}}}{2}$$

## UNIT 2: ELECTROCHEMISTRY & STORAGE ACCESS
* **Galvanic Cell:** Electromotive force generation converting chemical reactions directly to electricity.
* **Nernst Equation Formula:** Represent potential response change against concentration shifts:
  $$E = E^0 - \frac{R T}{n F} \ln Q \to E = E^0 - \frac{0.0592}{n}\log_{10} \frac{[\text{Products}]}{[\text{Reactants}]}$$
* **Batteries:** Primary types (irreversible Dry cell), vs Secondary rechargeable types (Lead-Acid / Lithium-Ion).

## UNIT 3: WATER TECHNOLOGY (Softening & Estimations)
* **Water Hardness:** Caused by divalent cations ($Ca^{2+}, Mg^{2+}$) reacting with dissolved carbon compounds.
* **EDTA Hardness Estimation:** Complexometric titration using metal indicators like Eriochrome Black-T (EBT).
  * Transition from wine red to ink blue at equivalent end point.
* **Softeners Process:**
  * **Zeolite Softening:** Utilizes hydrated aluminosilicate minerals which acts as ion exchangers replacing hardness ions with sodium ions ($Na^+$).
  * **Demineralization Process (Ion-Exchange Resin):** Complete extraction of positively and negatively charged ions.

---

🔥 **TOP IMPORTANT QUESTIONS FOR EXAMS**
1. Draw molecular orbital diagrams for Oxygen ($O_2$) and Nitrogen ($N_2$). Calculate Bond Order.
2. Provide Nernst reference formula. Explain potential determinations using Calomel reference electrodes.
3. Explain total hardness determination by EDTA complexometric titration.
4. Detail Zeolite process for industrial scale water softening.
'),

-- BEEE Complete Revision Notes
('BEEE: Circuit Laws & Machines', 'beee-revision', 'Basic Electrical Engineering', 1, 'Revision', 5, 9, '
# BASIC ELECTRICAL & ELECTRONICS ENGINEERING

## UNIT 1: DC CIRCUITS & NETWORK LAWS
* **Ohms Law:** Voltage drop is directly proportional to loop current at fixed temperature:
  $$V = I \cdot R$$
* **Kirchhoffs Current Law (KCL):** Sum of node currents matches zero:
  $$\sum I_{\text{incoming}} = \sum I_{\text{outgoing}}$$
* **Kirchhoffs Voltage Law (KVL):** Sum of closed loop potential differences matches zero:
  $$\sum V = 0$$

## UNIT 2: AC CIRCUITS & PRINCIPLES
* **Root Mean Square (RMS) Value:** Calculates equivalent heat work values:
  $$V_{\text{rms}} = \frac{V_m}{\sqrt{2}} \approx 0.707 \cdot V_m$$
* **Average Sinusoidal Value:**
  $$V_{\text{avg}} = \frac{2V_m}{\pi} \approx 0.637 \cdot V_m$$
* **Power Factor:** Ratio of actual dissipated real average power ($P$) to apparent power ($S$):
  $$\text{Power Factor} = \cos \phi = \frac{P}{S} = \frac{R}{Z}$$

## UNIT 3: AC/DC MACHINES & TRANSFORMERS
* **Transformer Mechanics:** Static voltage step-up or step-down device maintaining grid frequency.
  $$\frac{V_1}{V_2} = \frac{N_1}{N_2} = \frac{I_2}{I_1}$$
* **DC Motors:** Operates on Lorentz Force law. Converts electrical supply energy to torque.
  $$\text{Torque} \propto \Phi \cdot I_{\text{armature}}$$

## UNIT 4: SEMICONDUCTORS & DEVICES
* **P-N Junction diode:** Supports unidirectional forward current and acts as open switch in reverse mode.
* **Rectifiers:**
  * **Half Wave Rectifier:** Employs single diode. Low efficiency.
  * **Bridge Wave Rectifier:** Employs 4 diodes. High efficiency, steady ripples.

---

🔥 **TOP IMPORTANT QUESTIONS FOR EXAMS**
1. State KCL and KVL. Solve currents on a dual loop node configuration.
2. Explain construction and operation principles of single phase transform modules.
3. Compare Half-Wave rectifiers and Bridge-Wave rectifiers.
4. Calculate Impedance ($Z$) and Power Factor of RL circuit ($R=10\Omega, L=0.05\text{H}, f=50\text{Hz}$).
')

ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  subject = EXCLUDED.subject,
  semester = EXCLUDED.semester,
  type = EXCLUDED.type,
  weightage = EXCLUDED.weightage,
  frequency = EXCLUDED.frequency,
  content = EXCLUDED.content;


-- Seed sample blog posts matching the categories
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, is_published)
VALUES
('Why C is the Foundation of your CSE Career', 'c-programming-foundation', 'Understanding memory management and pointers is what separates a coder from a computer scientist.', '<h2>The power of pointer arithmetic</h2><p>Learning C programming allows you to understand how modern computer architectures allocate heap and stack memory, manage processing registers, and optimize compiler passes. Modern high-level languages like JavaScript or Python abstract these mechanisms, but a solid foundation in C ensures you remain unmatched as an engineering talent.</p>', 'Programming', true),
('How to handle JNTUK Exam Pressure', 'exam-stress-management', 'Stress management techniques for those dealing with back-to-back semester examinations.', '<h2>Optimize your study intervals</h2><p>Breathe. Semester exams under the JNTUK R23 regulations can feel daunting due to strict timelines. We advise practicing active recall on repeated 5-year PYQs. Spend 45 minutes studying, then rest for 15 minutes. This cognitive spacer technique is shown to boost memory retention by up to 40%.</p>', 'Exam Prep', true),
('M1 recurring questions: A 5-year analysis', 'maths-1-recurring-questions', 'We analyzed dozens of papers to find exactly which derivations appear every single year.', '<h2>The recurring syllabus nodes</h2><p>Historically, finding matrix ranks using the Echelon form, finding eigenvalues/eigenvectors, and applying the Cayley-Hamilton theorem are guaranteed 15-mark questions. Spend ample time solving linear systems and studying multivariable calculus extremas. Our math analysis PDF lists these specific derivations with direct answers.</p>', 'Mathematics', true),
('7 Secrets to Score O Grade in Engineering Physics', 'physics-o-grade-secrets', 'Most students struggle with the wave mechanics and quantum units. Here is the exact roadmap used by toppers to master JNTUK R23 Physics in just 7 days.', '<h2>Focus on Derivations and Delivers</h2><p>Step-by-step guidance to achieve an O Grade in Physics. Focus on Newtons Rings, Fraunhofer Diffraction of single/double slit, and the Schrödinger 1D box wave formulation. Mastery of these three derivations secures you a safe position to score outstanding grades in JNTUK assessments.</p>', 'Exam Prep', true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  is_published = EXCLUDED.is_published;


-- Force sync/refresh cache warning
NOTIFY pgrst, 'reload schema';
