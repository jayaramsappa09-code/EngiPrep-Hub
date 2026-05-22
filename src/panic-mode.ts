export function initPanicMode() {
    const isSubjectPage = window.location.pathname.includes('chemistry') || window.location.pathname.includes('physics');
    if (!isSubjectPage) return;

    const toggleHtml = `
      <div class="flex justify-end mt-4 mb-6">
        <button id="panic-toggle-btn" class="px-5 py-3 rounded-2xl text-xs md:text-sm font-black border-2 border-rose-500 bg-white dark:bg-slate-900 shadow-xl shadow-rose-500/20 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
          <span class="relative flex h-3.5 w-3.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
          </span>
          <span id="panic-btn-text">🚨 Panic Mode Sprint</span>
        </button>
      </div>
    `;

    const mainCol = document.querySelector('.lg\\:col-span-3') || document.querySelector('main');
    const header = mainCol?.querySelector('header');
    
    if (header) {
        header.insertAdjacentHTML('afterend', toggleHtml);
    } else if (mainCol) {
        mainCol.insertAdjacentHTML('afterbegin', toggleHtml);
    }

    const btn = document.getElementById('panic-toggle-btn');
    let isPanicIndicator = false;

    // Inject styles explicitly
    const style = document.createElement('style');
    style.textContent = `
        .panic-mode-active .panic-hide {
            display: none !important;
        }
        .panic-mode-active .panic-focus {
            box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.4) !important;
            border-color: rgba(244, 63, 94, 0.6) !important;
        }
    `;
    document.head.appendChild(style);

    btn?.addEventListener('click', () => {
        isPanicIndicator = !isPanicIndicator;
        document.body.classList.toggle('panic-mode-active', isPanicIndicator);
        
        const textSpan = document.getElementById('panic-btn-text');

        if (isPanicIndicator) {
            btn.classList.add('bg-rose-600', 'text-white', 'dark:bg-rose-600');
            btn.classList.remove('bg-white', 'text-rose-600', 'dark:bg-slate-900');
            if (textSpan) textSpan.innerText = "Exit Panic Mode";
            applyFiltering();
        } else {
            btn.classList.remove('bg-rose-600', 'text-white', 'dark:bg-rose-600');
            btn.classList.add('bg-white', 'text-rose-600', 'dark:bg-slate-900');
            if (textSpan) textSpan.innerText = "🚨 Panic Mode Sprint";
            clearFiltering();
        }
    });

    function applyFiltering() {
        const blocks = document.querySelectorAll('section[id^="unit"], .mb-8[id^="u"], .glass-panel[id^="unit"], .glass-card, li, .flex.items-center.gap-4');
        
        blocks.forEach(block => {
            const text = block.textContent?.toLowerCase() || '';
            const isHighYield = text.includes('10 marks') || text.includes('15 marks') || text.includes('10m') || text.includes('15m') || text.includes('high yield');
            const isDerivation = text.includes('derivation');
            const isPYQ = text.includes('pyq') || text.includes('repeated');
            
            if ((isHighYield || isDerivation || isPYQ) && text.trim().length > 5) {
                block.classList.add('panic-focus');
                block.classList.remove('panic-hide');
                
                let p = block.parentElement;
                while (p && p.tagName !== 'BODY') {
                    p.classList.remove('panic-hide');
                    p.classList.remove('panic-focus'); // parent shouldn't have focus, just not hide
                    p = p.parentElement;
                }
            } else {
                if (!block.classList.contains('panic-focus')) {
                   block.classList.add('panic-hide');
                }
            }
        });

        document.querySelectorAll('section').forEach(sec => {
            if (!sec.querySelector('.panic-focus')) {
                sec.classList.add('panic-hide');
            } else {
                 sec.classList.remove('panic-hide');
            }
        });
        
        document.querySelectorAll('nav, header, #subject-tabs-container, #derivations-widget').forEach(el => {
            el.classList.remove('panic-hide');
        });
    }

    function clearFiltering() {
        document.querySelectorAll('.panic-hide, .panic-focus').forEach(el => {
            el.classList.remove('panic-hide', 'panic-focus');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPanicMode);
} else {
    initPanicMode();
}
