import { supabase } from './supabase.js';

export async function enforceAuthentication() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        // Enforce the strict authentication barrier
        document.body.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #0c0205; color: #ffeef1; font-family: sans-serif; text-align: center; padding: 20px;">
                <h1 style="font-size: 2rem; margin-bottom: 20px;">🔒 Access Restricted</h1>
                <p style="max-width: 600px; line-height: 1.6; margin-bottom: 20px;">
                    To view these JNTUK R23 notes, PYQs, and cheat sheets, you need to be logged into your account.
                </p>
                <p>
                    Please redirect to the login page here: <a href="https://engi-prephub.vercel.app/" style="color: #3b82f6; text-decoration: underline;">Login to Engi Prep Hub</a> to unlock full access instantly.
                </p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', enforceAuthentication);
