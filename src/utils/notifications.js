import { supabase } from '../supabase.js'

export async function getNotifications() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error fetching notifications:', error)
        return []
    }
    return data
}

export async function markAsRead(notificationId) {
    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
    
    if (error) console.error('Error marking as read:', error)
}

export async function createNotification(userId, title, message) {
    const { error } = await supabase
        .from('notifications')
        .insert({ user_id: userId, title, message })
    
    if (error) console.error('Error creating notification:', error)
}
