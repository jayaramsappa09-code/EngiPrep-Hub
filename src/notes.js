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

export const fetchNotesByType = async (type) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('type', type)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}
  
export const fetchRevisionNotes = async (subject) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('subject', subject)
    .eq('type', 'Revision')
    .eq('is_published', true)
    .order('weightage', { ascending: false })
  
  if (error) throw error
  return data
}

export const fetchPYQAnalytics = async (subject) => {
  const { data, error } = await supabase
    .from('notes')
    .select('id, title, slug, frequency, weightage')
    .eq('subject', subject)
    .eq('type', 'PYQ')
    .eq('is_published', true)
    .order('frequency', { ascending: false })
  
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

// Community Contributions
export const submitContribution = async (details, file) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Authentication required to contribute.')

  // 1. Upload File
  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${Math.random()}.${fileExt}`
  const filePath = `contributions/${fileName}`

  const { error: uploadError, data: uploadData } = await supabase.storage
    .from('archive') // Using common archive bucket
    .upload(filePath, file)

  if (uploadError) throw uploadError

  // Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from('archive')
    .getPublicUrl(filePath)

  // 2. Create Record
  const { data, error } = await supabase
    .from('contributions')
    .insert([{
      user_id: user.id,
      title: details.title,
      description: details.description,
      subject: details.subject,
      semester: details.semester,
      unit: details.unit,
      content_type: details.content_type,
      file_url: publicUrl,
      file_type: fileExt,
      tags: details.tags || []
    }])
    .select()

  if (error) throw error
  return data[0]
}

export const fetchMyContributions = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    
    const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
}

export const fetchPendingContributions = async () => {
    const { data, error } = await supabase
        .from('contributions')
        .select('*, profiles(full_name)')
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
}

export const moderateContribution = async (id, status, feedback = '') => {
    const { data, error } = await supabase
        .from('contributions')
        .update({ status, admin_feedback: feedback })
        .eq('id', id)
        .select()
    
    if (error) throw error
    return data[0]
}

// Adaptive Study Engine
export const fetchAdaptiveRecommendations = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  // 1. Fetch user stats
  const { data: stats } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
  
  // 2. Fetch all published notes
  const { data: allNotes } = await supabase.from('notes').select('id, title, subject, weightage, type, slug').eq('is_published', true)
  
  // 3. Fetch user progress
  const { data: progress } = await supabase.from('user_progress').select('note_id').eq('user_id', user.id).eq('status', true)
  const completedIds = new Set((progress || []).map(p => p.note_id))

  // 4. Recommendation Logic
  // Filter out completed notes, then sort by weightage (highest first)
  // Prioritize Revision and PYQ types for adaptive learning
  const recommendations = (allNotes || [])
    .filter(n => !completedIds.has(n.id))
    .sort((a, b) => b.weightage - a.weightage)
    .slice(0, 5)

  return recommendations
}

// Exam Prediction Engine Logic
export const fetchSubjectInsights = async (subject) => {
  const { data: notes, error } = await supabase
    .from('notes')
    .select('title, weightage, frequency, type, slug')
    .eq('subject', subject)
    .eq('is_published', true)
  
  if (error) throw error

  // Calculate Unit Importance (Mocking unit grouping if not present in notes, 
  // though real systems would use a 'unit' column)
  const insights = {
    expected: notes.filter(n => n.frequency >= 3 || n.weightage >= 4),
    heatmap: notes.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + n.weightage
      return acc
    }, {})
  }

  return insights
}

// Goal Management
export const searchNotesAndSubjects = async (query) => {
  const { data: notes, error: notesError } = await supabase
    .from('notes')
    .select('title, slug, subject, type')
    .ilike('title', `%${query}%`)
    .limit(5)
  
  const { data: subjects, error: subError } = await supabase
    .from('subjects')
    .select('title, code')
    .ilike('title', `%${query}%`)
    .limit(3)
    
  if (notesError || subError) throw notesError || subError
  return { notes, subjects }
}

export const fetchSubjectsBySemester = async (semester) => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('semester', semester)
    .order('created_at', { ascending: true })
  
  if (error) throw error
  return data
}

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
