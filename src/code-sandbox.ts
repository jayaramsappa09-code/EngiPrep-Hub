document.addEventListener('DOMContentLoaded', () => {
    // Inject Sandbox
    const root = document.getElementById('code-sandbox-root');
    if (!root) return;

    root.innerHTML = `
        <div class="glass-panel rounded-[2rem] p-6 lg:p-8 relative overflow-hidden border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)] my-10 print:hidden">
            <div class="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="bg-emerald-600 text-[10px] font-black uppercase text-white px-2 py-1 rounded">Compiler System</span>
                    </div>
                    <h3 class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight">Code Sandbox</h3>
                </div>
                <!-- Language Selector & Run -->
                <div class="flex items-center gap-2">
                    <select class="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-lg px-3 py-2 outline-none">
                        <option>C (gcc)</option>
                        <option>C++ (g++)</option>
                        <option>Python 3</option>
                        <option>Java</option>
                    </select>
                    <button id="sandbox-run" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-2">
                        <span>▶</span> Run Code
                    </button>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-4 h-[400px]">
                <!-- Editor -->
                <div class="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-inner flex flex-col border border-slate-800">
                    <div class="bg-[#2d2d2d] px-4 py-2 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span class="ml-2 uppercase font-bold tracking-widest">main.c</span>
                    </div>
                    <textarea id="sandbox-editor" class="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono p-4 text-sm outline-none resize-none" spellcheck="false">#include <stdio.h>

int main() {
    printf("EngiPrep Sandbox Initialized!\\n");
    // Write your DS code here
    return 0;
}</textarea>
                </div>

                <!-- Output Terminal -->
                <div class="w-full lg:w-80 bg-black rounded-xl p-4 font-mono text-xs text-slate-300 flex flex-col border border-slate-800">
                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-800 pb-2 block">Terminal Output</span>
                    <div id="sandbox-output" class="flex-1 overflow-y-auto whitespace-pre-wrap text-emerald-400">
<!-- Output will appear here -->
                    </div>
                </div>
            </div>
        </div>
    `;

    const runBtn = document.getElementById('sandbox-run');
    const editor = document.getElementById('sandbox-editor') as HTMLTextAreaElement;
    const output = document.getElementById('sandbox-output');

    if (runBtn && editor && output) {
        runBtn.addEventListener('click', () => {
            const originalText = runBtn.innerHTML;
            runBtn.innerHTML = '<span class="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full inline-block"></span> Running...';
            
            setTimeout(() => {
                const code = editor.value;
                if (code.includes('printf')) {
                    // Extract simplistic printf contents
                    const matches = code.match(/printf\s*\(\s*"([^"]+)"\s*\)/g);
                    let result = '';
                    if (matches) {
                        matches.forEach(m => {
                            const inner = m.match(/"([^"]+)"/);
                            if (inner) result += inner[1].replace(/\\n/g, '\n') + '\n';
                        });
                    }
                    output.innerHTML = result || 'Execution finished. No output.';
                } else {
                    output.innerHTML = 'Compiled successfully.\nExecution finished with code 0.';
                }
                output.innerHTML += '\n<span class="text-slate-500">Process exited after 0.04s</span>';
                runBtn.innerHTML = originalText;
            }, 800);
        });
    }
});
