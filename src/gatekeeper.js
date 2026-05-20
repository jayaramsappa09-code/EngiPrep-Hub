import { supabase } from './supabase.js';

export async function enforceAuthentication() {
    document.documentElement.style.display = 'none';
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        // Enforce the strict authentication barrier by redirecting to login page
        window.location.href = '/auth.html?redirect=' + encodeURIComponent(window.location.pathname + window.location.search);
    } else {
        document.documentElement.style.display = '';
    }
}

enforceAuthentication();
