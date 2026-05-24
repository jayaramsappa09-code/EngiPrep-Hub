export type ToastType = 'success' | 'achievement' | 'encouraging' | 'error';

interface ToastOptions {
    title: string;
    message: string;
    type?: ToastType;
    duration?: number;
}

class ToastSystem {
    private container: HTMLDivElement | null = null;
    
    constructor() {
        this.init();
    }

    private init() {
        if (typeof document === 'undefined') return;
        
        this.container = document.createElement('div');
        this.container.id = 'engiprep-toast-container';
        this.container.className = 'fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none sm:bottom-6 sm:right-6';
        document.body.appendChild(this.container);
    }

    private getIcon(type: ToastType) {
        switch (type) {
            case 'success': return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
            case 'achievement': return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`;
            case 'encouraging': return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>`;
            case 'error': return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>`;
            default: return '';
        }
    }

    private getColors(type: ToastType) {
        switch (type) {
            case 'success': return 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500/30';
            case 'achievement': return 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500/30';
            case 'encouraging': return 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-500/30';
            case 'error': return 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-500/30';
            default: return 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800';
        }
    }

    public show(options: ToastOptions) {
        if (!this.container) this.init();
        if (!this.container) return;

        const { title, message, type = 'success', duration = 4000 } = options;

        const toastElement = document.createElement('div');
        
        // Tailwind transition classes
        toastElement.className = `
            flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md pointer-events-auto
            transform transition-all duration-500 translate-y-10 opacity-0 min-w-[300px] max-w-sm
            ${this.getColors(type)}
        `;

        toastElement.innerHTML = `
            <div class="flex-shrink-0 mt-0.5">
                ${this.getIcon(type)}
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-100">${title}</p>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${message}</p>
            </div>
            <button class="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        `;

        // Handle Close Button
        const closeBtn = toastElement.querySelector('button');
        closeBtn?.addEventListener('click', () => {
            this.dismiss(toastElement);
        });

        this.container.appendChild(toastElement);

        // Trigger entrance animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toastElement.classList.remove('translate-y-10', 'opacity-0');
            });
        });

        // Setup auto-dismiss
        setTimeout(() => {
            this.dismiss(toastElement);
        }, duration);
    }

    private dismiss(toastElement: HTMLDivElement) {
        if (!toastElement.parentElement) return; // Already removed
        
        // Trigger exit animation
        toastElement.classList.add('translate-y-4', 'opacity-0');
        
        // Remove after animation completes
        setTimeout(() => {
            toastElement.remove();
        }, 500);
    }
}

// Create a single global instance
export const toast = new ToastSystem();

// Export helper methods for specific types
export const showSuccessToast = (title: string, message: string) => toast.show({ title, message, type: 'success' });
export const showAchievementToast = (title: string, message: string) => toast.show({ title, message, type: 'achievement' });
export const showEncouragingToast = (title: string, message: string) => toast.show({ title, message, type: 'encouraging' });
export const showErrorToast = (title: string, message: string) => toast.show({ title, message, type: 'error' });

// Add to window for easy access from non-module scripts if needed
if (typeof window !== 'undefined') {
    (window as any).engiprepToast = toast;
}
