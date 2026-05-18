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

let authPromise = null

// Helper: Check if user is logged in
export const getCurrentUser = async (forceRefresh = false) => {
  if (authPromise && !forceRefresh) return authPromise

  authPromise = (async () => {
    try {
      // Small debounce to let Supabase SDK initialize if it's processing a callback
      const hasAuthData = window.location.hash.includes('access_token=') || window.location.search.includes('code=')
      if (hasAuthData) {
        await new Promise(r => setTimeout(r, 800))
      }

      // 1. Check if we already have a session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        const msg = sessionError.message.toLowerCase()
        // If we see exchange or grant errors, the code is dead - clean the URL
        if (msg.includes('exchange') || msg.includes('code') || msg.includes('grant')) {
          console.warn('Authentication code exchange failed:', sessionError.message)
          
          const url = new URL(window.location.href)
          if (url.searchParams.has('code') || url.hash.includes('access_token')) {
            console.log('Clearing invalid auth data from URL')
            url.searchParams.delete('code')
            url.searchParams.delete('state')
            url.hash = ''
            window.history.replaceState({}, document.title, url.toString())
          }
          return null
        }
        console.warn('Session retrieval status:', sessionError.message)
      }

      const user = session?.user || null

      if (user) {
        // Session established - clean auth data from URL to keep it pretty
        const url = new URL(window.location.href)
        if (url.searchParams.has('code') || url.hash.includes('access_token')) {
          url.searchParams.delete('code')
          url.searchParams.delete('state')
          url.hash = ''
          window.history.replaceState({}, document.title, url.toString())
        }
        return user
      }
      
      // 2. Fallback to getUser (only if getSession didn't find anything)
      const { data: { user: fetchedUser }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        const msg = userError.message
        if (userError.status !== 401 && msg !== 'Auth session missing!' && !msg.includes('JWTPurposeError')) {
          console.warn('User fetch notice:', msg)
        }
      }
      return fetchedUser || null
    } catch (err) {
      console.error('Critical Auth Discovery Error:', err)
      return null
    }
  })()

  return authPromise
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
