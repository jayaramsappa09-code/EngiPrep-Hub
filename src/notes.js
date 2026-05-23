import { supabase } from './supabase'
import { FALLBACK_NOTES } from './predefinedNotes'

export const fetchAllNotes = async () => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
    
    if (error || !data || data.length === 0) {
      return FALLBACK_NOTES
    }
    return data
  } catch (err) {
    return FALLBACK_NOTES
  }
}

export const fetchNotesByType = async (type) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('type', type)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
    
    if (error || !data || data.length === 0) {
      return FALLBACK_NOTES.filter(n => n.type === type)
    }
    return data
  } catch (err) {
    return FALLBACK_NOTES.filter(n => n.type === type)
  }
}
  
export const fetchRevisionNotes = async (subject) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('subject', subject)
      .eq('type', 'Revision')
      .eq('is_published', true)
      .order('weightage', { ascending: false })
    
    if (error || !data || data.length === 0) {
      return FALLBACK_NOTES.filter(n => n.subject === subject && n.type === 'Revision')
    }
    return data
  } catch (err) {
    return FALLBACK_NOTES.filter(n => n.subject === subject && n.type === 'Revision')
  }
}

export const fetchPYQAnalytics = async (subject) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('id, title, slug, frequency, weightage')
      .eq('subject', subject)
      .eq('type', 'PYQ')
      .eq('is_published', true)
      .order('frequency', { ascending: false })
    
    if (error || !data || data.length === 0) {
      return FALLBACK_NOTES.filter(n => n.subject === subject && n.type === 'PYQ')
        .map(n => ({ id: n.id, title: n.title, slug: n.slug, frequency: n.frequency, weightage: n.weightage }))
    }
    return data
  } catch (err) {
    return FALLBACK_NOTES.filter(n => n.subject === subject && n.type === 'PYQ')
      .map(n => ({ id: n.id, title: n.title, slug: n.slug, frequency: n.frequency, weightage: n.weightage }))
  }
}

export const fetchNotesBySubject = async (subject) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('subject', subject)
      .eq('is_published', true)
    
    if (error || !data || data.length === 0) {
      return FALLBACK_NOTES.filter(n => n.subject === subject)
    }
    return data
  } catch (err) {
    return FALLBACK_NOTES.filter(n => n.subject === subject)
  }
}

export const fetchNoteBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error || !data) {
      const fb = FALLBACK_NOTES.find(n => n.slug === slug)
      if (fb) return fb
      if (error) throw error
    }
    return data
  } catch (err) {
    const fb = FALLBACK_NOTES.find(n => n.slug === slug)
    if (fb) return fb
    throw err
  }
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

// User Reputation & Leaderboard
export const fetchTopContributors = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, contributions_count, trust_score')
      .gt('contributions_count', 0)
      .order('contributions_count', { ascending: false })
      .limit(5)
    
    if (error || !data || data.length === 0) {
      return [
        { username: "TopperSai", contributions_count: 32, trust_score: 98 },
        { username: "R23_Scholar", contributions_count: 24, trust_score: 95 },
        { username: "CoderPrasad", contributions_count: 18, trust_score: 91 },
        { username: "MathWhiz", contributions_count: 15, trust_score: 89 }
      ]
    }
    return data
  } catch (err) {
    return [
      { username: "TopperSai", contributions_count: 32, trust_score: 98 },
      { username: "R23_Scholar", contributions_count: 24, trust_score: 95 },
      { username: "CoderPrasad", contributions_count: 18, trust_score: 91 },
      { username: "MathWhiz", contributions_count: 15, trust_score: 89 }
    ]
  }
}

// Adaptive Study Engine
export const fetchRecentNotes = async (limit = 4) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('id, title, slug, type, subject, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error || !data || data.length === 0) {
      return FALLBACK_NOTES.slice(0, limit).map(n => ({
        id: n.id,
        title: n.title,
        slug: n.slug,
        type: n.type,
        subject: n.subject,
        created_at: n.created_at || new Date().toISOString()
      }))
    }
    return data
  } catch (err) {
    return FALLBACK_NOTES.slice(0, limit).map(n => ({
      id: n.id,
      title: n.title,
      slug: n.slug,
      type: n.type,
      subject: n.subject,
      created_at: new Date().toISOString()
    }))
  }
}

export const fetchPopularSubjects = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('subject')
      .eq('is_published', true)
    
    const notesList = (error || !data || data.length === 0) ? FALLBACK_NOTES : data
    
    const counts = notesList.reduce((acc, n) => {
      acc[n.subject] = (acc[n.subject] || 0) + 1
      return acc
    }, {})

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([subject]) => subject)
  } catch (err) {
    const counts = FALLBACK_NOTES.reduce((acc, n) => {
      acc[n.subject] = (acc[n.subject] || 0) + 1
      return acc
    }, {})

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([subject]) => subject)
  }
}

