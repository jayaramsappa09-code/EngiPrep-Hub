import fs from 'fs';

const tasksHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Study Tasks & Reminders | EngiPrep Hub</title>
    <meta name="description" content="Manage your study tasks with due dates and advanced reminders.">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    <link rel="stylesheet" href="/src/index.css">
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen font-sans antialiased selection:bg-blue-500/30 selection:text-white pb-32">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6">
        <div class="max-w-7xl mx-auto h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-4">
                <span class="text-xl font-black text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 dark:text-blue-500">Hub</span></span>
            </a>
            <div class="flex items-center gap-4">
                <a href="/tasks.html" class="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">Tasks</a>
                <a href="/dashboard.html" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-black uppercase text-white transition-all">Dashboard</a>
            </div>
        </div>
    </nav>

    <!-- Main Board -->
    <main class="max-w-4xl mx-auto px-6 pt-32">
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Study Tasks</h1>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">Set deadlines and never miss a revision.</p>
            </div>
            <button onclick="requestNotificationPermission()" class="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 rounded-xl text-xs font-bold transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/40">
                <span>🔔</span> Enable Browser Reminders
            </button>
        </div>

        <!-- Add Task Form -->
        <div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-8 shadow-sm">
            <form id="task-form" class="space-y-4">
                <div>
                    <label class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Task Title</label>
                    <input type="text" id="task-title" required placeholder="e.g. Complete Unit 1 Chemistry Derivations" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-slate-200">
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Due Date & Time</label>
                        <input type="datetime-local" id="task-due-date" required class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:border-blue-500 outline-none transition-all dark:text-slate-200 [color-scheme:light] dark:[color-scheme:dark]">
                    </div>
                    <div>
                        <label class="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Reminder Strategy</label>
                        <select id="task-reminder" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:border-blue-500 outline-none transition-all dark:text-slate-200">
                            <option value="none">No Reminder</option>
                            <option value="5">5 Minutes Before</option>
                            <option value="15">15 Minutes Before</option>
                            <option value="60">1 Hour Before</option>
                            <option value="1440">1 Day Before</option>
                        </select>
                    </div>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-blue-500/20">
                        Add Custom Task
                    </button>
                </div>
            </form>
        </div>

        <!-- Task Lists -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Pending -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-slate-50">Pending Tasks</h3>
                    <span id="pending-count" class="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black rounded">0</span>
                </div>
                <div id="pending-list" class="space-y-3">
                    <!-- Tasks injected here -->
                </div>
            </div>

            <!-- Completed -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-slate-50">Completed</h3>
                    <button onclick="clearCompletedTasks()" class="text-xs font-bold text-rose-500 hover:text-rose-600">Clear</button>
                </div>
                <div id="completed-list" class="space-y-3 opacity-70">
                    <!-- Tasks injected here -->
                </div>
            </div>
        </div>
    </main>

    <!-- Custom Toast -->
    <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-3"></div>

    <script type="module" src="/src/tasks-app.ts"></script>
</body>
</html>`;

fs.writeFileSync('tasks.html', tasksHtml);

const tsApp = `
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
    
    // Sort logic: pending tasks sorted by due date, completed by completed date (idly fallback to due date)
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

        return \`
        <div class="px-5 py-4 bg-white dark:bg-slate-900 border \${isOverdue ? 'border-rose-300 dark:border-rose-900/50' : 'border-slate-200 dark:border-slate-800'} rounded-xl shadow-sm flex items-start gap-4 hover:border-blue-500/40 transition-colors">
            <input type="checkbox" \${t.completed ? 'checked' : ''} onchange="window.toggleTask('\${t.id}')" class="mt-1 flex-shrink-0 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 accent-blue-600 cursor-pointer dark:text-blue-400">
            <div class="flex-1 min-w-0">
                <p class="\${t.completed ? 'opacity-50 line-through' : ''} text-sm font-bold text-slate-900 dark:text-slate-50 mb-1 leading-snug">\${t.title}</p>
                <div class="flex items-center gap-2 text-xs font-medium \${isOverdue ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}">
                    <span>📅</span> \${dateStr}
                    \${t.reminderMinutes > 0 && !t.completed ? \`<span class="ml-2 text-blue-500">🔔 \${t.reminderMinutes}m</span>\` : ''}
                </div>
            </div>
            <button onclick="window.deleteTask('\${t.id}')" class="text-slate-400 hover:text-rose-500 transition-colors p-1" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        </div>
        \`;
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
    toast.className = \`px-4 py-3 rounded-xl shadow-xl text-sm font-bold text-white transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 \${type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}\`;
    toast.innerHTML = \`<span>\${type === 'success' ? '✓' : '⚠️'}</span> \${msg}\`;
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
                        body: \`\${t.title} is due in \${t.reminderMinutes} minutes!\`,
                        icon: '/public/favicon.ico'
                    });
                } else {
                    showToast(\`Reminder: \${t.title} is due soon!\`, 'warn');
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
    const nowLocalStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    const dateInput = document.getElementById('task-due-date') as HTMLInputElement;
    if(dateInput) dateInput.min = nowLocalStr;

    renderTasks();
    
    // Check reminders every 30 seconds
    setInterval(checkReminders, 30000);
});
`;

fs.writeFileSync('src/tasks-app.ts', tsApp);

// Add to nav across all files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'tasks.html');
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('tasks.html')) {
        content = content.replace(
            /(<a[^>]*href="\/dashboard.html"[^>]*>)/, 
            '<a href="/tasks.html" class="hidden md:block px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">Tasks</a>\n                $1'
        );
        fs.writeFileSync(file, content);
        console.log(\`Added Tasks link to \${file}\`);
    }
});

console.log('Tasks feature added successfully.');
