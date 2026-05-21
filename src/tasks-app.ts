interface Task {
    id: string;
    title: string;
    dueDate: string;
    reminderMinutes: number;
    completed: boolean;
    notified: boolean;
    createdAt: string;
}

const STORAGE_KEY = 'engiPrep_tasks';

export function getTasks(): Task[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function saveTasks(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    renderTasks();
}

function handleFormSubmit(e: Event) {
    e.preventDefault();
    const titleInput = document.getElementById('task-title') as HTMLInputElement;
    const dateInput = document.getElementById('task-due-date') as HTMLInputElement;
    const reminderInput = document.getElementById('task-reminder') as HTMLSelectElement;

    if (!titleInput.value || !dateInput.value) return;

    const newTask: Task = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        dueDate: dateInput.value,
        reminderMinutes: reminderInput.value === 'none' ? 0 : parseInt(reminderInput.value),
        completed: false,
        notified: false,
        createdAt: new Date().toISOString()
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    // Reset
    titleInput.value = '';
    dateInput.value = '';
    reminderInput.value = 'none';

    showToast('Task added successfully', 'success');

    // Request notification permission if they added a reminder
    if (newTask.reminderMinutes > 0 && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function renderTasks() {
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');
    const pendingCount = document.getElementById('pending-count');

    if (!pendingList || !completedList) return;

    const tasks = getTasks();
    
    // Sort logic
    const pending = tasks.filter(t => !t.completed).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const completed = tasks.filter(t => t.completed).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    if(pendingCount) pendingCount.textContent = pending.length.toString();

    const renderCard = (t: Task) => {
        const d = new Date(t.dueDate);
        const dateStr = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        
        let isOverdue = false;
        if (!t.completed && d.getTime() < Date.now()) {
            isOverdue = true;
        }

        return `
        <div class="px-5 py-4 bg-white dark:bg-slate-900 border ${isOverdue ? 'border-rose-300 dark:border-rose-900/50' : 'border-slate-200 dark:border-slate-800'} rounded-xl shadow-sm flex items-start gap-4 hover:border-blue-500/40 transition-colors">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="window.toggleTask('${t.id}')" class="mt-1 flex-shrink-0 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 accent-blue-600 cursor-pointer dark:text-blue-400">
            <div class="flex-1 min-w-0">
                <p class="${t.completed ? 'opacity-50 line-through' : ''} text-sm font-bold text-slate-900 dark:text-slate-50 mb-1 leading-snug">${t.title}</p>
                <div class="flex items-center gap-2 text-xs font-medium ${isOverdue ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}">
                    <span>📅</span> ${dateStr}
                    ${t.reminderMinutes > 0 && !t.completed ? `<span class="ml-2 text-blue-500">🔔 ${t.reminderMinutes}m</span>` : ''}
                </div>
            </div>
            <button onclick="window.deleteTask('${t.id}')" class="text-slate-400 hover:text-rose-500 transition-colors p-1" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        </div>
        `;
    };

    pendingList.innerHTML = pending.length ? pending.map(renderCard).join('') : '<p class="text-sm text-slate-500 dark:text-slate-400 italic">No pending tasks. You are all caught up!</p>';
    completedList.innerHTML = completed.length ? completed.map(renderCard).join('') : '';
}

(window as any).toggleTask = (id: string) => {
    const tasks = getTasks();
    const t = tasks.find(x => x.id === id);
    if(t) {
        t.completed = !t.completed;
        saveTasks(tasks);
    }
}

(window as any).deleteTask = (id: string) => {
    const tasks = getTasks();
    const filtered = tasks.filter(x => x.id !== id);
    saveTasks(filtered);
}

(window as any).clearCompletedTasks = () => {
    const tasks = getTasks().filter(x => !x.completed);
    saveTasks(tasks);
}

(window as any).requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        alert("This browser does not support desktop notification");
        return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
        showToast('Browser notifications enabled!', 'success');
    }
}

function showToast(msg: string, type: 'success' | 'warn') {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = `px-4 py-3 rounded-xl shadow-xl text-sm font-bold text-white transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 ${type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠️'}</span> ${msg}`;
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Background Reminder Checker
function checkReminders() {
    const tasks = getTasks();
    let updated = false;
    const now = Date.now();

    for (const t of tasks) {
        if (!t.completed && !t.notified && t.reminderMinutes > 0) {
            const dueTime = new Date(t.dueDate).getTime();
            const reminderTime = dueTime - (t.reminderMinutes * 60 * 1000);
            
            if (now >= reminderTime && now <= dueTime) {
                // Fire notification
                if (Notification.permission === 'granted') {
                    new Notification('EngiPrep Task Reminder', {
                        body: `${t.title} is due in ${t.reminderMinutes} minutes!`,
                        icon: '/public/favicon.ico' // adjust icon if needed
                    });
                } else {
                    showToast(`Reminder: ${t.title} is due soon!`, 'warn');
                }
                
                t.notified = true;
                updated = true;
            }
        }
    }

    if (updated) saveTasks(tasks);
}

// Set up
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Check initial focus
    const dateInput = document.getElementById('task-due-date') as HTMLInputElement;
    if(dateInput) {
        const nowLocalStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        dateInput.min = nowLocalStr;
    }

    renderTasks();
    
    // Check reminders every 30 seconds
    setInterval(checkReminders, 30000);
});