export const fetchRelatedNotes = async (subject, currentNoteId, limit = 3) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('id, title, slug, type, subject')
      .eq('subject', subject)
      .eq('is_published', true)
      .neq('id', currentNoteId)
      .limit(limit)
    
    if (error || !data || data.length === 0) {
      return FALLBACK_NOTES.filter(n => n.subject === subject && n.id !== currentNoteId)
        .slice(0, limit)
        .map(n => ({ id: n.id, title: n.title, slug: n.slug, type: n.type, subject: n.subject }))
    }
    return data
  } catch (err) {
    return FALLBACK_NOTES.filter(n => n.subject === subject && n.id !== currentNoteId)
      .slice(0, limit)
      .map(n => ({ id: n.id, title: n.title, slug: n.slug, type: n.type, subject: n.subject }))
  }
}

export const fetchAdaptiveRecommendations = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return FALLBACK_NOTES.slice(0, 5)

    // 1. Fetch user stats
    const { data: stats } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
    
    // 2. Fetch all published notes
    const { data: allNotes, error } = await supabase.from('notes').select('id, title, subject, weightage, type, slug').eq('is_published', true)
    
    const notesList = (error || !allNotes || allNotes.length === 0) ? FALLBACK_NOTES : allNotes
    
    // 3. Fetch user progress
    const { data: progress } = await supabase.from('user_progress').select('note_id').eq('user_id', user.id).eq('status', true)
    const completedIds = new Set((progress || []).map(p => p.note_id))

    // 4. Recommendation Logic
    const recommendations = (notesList || [])
      .filter(n => !completedIds.has(n.id))
      .sort((a, b) => b.weightage - a.weightage)
      .slice(0, 5)

    return recommendations
  } catch (err) {
    return FALLBACK_NOTES.slice(0, 5)
  }
}

export const fetchSubjectInsights = async (subject) => {
  try {
    const { data: notes, error } = await supabase
      .from('notes')
      .select('title, weightage, frequency, type, slug')
      .eq('subject', subject)
      .eq('is_published', true)
    
    if (error || !notes || notes.length === 0) {
      const fbNotes = FALLBACK_NOTES.filter(n => n.subject === subject)
      return {
        expected: fbNotes.filter(n => n.frequency >= 3 || n.weightage >= 4),
        heatmap: fbNotes.reduce((acc, n) => {
          acc[n.type] = (acc[n.type] || 0) + n.weightage
          return acc
        }, {})
      }
    }

    const insights = {
      expected: notes.filter(n => n.frequency >= 3 || n.weightage >= 4),
      heatmap: notes.reduce((acc, n) => {
        acc[n.type] = (acc[n.type] || 0) + n.weightage
        return acc
      }, {})
    }

    return insights
  } catch (err) {
    const fbNotes = FALLBACK_NOTES.filter(n => n.subject === subject)
    return {
      expected: fbNotes.filter(n => n.frequency >= 3 || n.weightage >= 4),
      heatmap: fbNotes.reduce((acc, n) => {
        acc[n.type] = (acc[n.type] || 0) + n.weightage
        return acc
      }, {})
    }
  }
}

// Goal Management
export const searchNotesAndSubjects = async (query) => {
  try {
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
      
    if (notesError || subError) {
      // Return predefined matches
      const queryLower = query.toLowerCase();
      const fbNotes = FALLBACK_NOTES.filter(n => n.title.toLowerCase().includes(queryLower) || n.subject.toLowerCase().includes(queryLower)).slice(0, 5)
      const fbSubjects = [
        { title: 'Engineering Mathematics I', code: 'M1' },
         { title: 'Engineering Physics', code: 'PH' },
         { title: 'C Programming', code: 'C' },
         { title: 'Basic Electrical Engineering', code: 'BEEE' },
         { title: 'Communicative English', code: 'EN' },
         { title: 'Engineering Mathematics II', code: 'M2' },
         { title: 'Engineering Chemistry', code: 'CH' },
         { title: 'Data Structures', code: 'DS' },
         { title: 'Basic Civil and Mechanical Engineering', code: 'BCME' },
         { title: 'Environmental Science', code: 'ES' }
      ].filter(s => s.title.toLowerCase().includes(queryLower) || s.code.toLowerCase().includes(queryLower)).slice(0, 3)
      
      return { notes: fbNotes, subjects: fbSubjects }
    }
    return { notes, subjects }
  } catch (err) {
    const queryLower = query.toLowerCase()
    const fbNotes = FALLBACK_NOTES.filter(n => n.title.toLowerCase().includes(queryLower) || n.subject.toLowerCase().includes(queryLower)).slice(0, 5)
    const fbSubjects = [
       { title: 'Engineering Mathematics I', code: 'M1' },
       { title: 'Engineering Physics', code: 'PH' },
       { title: 'C Programming', code: 'C' },
       { title: 'Basic Electrical Engineering', code: 'BEEE' },
       { title: 'Communicative English', code: 'EN' },
       { title: 'Engineering Mathematics II', code: 'M2' },
       { title: 'Engineering Chemistry', code: 'CH' },
       { title: 'Data Structures', code: 'DS' },
       { title: 'Basic Civil and Mechanical Engineering', code: 'BCME' },
       { title: 'Environmental Science', code: 'ES' }
    ].filter(s => s.title.toLowerCase().includes(queryLower) || s.code.toLowerCase().includes(queryLower)).slice(0, 3)
    
    return { notes: fbNotes, subjects: fbSubjects }
  }
}

