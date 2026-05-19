-- Comments Table for Blog
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  guest_name TEXT, -- Fallback if not logged in
  content TEXT NOT NULL,
  parent_id uuid REFERENCES public.blog_comments(id) ON DELETE CASCADE, -- For nested replies
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Comments
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments" ON public.blog_comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can post comments" ON public.blog_comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can manage own comments" ON public.blog_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON public.blog_comments
  FOR DELETE USING (auth.uid() = user_id);
