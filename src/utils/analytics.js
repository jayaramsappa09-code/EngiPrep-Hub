import { supabase } from '../supabase.js'

export async function logActivity(action, metadata = {}) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase
            .from('user_activity')
            .insert({
                user_id: user.id,
                action,
                metadata
            })
        
        if (error) console.error('Error logging activity:', error)
    } catch (err) {
        console.error('Analytics error:', err)
    }
}
