import { supabase } from './supabase'

export const fetchAllNotes = async () => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const fetchNotesBySubject = async (subject) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('subject', subject)
    .eq('is_published', true)
  
  if (error) throw error
  return data
}

export const fetchNoteBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

// Progress management
export const updateProgress = async (userId, noteId, status) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, note_id: noteId, status, updated_at: new Date() })
  
  if (error) throw error
  return data
}

// Bookmark management
export const toggleBookmark = async (userId, noteId) => {
  const { data: existing } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .eq('note_id', noteId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', existing.id)
    if (error) throw error
    return { status: 'removed' }
  } else {
    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: userId, note_id: noteId })
    if (error) throw error
    return { status: 'added' }
  }
}

export const getBookmarks = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from('bookmarks')
        .select(`
            id,
            note_id,
            notes (*)
        `)
        .eq('user_id', user.id)
    
    if (error) throw error
    return data
}

export const removeBookmark = async (noteId) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('note_id', noteId)
    
    if (error) throw error
    return true
}

// Goal Management
export const fetchGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from('study_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('target_date', { ascending: true })
    
    if (error) throw error
    return data
}

export const createGoal = async (goal) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
        .from('study_goals')
        .insert({ ...goal, user_id: user.id })
    
    if (error) throw error
    return data
}

export const toggleGoal = async (goalId, isCompleted) => {
    const { data, error } = await supabase
        .from('study_goals')
        .update({ is_completed: isCompleted })
        .eq('id', goalId)
    
    if (error) throw error
    return data
}

export const deleteGoal = async (goalId) => {
    const { error } = await supabase
        .from('study_goals')
        .delete()
        .eq('id', goalId)
    
    if (error) throw error
    return true
}
