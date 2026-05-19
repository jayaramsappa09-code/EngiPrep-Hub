import { supabase } from './supabase'

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
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

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password.html`,
  })
  if (error) throw error
  return data
}

export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  if (error) throw error
  return data
}

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}

export const signInWithPhone = async (phone) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phone,
  })
  if (error) throw error
  return data
}

export const verifyPhoneOTP = async (phone, token) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: 'sms',
  })
  if (error) throw error
  return data
}
