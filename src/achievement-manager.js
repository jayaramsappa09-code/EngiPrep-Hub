export class AchievementManager {
    constructor() {
        this.unlocked = JSON.parse(localStorage.getItem('unlocked_achievements')) || [];
    }

    checkMilestone(name, condition, emoji = '🏆') {
        if (condition() && !this.unlocked.includes(name)) {
            this.unlock(name, emoji);
        }
    }

    unlock(name, emoji) {
        this.unlocked.push(name);
        localStorage.setItem('unlocked_achievements', JSON.stringify(this.unlocked));
        this.showToast(name, emoji);
    }

    showToast(name, emoji) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-10 right-10 bg-amber-500 text-white font-black px-8 py-5 rounded-2xl shadow-2xl z-[100] transform transition duration-500 flex items-center gap-4 animate-in slide-in-from-bottom-5';
        toast.innerHTML = `<span class="text-3xl">${emoji}</span> <div><p class="text-xs uppercase tracking-widest opacity-80">Milestone Unlocked</p><p class="text-lg">${name}</p></div>`;
        document.body.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
}
