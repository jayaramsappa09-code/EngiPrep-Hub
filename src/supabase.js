import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize with placeholders if not configured to avoid immediate crashes
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
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
        console.error('Session error:', error)
        return null
    }
    if (session) return session.user
    
    // Fallback to getUser which is slower but more accurate
    const { data: { user } } = await supabase.auth.getUser()
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
