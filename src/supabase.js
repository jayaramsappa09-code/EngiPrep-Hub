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
    // 1. Check if we already have a session in memory/localstorage
    // This is the fastest and safest check
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      const msg = sessionError.message.toLowerCase()
      // If we see the "exchange" error, it means the URL code is invalid or already used
      if (msg.includes('exchange') || msg.includes('code') || msg.includes('invalid_grant')) {
        console.warn('Auth exchange issue:', sessionError.message)
        
        // Only return null if we are indeed in a callback.
        // We don't clear the URL here yet, we let dashboard handle the redirect first
        // so it can capture the error from the URL if needed.
        if (window.location.search.includes('code=') || window.location.hash.includes('access_token=')) {
          return null
        }
      }
      console.warn('Session check warning:', sessionError.message)
    }

    if (session) return session.user
    
    // 2. Fallback to getUser (authoritative check)
    // Only call this if we don't have a session, to prevent double network calls
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      const msg = userError.message
      if (userError.status !== 401 && msg !== 'Auth session missing!' && !msg.includes('JWTPurposeError')) {
        console.warn('User fetch notice:', msg)
      }
    }
    return user || null
  } catch (err) {
    console.error('Critical Auth Error:', err)
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