export const fetchSubjectsBySemester = async (semester) => {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('semester', semester)
      .order('created_at', { ascending: true })
    
    let subjectsList = data || []
    if (error || !data || data.length === 0) {
      if (semester === 1) {
        subjectsList = [
          { title: 'Engineering Mathematics I', code: 'M1', semester: 1, description: 'Matrices, Sequences, and Calculus.', color: 'blue' },
          { title: 'Engineering Physics', code: 'PH', semester: 1, description: 'Optics, Semiconductors, and Lasers.', color: 'purple' },
          { title: 'C Programming', code: 'C', semester: 1, description: 'Problem solving and logic in C.', color: 'emerald' },
          { title: 'Basic Electrical Engineering', code: 'BEEE', semester: 1, description: 'Fundamentals of circuits and machines.', color: 'amber' },
          { title: 'Communicative English', code: 'EN', semester: 1, description: 'Foundations of reading, writing, and professional speaking.', color: 'rose' }
        ]
      } else {
        subjectsList = [
          { title: 'Engineering Mathematics II', code: 'M2', semester: 2, description: 'ODEs and Integral Calculus.', color: 'blue' },
          { title: 'Engineering Chemistry', code: 'CH', semester: 2, description: 'Materials and Water technology.', color: 'amber' },
          { title: 'Data Structures', code: 'DS', semester: 2, description: 'Advanced arrays, stacks, and queues.', color: 'indigo' },
          { title: 'Basic Civil and Mechanical Engineering', code: 'BCME', semester: 2, description: 'Fundamentals of civil materials and mechanical systems.', color: 'emerald' },
          { title: 'Environmental Science', code: 'ES', semester: 2, description: 'Eco studies and social issues.', color: 'rose' }
        ]
      }
    }

    if (semester === 1) {
      // Ensure Engineering Graphics is always in Semester 1 for ease of access
      if (!subjectsList.some(s => s.title.toLowerCase().includes('graphics'))) {
        subjectsList.push({
          title: 'Engineering Graphics',
          code: 'EG',
          semester: 1,
          description: 'Interactive CAD, orthographic projection, and isometric view guides.',
          color: 'cyan'
        })
      }
      // Ensure Basic Electrical Engineering is always in Semester 1
      if (!subjectsList.some(s => s.title.toLowerCase().includes('electrical') || s.code === 'BEEE')) {
        subjectsList.push({
          title: 'Basic Electrical Engineering',
          code: 'BEEE',
          semester: 1,
          description: 'Fundamentals of circuits and machines.',
          color: 'amber'
        })
      }
    }
    return subjectsList
  } catch (err) {
    let subjectsList = []
    if (semester === 1) {
      subjectsList = [
        { title: 'Engineering Mathematics I', code: 'M1', semester: 1, description: 'Matrices, Sequences, and Calculus.', color: 'blue' },
        { title: 'Engineering Physics', code: 'PH', semester: 1, description: 'Optics, Semiconductors, and Lasers.', color: 'purple' },
        { title: 'C Programming', code: 'C', semester: 1, description: 'Problem solving and logic in C.', color: 'emerald' },
        { title: 'Basic Electrical Engineering', code: 'BEEE', semester: 1, description: 'Fundamentals of circuits and machines.', color: 'amber' },
        { title: 'Communicative English', code: 'EN', semester: 1, description: 'Foundations of reading, writing, and professional speaking.', color: 'rose' }
      ]
    } else {
      subjectsList = [
        { title: 'Engineering Mathematics II', code: 'M2', semester: 2, description: 'ODEs and Integral Calculus.', color: 'blue' },
        { title: 'Engineering Chemistry', code: 'CH', semester: 2, description: 'Materials and Water technology.', color: 'amber' },
        { title: 'Data Structures', code: 'DS', semester: 2, description: 'Advanced arrays, stacks, and queues.', color: 'indigo' },
        { title: 'Basic Civil and Mechanical Engineering', code: 'BCME', semester: 2, description: 'Fundamentals of civil materials and mechanical systems.', color: 'emerald' },
        { title: 'Environmental Science', code: 'ES', semester: 2, description: 'Eco studies and social issues.', color: 'rose' }
      ]
    }

    if (semester === 1) {
      if (!subjectsList.some(s => s.title.toLowerCase().includes('graphics'))) {
        subjectsList.push({
          title: 'Engineering Graphics',
          code: 'EG',
          semester: 1,
          description: 'Interactive CAD, orthographic projection, and isometric view guides.',
          color: 'cyan'
        })
      }
      if (!subjectsList.some(s => s.title.toLowerCase().includes('electrical') || s.code === 'BEEE')) {
        subjectsList.push({
          title: 'Basic Electrical Engineering',
          code: 'BEEE',
          semester: 1,
          description: 'Fundamentals of circuits and machines.',
          color: 'amber'
        })
      }
    }
    return subjectsList
  }
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
