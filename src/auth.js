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
  const isProd = window.location.hostname === 'engi-prephub.vercel.app';
  const redirectUrl = isProd ? 'https://engi-prephub.vercel.app/dashboard.html' : window.location.origin + '/dashboard.html';
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
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
