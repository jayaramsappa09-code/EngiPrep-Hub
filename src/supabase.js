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
      const url = new URL(window.location.href);
      const isCallback = url.hash.includes('access_token=') || url.searchParams.has('code');
      
      if (isCallback) {
        console.log('OAuth transformation in progress... waiting for SDK internal exchange.');
        
        // Strategy: Wait for onAuthStateChange to fire a SIGNED_IN event
        // This is safer than polling getSession() which can race with the SDK background task
        const authData = await new Promise((resolve) => {
          let resolved = false;
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user && !resolved) {
              resolved = true;
              subscription.unsubscribe();
              resolve(session.user);
            }
          });

          // Fallback timeout: if after 4 seconds we don't have a session via listener, check manually once
          setTimeout(async () => {
             if (!resolved) {
               const { data: { session } } = await supabase.auth.getSession();
               resolved = true;
               subscription.unsubscribe();
               resolve(session?.user || null);
             }
          }, 3500);
        });

        if (authData) {
          currentUser = authData;
          // Clean URL
          const cleanUrl = new URL(window.location.href);
          cleanUrl.searchParams.delete('code');
          cleanUrl.searchParams.delete('state');
          cleanUrl.searchParams.delete('error');
          cleanUrl.searchParams.delete('error_description');
          cleanUrl.hash = '';
          window.history.replaceState({}, document.title, cleanUrl.toString());
          return currentUser;
        }
      }

      // 2. Standard check
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        // Handle the "already used" or expired code gracefully
        if (error.message.toLowerCase().includes('exchange') || 
            error.message.toLowerCase().includes('code') || 
            error.message.toLowerCase().includes('used')) {
           console.warn('Auth session check: Token consumed/invalid, trying to recover session...');
           // One last try with getUser() to see if SDK finished in background
           const { data: { user } } = await supabase.auth.getUser();
           if (user) {
             currentUser = user;
             return user;
           }
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

// Helper: Simple Auth Guard (resilient)
export const requireProfile = async () => {
    const user = await requireAuth();
    if (!user) return null;

    try {
        const profile = await getUserProfile(user.id);
        return { user, profile: profile || { id: user.id, email: user.email } };
    } catch (e) {
        return { user, profile: { id: user.id, email: user.email } };
    }
}

// Helper: Check if username is taken
export const isUsernameTaken = async (username) => {
    if (!username) return false;
    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();
    
    return !!data;
}

// Helper: Get user profile (including role)
export const getUserProfile = async (userId) => {
  if (!userId || !isSupabaseConfigured()) return null
  try {
    // We try to select all, but if we get a schema cache error (missing column), 
    // we fallback to basic columns to keep the app functional.
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    
    if (error) {
      if (error.message.includes('column') || error.message.includes('schema cache')) {
        console.warn('Supabase Schema Mismatch: Fallback select initiated.', error.message);
        // Fallback to core columns that are likely to exist
        const { data: fallbackData } = await supabase
          .from('profiles')
          .select('id, email, full_name, role')
          .eq('id', userId)
          .maybeSingle()
        return fallbackData;
      }
      console.error('Error fetching profile:', error)
      return null
    }
    return data
  } catch (err) {
    console.error('Profile Fetch Error:', err)
    return null
  }
}

// Helper: Update user profile (with direct update first, and upsert fallback)
export const updateUserProfile = async (userId, updates) => {
  if (!userId || !isSupabaseConfigured()) return { error: 'Not configured' }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
    
    if (error) {
      console.warn('Profile update failed, attempting upsert fallback...', error.message);
      const { data: upsertData, error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...updates,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      
      if (upsertError) throw upsertError;
      return { data: upsertData, error: null };
    }
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
