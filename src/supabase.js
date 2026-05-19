import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize with placeholders if not configured to avoid immediate crashes
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing! Please check Vercel environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage
    }
  }
)

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'))
}

let currentUser = null;
let sessionCheckPromise = null;

// Helper: Check if user is logged in
export const getCurrentUser = async () => {
  if (currentUser) return currentUser;
  if (sessionCheckPromise) return sessionCheckPromise;

  sessionCheckPromise = (async () => {
    try {
      // 1. Detect if we are in an OAuth callback flow
      const url = new URL(window.location.href);
      const isCallback = url.hash.includes('access_token=') || url.searchParams.has('code');
      
      if (isCallback) {
        console.log('OAuth transformation in progress... stabilizing session.');
        // Wait for the SDK to process the URL and establish a session
        for (let i = 0; i < 20; i++) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                currentUser = session.user;
                // Clean URL after success
                const cleanUrl = new URL(window.location.href);
                cleanUrl.searchParams.delete('code');
                cleanUrl.searchParams.delete('state');
                cleanUrl.hash = '';
                window.history.replaceState({}, document.title, cleanUrl.toString());
                return currentUser;
            }
            await new Promise(r => setTimeout(r, 200));
        }
      }

      // 2. Standard check
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        // If it's a code exchange error, it might already be handled or expired
        if (error.message.toLowerCase().includes('exchange') || error.message.toLowerCase().includes('code')) {
           console.warn('Auth session check: Token likely consumed or session already exists.');
        } else {
           console.error('Session Error:', error.message);
        }
      }

      currentUser = session?.user || null;
      return currentUser;
    } catch (err) {
      console.error('Session discovery error:', err);
      return null;
    } finally {
      sessionCheckPromise = null;
    }
  })();

  return sessionCheckPromise;
}

// Global Auth Guard for pages
export const requireAuth = async (redirectTo = '/auth.html') => {
    const user = await getCurrentUser();
    if (!user) {
        console.warn('Access Denied: Authentication required.');
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error') || 'session_required';
        window.location.replace(`${redirectTo}?error=${error}`);
        return null;
    }
    return user;
}

// Helper: Get user profile (including role)
export const getUserProfile = async (userId) => {
  if (!userId || !isSupabaseConfigured()) return null
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    
    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data
  } catch (err) {
    console.error('Profile Fetch Error:', err)
    return null
  }
}

// Helper: Update user profile (with upsert to be safe)
export const updateUserProfile = async (userId, updates) => {
  if (!userId || !isSupabaseConfigured()) return { error: 'Not configured' }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...updates,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })
    
    if (error) throw error
    return { data, error: null }
  } catch (err) {
    console.error('Profile Update Error:', err)
    return { error: err.message }
  }
}

// Helper: Get contributions
export const getUserContributions = async (userId) => {
  if (!userId || !isSupabaseConfigured()) return []
  try {
    const { data, error } = await supabase
      .from('contributions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (err) {
    console.error('Contributions Fetch Error:', err)
    return []
  }
}

// Helper: Submit contribution
export const submitContribution = async (userId, details) => {
  if (!userId || !isSupabaseConfigured()) return { error: 'Not configured' }
  try {
    const { data, error } = await supabase
      .from('contributions')
      .insert([
        {
          user_id: userId,
          ...details,
          status: 'pending'
        }
      ])
    
    if (error) throw error
    return { data, error: null }
  } catch (err) {
    console.error('Contribution Submit Error:', err)
    return { error: err.message }
  }
}
