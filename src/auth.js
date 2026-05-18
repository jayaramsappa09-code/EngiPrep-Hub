import { supabase } from './supabase'

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export const signInWithGoogle = async () => {
  // Use the production URL if we're on it, otherwise fallback to current origin for dev
  const isProd = window.location.hostname === 'engi-prephub.vercel.app';
  const siteUrl = isProd ? 'https://engi-prephub.vercel.app' : window.location.origin;
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: siteUrl + '/dashboard.html',
      skipBrowserRedirect: false // Ensure we handle the redirect properly
    }
  })
  if (error) throw error
  return data
}

export const signUp = async (email, password, fullName, username) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/auth.html',
      data: {
        full_name: fullName,
        username: username,
      },
    },
  })
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  window.location.href = '/index.html'
}

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}
