document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ai-assistant-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'ai-assistant-widget';
    widget.className = 'print:hidden';

    widget.innerHTML = `
        <!-- Floating Button -->
        <button id="ai-fab" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-110 transition-all duration-300 group ring-2 ring-white/10 dark:ring-slate-900/50">
            <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <div class="absolute -top-10 right-0 w-max opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg text-slate-300 pointer-events-none shadow-xl">EngiPrep AI</div>
        </button>

        <!-- Chat Window -->
        <div id="ai-chat-window" class="fixed bottom-24 right-6 md:right-8 w-[90vw] md:w-[420px] h-[600px] max-h-[80vh] bg-slate-950/95 backdrop-blur-3xl border border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-2xl flex flex-col scale-0 opacity-0 origin-bottom-right transition-all duration-300 z-[100] overflow-hidden">
            
            <!-- Header -->
            <div class="relative px-5 py-4 border-b border-slate-800 bg-gradient-to-b from-blue-900/20 to-transparent flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl shadow-inner">🤖</div>
                    <div>
                        <h3 class="text-sm font-black text-slate-50 uppercase tracking-widest flex items-center gap-2">EngiPrep AI <span class="bg-blue-600 text-[10px] px-1.5 py-0.5 rounded text-white">PRO</span></h3>
                        <p class="text-[10px] font-bold text-emerald-400 mt-0.5 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online - System Active</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button id="ai-close" class="text-slate-400 hover:text-white transition-colors p-1" title="Close">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="px-3 py-3 border-b border-slate-800 bg-slate-900/30 overflow-x-auto custom-scrollbar flex gap-2">
                <button class="ai-quick-btn shrink-0 px-3 py-1.5 bg-slate-800/80 hover:bg-blue-600 hover:border-blue-500 border border-slate-700/50 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all duration-300">⚡ Smart Revision</button>
                <button class="ai-quick-btn shrink-0 px-3 py-1.5 bg-slate-800/80 hover:bg-indigo-600 hover:border-indigo-500 border border-slate-700/50 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all duration-300">🎯 Predict PYQs</button>
                <button class="ai-quick-btn shrink-0 px-3 py-1.5 bg-slate-800/80 hover:bg-emerald-600 hover:border-emerald-500 border border-slate-700/50 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all duration-300">🎙️ Viva Prep Mode</button>
                <button class="ai-quick-btn shrink-0 px-3 py-1.5 bg-slate-800/80 hover:bg-rose-600 hover:border-rose-500 border border-slate-700/50 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all duration-300">∑ Derive Formula</button>
            </div>

            <!-- Messages Area -->
            <div id="ai-messages" class="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-slate-950/50">
                <!-- Welcome Message -->
                <div class="flex gap-3 max-w-[90%]">
                    <div class="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 text-sm">🤖</div>
                    <div class="p-4 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm text-sm text-slate-300 leading-loose shadow-sm">
                        <p class="font-bold text-slate-50 mb-2">Welcome to the EngiPrep OS.</p>
                        I can analyze PYQs, generate rapid exam revisions, explain confusing derivations, or test your viva knowledge.
                        <p class="mt-2 text-xs text-slate-500 font-medium">How can I assist your engineering prep today?</p>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 bg-slate-900 border-t border-slate-800 relative shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                <form id="ai-form" class="relative">
                    <input type="text" id="ai-input" placeholder="e.g., 'Most predicted Unit 3 questions'" class="w-full bg-slate-950 border border-slate-700 text-sm text-slate-200 font-medium rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner">
                    <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg transition-all shadow-md active:scale-95">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </button>
                </form>
            </div>
        </div>
    `;

    // Logic
    const fab = document.getElementById('ai-fab');
    const windowEl = document.getElementById('ai-chat-window');
    const closeBtn = document.getElementById('ai-close');
    const form = document.getElementById('ai-form');
    const input = document.getElementById('ai-input') as HTMLInputElement;
    const messages = document.getElementById('ai-messages');

    let isOpen = false;

    function toggleChat() {
        isOpen = !isOpen;
        if(isOpen) {
            windowEl?.classList.remove('scale-0', 'opacity-0');
            windowEl?.classList.add('scale-100', 'opacity-100');
            input?.focus();
        } else {
            windowEl?.classList.remove('scale-100', 'opacity-100');
            windowEl?.classList.add('scale-0', 'opacity-0');
        }
    }

    fab?.addEventListener('click', toggleChat);
    closeBtn?.addEventListener('click', toggleChat);

    function addMessage(text: string, isUser: boolean = false) {
        if(!messages) return;
        const msg = document.createElement('div');
        msg.className = isUser ? 'flex gap-3 justify-end' : 'flex gap-3 max-w-[90%]';
        
        let avatar = '';
        if(!isUser) {
            avatar = `<div class="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 text-sm mt-1">🤖</div>`;
        }

        const bubble = document.createElement('div');
        bubble.className = isUser 
            ? 'p-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl rounded-tr-sm text-sm text-white font-medium leading-relaxed shadow-md'
            : 'p-4 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm text-sm text-slate-300 leading-loose shadow-sm';
        
        bubble.innerHTML = text;

        if(isUser) {
            msg.appendChild(bubble);
        } else {
            msg.insertAdjacentHTML('beforeend', avatar);
            msg.appendChild(bubble);
        }

        messages.appendChild(msg);
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    }

    function generateResponse(query: string) {
        const lower = query.toLowerCase();
        setTimeout(() => {
            if(lower.includes('revision') || lower.includes('smart')) {
                addMessage("<strong class='text-white text-base'>⚡ 5-Minute Smart Revision Generated</strong><br><br>• <strong>Chemistry:</strong> Nernst Eq & Batteries are high priority.<br>• <strong>Data Structures:</strong> Linked Lists pointers logic is crucial.<br>• <strong>Physics:</strong> Interference vs Diffraction 5-mark differences.<br><br><em>Tip: Check your Dashboard for full revision tracking.</em>");
            } else if (lower.includes('predict') || lower.includes('pyq')) {
                addMessage("<strong class='text-rose-400 text-base'>🔥 PYQ Intelligence Prediction</strong><br><br>Based on the last 5 years R23 papers:<br>1. <span class='text-white font-bold'>Explain Schrödinger Wave Equation</span> (98% repeat)<br>2. <span class='text-white font-bold'>Differentiate Plastics, Resins, Elastomers</span> (Ask: 7 times)<br>3. <span class='text-white font-bold'>Implement Queue using Array</span> (Very High)");
            } else if (lower.includes('viva')) {
                addMessage("<strong class='text-emerald-400 text-base'>🎙️ Rapid Viva Prep Active</strong><br><br><strong>Q: What is a dangling pointer?</strong><br>A: A pointer pointing to freed memory. Accessing it causes undefined behavior.<br><button class='mt-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-xs font-bold'>Next Question →</button>");
            } else if (lower.includes('derive') || lower.includes('formula')) {
                addMessage("<div class='bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-sky-400 my-2 shadow-inner text-center font-bold tracking-wider'>A · v = λ · v</div><strong>Concept:</strong> Eigenvalues (λ) & Eigenvectors (v).<br>When a matrix multiplies a special vector, it only scales it (λ) instead of rotating it. Crucial for M1 Unit 3.");
            } else {
                addMessage("This is the AI Engine. Try clicking the Quick Action tags above or asking for <strong>Viva Prep</strong>, <strong>PYQ Predictor</strong>, or <strong>Smart Revision</strong>.");
            }
        }, 1000);
    }

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input.value.trim();
        if(!val) return;
        
        addMessage(val, true);
        input.value = '';
        
        const typing = document.createElement('div');
        typing.id = 'ai-typing';
        typing.className = 'flex gap-3 max-w-[90%]';
        typing.innerHTML = `<div class="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 text-sm mt-1">🤖</div><div class="p-4 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm flex gap-1.5"><span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span><span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></span><span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span></div>`;
        messages?.appendChild(typing);
        messages?.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        setTimeout(() => {
            document.getElementById('ai-typing')?.remove();
            generateResponse(val);
        }, 1200);
    });

    const quickBtns = document.querySelectorAll('.ai-quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = (e.target as HTMLElement).innerText;
            input.value = text;
            form.dispatchEvent(new Event('submit'));
        });
    });
});
