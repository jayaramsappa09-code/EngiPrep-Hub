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

export const signInWithGoogle = async (redirectTo) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo || window.location.origin + '/auth.html',
    },
  })
  if (error) throw error
  return data
}

export const saveOnboardingProfile = async (userId, { fullName, university, branch, semester, year, goals }) => {
  const profileData = {
    full_name: fullName,
    branch: branch,
    semester: semester ? parseInt(semester) : null,
    college_year: year ? parseInt(year) : null,
    bio: JSON.stringify({
      university: university,
      goals: goals || [],
      onboarded_at: new Date().toISOString()
    }),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...profileData
    })
    
  if (error) throw error

  // Trigger XP event once completed
  if (window.engiprep && window.engiprep.triggerXP) {
    window.engiprep.triggerXP(50, 'Academic Orientation Perfected');
  } else if (window.parent && window.parent.engiprep && window.parent.engiprep.triggerXP) {
    window.parent.engiprep.triggerXP(50, 'Academic Orientation Perfected');
  } else if (typeof window.triggerXP === 'function') {
    window.triggerXP(50, 'Academic Orientation Perfected');
  }

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

