import { supabase } from './supabase.js';

export async function enforceAuthentication() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        // Enforce the strict authentication barrier by redirecting to login page
        window.location.href = '/auth.html?redirect=' + encodeURIComponent(window.location.pathname + window.location.search);
    }
}

document.addEventListener('DOMContentLoaded', enforceAuthentication);
