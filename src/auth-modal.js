/**
 * Freemium Educational Growth System - Auth Modal Utility
 * Non-disruptive, highly polished contextual sign-in conversion prompt
 */

export function showAuthModal(message = "Sign in to unlock interactive tools, progress tracking and personalized learning.", title = "Unlock Advanced Feature") {
    // Check if modal already exists
    let modal = document.getElementById('freemium-auth-modal');
    if (modal) modal.remove();
    
    modal = document.createElement('div');
    modal.id = 'freemium-auth-modal';
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300';
    
    // Add slide/scale animation via inline style to prevent dependency issues
    const styleEl = document.getElementById('modal-animation-styles');
    if (!styleEl) {
        const style = document.createElement('style');
        style.id = 'modal-animation-styles';
        style.innerHTML = `
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalScaleUp {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-modal-bg { animation: modalFadeIn 0.25s ease-out forwards; }
            .animate-modal-card { animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `;
        document.head.appendChild(style);
    }
    
    modal.classList.add('animate-modal-bg');
    
    const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
    
    modal.innerHTML = `
        <div class="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 md:p-10 max-w-sm w-full shadow-2xl shadow-blue-500/10 relative overflow-hidden animate-modal-card">
            <!-- Glowing gradients -->
            <div class="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            
            <div class="text-center relative z-10">
                <!-- Locked Circle -->
                <div class="w-14 h-14 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-[#06B6D4] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100/50 dark:border-blue-900/30">
                    <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                    </svg>
                </div>
                
                <h3 class="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight font-sans">${title}</h3>
                <p class="text-slate-600 dark:text-[#CBD5E1] text-sm mt-3 leading-relaxed font-medium mb-8">
                    ${message}
                </p>
                
                <!-- CTA buttons -->
                <div class="flex flex-col gap-3">
                    <a href="/auth.html?redirect=${currentPath}" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md shadow-blue-500/10 text-center">
                        Login with Google
                    </a>
                    <a href="/auth.html?signup=true&redirect=${currentPath}" class="w-full py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-750 font-black text-xs uppercase tracking-widest rounded-xl transition-all text-center">
                        Register Free Account
                    </a>
                    <button id="close-auth-modal" class="mt-4 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] hover:text-slate-900 dark:hover:text-white transition-colors">
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 250);
    };
    
    document.getElementById('close-auth-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}
