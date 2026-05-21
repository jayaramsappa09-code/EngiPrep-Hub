document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('dsa-viz-root');
    if (!root) return;

    root.innerHTML = `
        <div class="glass-panel rounded-[2rem] p-6 lg:p-8 relative overflow-hidden border border-indigo-500/30 shadow-[0_0_40px_rgba(79,70,229,0.1)]">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="bg-indigo-600 text-[10px] font-black uppercase text-white px-2 py-1 rounded">Interactive OS</span>
                        <span class="text-indigo-400 font-bold text-xs uppercase tracking-widest">Algorithm Sandbox</span>
                    </div>
                    <h3 class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight">Stack Visualization</h3>
                </div>
                <!-- Controls -->
                <div class="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
                    <button id="viz-push" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-md">Push (Insert)</button>
                    <button id="viz-pop" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-all shadow-md">Pop (Delete)</button>
                    <button id="viz-reset" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-all">Reset</button>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Visual Area -->
                <div class="flex-1 min-h-[300px] bg-slate-950 border border-slate-800 rounded-2xl p-8 flex items-end justify-center relative overflow-hidden shadow-inner">
                    <!-- Stack Base -->
                    <div class="w-48 border-x-4 border-b-4 border-slate-700 h-64 rounded-b-xl relative flex flex-col-reverse items-center justify-start gap-2 p-2" id="stack-container">
                        <!-- Items injected here -->
                    </div>
                    <div class="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end">
                        <div class="text-indigo-400 font-mono text-sm font-bold flex items-center gap-2 transition-all duration-300" id="top-pointer">
                            <span class="tracking-widest uppercase text-[10px]">Top Pointer</span>
                            <span class="text-xl">→</span>
                        </div>
                    </div>
                </div>

                <!-- Code / Complexity -->
                <div class="w-full lg:w-80 space-y-4">
                    <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner">
                        <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Live Execution Log</span>
                        <div id="viz-log" class="text-xs font-mono text-slate-400 space-y-2 h-32 overflow-y-auto custom-scrollbar">
                            <div class="text-emerald-400">> System Initialized. Stack is empty.</div>
                            <div class="text-slate-500">> Top = -1</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Time</span>
                            <span class="text-lg font-mono font-bold text-indigo-400">O(1)</span>
                        </div>
                        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Space</span>
                            <span class="text-lg font-mono font-bold text-indigo-400">O(N)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const container = document.getElementById('stack-container');
    const log = document.getElementById('viz-log');
    const ptr = document.getElementById('top-pointer');
    let stack: number[] = [];
    let count = 0;

    function logMsg(msg: string, isError = false) {
        if(!log) return;
        const div = document.createElement('div');
        div.className = isError ? 'text-rose-400' : 'text-slate-300';
        div.innerHTML = `> ${msg}`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    }

    function render() {
        if(!container || !ptr) return;
        
        container.innerHTML = '';
        stack.forEach((val, i) => {
            const el = document.createElement('div');
            el.className = 'w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg border border-indigo-400/30 animate-fade-in shadow-lg';
            el.innerText = val.toString();
            // prepend because flex-col-reverse
            container.prepend(el);
        });

        // Move pointer based on stack size
        if (stack.length === 0) {
            ptr.style.transform = 'translateY(120px)';
        } else {
            // roughly 56px per item
            const y = 120 - (stack.length * 56);
            ptr.style.transform = `translateY(${y}px)`;
        }
    }

    document.getElementById('viz-push')?.addEventListener('click', () => {
        if (stack.length >= 4) {
            logMsg('Stack Overflow! Cannot push.', true);
            return;
        }
        const val = Math.floor(Math.random() * 99) + 1;
        stack.push(val);
        logMsg(`push(${val}) executed. Top = ${stack.length - 1}`);
        render();
    });

    document.getElementById('viz-pop')?.addEventListener('click', () => {
        if (stack.length === 0) {
            logMsg('Stack Underflow! Cannot pop.', true);
            return;
        }
        const val = stack.pop();
        logMsg(`pop() returned ${val}. Top = ${stack.length - 1}`);
        render();
    });

    document.getElementById('viz-reset')?.addEventListener('click', () => {
        stack = [];
        if(log) log.innerHTML = '<div class="text-emerald-400">> System Initialized. Stack is empty.</div><div class="text-slate-500">> Top = -1</div>';
        render();
    });

    // inject animation class
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
    `;
    document.head.appendChild(style);

    render();
});
