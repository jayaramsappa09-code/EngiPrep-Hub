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

// Helper: Check if user is logged in
export const getCurrentUser = async () => {
  try {
    // 1. Check if we have an active session in memory already
    const { data: { session: initialSession }, error: initialError } = await supabase.auth.getSession()
    if (initialSession) return initialSession.user

    // 2. If no session but we have an auth hash or query params, wait for Supabase to process it
    // Supabase handles the hash automatically on init, but it might take a moment
    const hasAuthData = window.location.hash.includes('access_token=') || 
                        window.location.hash.includes('error=') ||
                        window.location.search.includes('code=') ||
                        window.location.search.includes('error=');

    if (hasAuthData) {
        console.log('Detected auth data in URL, waiting for session...')
        // Wait up to 3 seconds for the session to appear
        for (let i = 0; i < 30; i++) {
            await new Promise(resolve => setTimeout(resolve, 100))
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                console.log('Session successfully recovered from URL')
                return session.user
            }
        }
        console.warn('Timed out waiting for session from URL data')
    }
    
    // 3. Last resort: direct check which is more authoritative
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
        // Only log if it's a real error, not just "no session"
        if (userError.status !== 401 && userError.message !== 'Auth session missing!') {
            console.error('User fetch error:', userError)
        }
    }
    return user || null
  } catch (err) {
    console.error('Auth Check Error:', err)
    return null
  }
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
