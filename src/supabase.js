import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize with placeholders if not configured to avoid immediate crashes
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing! Please check Vercel environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'))
}

let sessionCheckPromise = null;

// Helper: Check if user is logged in
export const getCurrentUser = async () => {
  if (sessionCheckPromise) return sessionCheckPromise;

  sessionCheckPromise = (async () => {
    try {
      // 1. If we are in an OAuth callback, WAIT for the SDK to finish its automatic exchange.
      // Calling getSession() immediately can sometimes race with the SDK's internal auto-exchange.
      const hasAuthData = window.location.hash.includes('access_token=') || window.location.search.includes('code=');
      
      if (hasAuthData) {
        console.log('OAuth callback detected, waiting for SDK auto-exchange...');
        // Let we wait up to 2 seconds for a session to appear via the internal state
        for (let i = 0; i < 20; i++) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            console.log('Session established via auto-exchange');
            // Clean URL
            const url = new URL(window.location.href);
            url.searchParams.delete('code');
            url.searchParams.delete('state');
            url.hash = '';
            window.history.replaceState({}, document.title, url.toString());
            return session.user;
          }
          await new Promise(r => setTimeout(r, 100));
        }
      }

      // 2. Regular check
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('exchange') || msg.includes('code') || msg.includes('grant')) {
          console.warn('Final auth discovery failed:', error.message);
          // Only clear if it's actually still there
          const url = new URL(window.location.href);
          if (url.searchParams.has('code') || url.hash.includes('access_token')) {
            url.searchParams.delete('code');
            url.searchParams.delete('state');
            url.hash = '';
            window.history.replaceState({}, document.title, url.toString());
          }
          return null;
        }
      }

      return session?.user || null;
    } catch (err) {
      console.error('Session discovery error:', err);
      return null;
    } finally {
      setTimeout(() => { sessionCheckPromise = null; }, 1000);
    }
  })();

  return sessionCheckPromise;
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
