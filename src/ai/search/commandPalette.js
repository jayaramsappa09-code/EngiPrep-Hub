import { FUZZY_SEARCH } from './searchEngine.js';
import { AI_ROUTER } from '../router/router.js';
import { AI_MEMORY } from '../memory/memory.js';
import { ROUTES } from '../db/routes.js';

export const COMMAND_PALETTE = {
  containerId: 'engi-command-palette-modal',
  isOpen: false,

  // Inject command palette wrapper and stylesheet into the document
  init() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(this.containerId)) return;

    // Create modal DOM structure
    const modal = document.createElement('div');
    modal.id = this.containerId;
    modal.className = 'fixed inset-0 z-[99999] hidden flex items-start justify-center p-4 md:p-12 select-none';
    modal.innerHTML = `
      <!-- Backdrop -->
      <div id="engi-palette-backdrop" class="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"></div>
      
      <!-- Palette Card -->
      <div class="relative w-full max-w-2xl bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl overflow-hidden transform scale-95 opacity-0 transition-all duration-200 flex flex-col max-h-[80vh] mt-8 text-slate-850 dark:text-slate-100">
        <!-- Input Header -->
        <div class="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <svg class="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input type="text" id="engi-palette-input" placeholder="Search JNTUK R23 topics (e.g., maths matrices, pointers, newtons rings)..." class="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-sm font-semibold placeholder-slate-400 dark:placeholder-slate-500 py-1 outline-none text-slate-900 dark:text-white" autocomplete="off">
          <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] uppercase font-black tracking-widest rounded-lg border border-slate-200 dark:border-slate-700 select-none shrink-0 cursor-default">ESC</span>
        </div>

        <!-- Scrollable content -->
        <div id="engi-palette-content" class="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800 select-text">
          <!-- Live results (hidden initially) -->
          <div id="engi-palette-results" class="hidden space-y-2">
            <h5 class="text-[10px] font-black uppercase text-indigo-500 tracking-widest px-1">Syllabus Match Results</h5>
            <div id="engi-palette-results-list" class="space-y-1"></div>
          </div>

          <!-- Defaults (shown initially) -->
          <div id="engi-palette-defaults" class="space-y-4">
            <!-- Weak Topics Suggestions -->
            <div id="engi-palette-weak" class="hidden space-y-1.5">
              <h5 class="text-[10px] font-black uppercase text-rose-500 tracking-widest px-1 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                Weak Topics Recovery Board
              </h5>
              <div id="engi-palette-weak-list" class="grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
            </div>

            <!-- Recent Searches -->
            <div id="engi-palette-recent" class="hidden space-y-1.5">
              <h5 class="text-[10px] font-black uppercase text-indigo-400 tracking-widest px-1">Recent Journeys</h5>
              <div id="engi-palette-recent-list" class="space-y-1"></div>
            </div>

            <!-- High Yield Trending searches -->
            <div class="space-y-2">
              <h5 class="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest px-1">Trending JNTUK Prep Queries</h5>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button class="engi-palette-pill" data-query="m1 eigenvalues">
                  <span class="text-indigo-400 font-bold">#1</span> Matrices & Trace
                </button>
                <button class="engi-palette-pill" data-query="wave optics">
                  <span class="text-[#c026d3] font-bold">#2</span> Newton's Rings
                </button>
                <button class="engi-palette-pill" data-query="c pointers">
                  <span class="text-[#3b82f6] font-bold">#3</span> C Pointers Lab
                </button>
                <button class="engi-palette-pill" data-query="battery chemistry">
                  <span class="text-[#10b981] font-bold">#4</span> Batter & Electro
                </button>
                <button class="engi-palette-pill" data-query="superposition beee">
                  <span class="text-[#f59e0b] font-bold">#5</span> Superposition Volt
                </button>
                <button class="engi-palette-pill" data-query="involute graphics">
                  <span class="text-pink-500 font-bold">#6</span> Conics & Involutes
                </button>
              </div>
            </div>
            
            <!-- Quick Navigation Shortcuts -->
            <div class="space-y-1.5">
              <h5 class="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest px-1">Global Destinations</h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a href="/ai-professor.html" class="engi-destination-item">
                  <span class="text-sm">🎓</span>
                  <div>
                    <div class="text-xs font-bold leading-normal">AI Study Professor Suite</div>
                    <div class="text-[9px] text-slate-405 leading-none">Interactive simulations & multi-mode chatbot</div>
                  </div>
                </a>
                <a href="/jntuk-r23-previous-question-papers" class="engi-destination-item">
                  <span class="text-sm">🎯</span>
                  <div>
                    <div class="text-xs font-bold leading-normal">Syllabus PYQ Repository</div>
                    <div class="text-[9px] text-slate-405 leading-none">Standard JNTUK board papers (2021-2024)</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Help -->
        <div class="px-5 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest select-none">
          <div class="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Enter to Run</span>
          </div>
          <div class="flex items-center gap-1">
            <span>Powering Local Academic OS</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Style overrides for custom command palette
    if (!document.getElementById('engi-palette-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'engi-palette-styles';
      styleEl.textContent = `
        #engi-command-palette-modal .engi-palette-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 12px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          text-align: left;
          width: 100%;
          border: 1px solid rgb(226 232 240);
          background-color: rgb(248 250 252);
          color: rgb(71 85 105);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .dark #engi-command-palette-modal .engi-palette-pill {
          background-color: rgb(15 23 42 / 60%);
          border-color: rgb(30 41 59);
          color: rgb(203 213 225);
        }
        #engi-command-palette-modal .engi-palette-pill:hover {
          background-color: rgb(239 246 255);
          border-color: rgb(191 219 254);
          color: rgb(37 99 235);
          transform: translateY(-1px);
        }
        .dark #engi-command-palette-modal .engi-palette-pill:hover {
          background-color: rgb(30 41 59);
          border-color: rgb(79 70 229);
          color: #ffffff;
        }
        #engi-command-palette-modal .engi-destination-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 16px;
          border: 1px solid rgb(226 232 240);
          background-color: #ffffff;
          color: inherit;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .dark #engi-command-palette-modal .engi-destination-item {
          background-color: rgb(15 23 42 / 40%);
          border-color: rgb(30 41 59);
        }
        #engi-command-palette-modal .engi-destination-item:hover {
          border-color: rgb(79 70 229 / 40%);
          background-color: rgb(79 70 229 / 5%);
          transform: translateY(-1px);
        }
        #engi-command-palette-modal .engi-search-row {
          display: flex;
          align-items: center;
          justify-between: space-between;
          padding: 10px 14px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        #engi-command-palette-modal .engi-search-row:hover,
        #engi-command-palette-modal .engi-search-row.selected {
          background-color: rgb(79 70 229 / 10%);
          color: rgb(79 70 229);
        }
        .dark #engi-command-palette-modal .engi-search-row:hover,
        .dark #engi-command-palette-modal .engi-search-row.selected {
          background-color: rgb(79 70 229 / 20%);
          color: #ffffff;
        }
        #engi-command-palette-modal .bg-slate-905 {
          background-color: #080c14;
        }
        #engi-command-palette-modal .text-slate-405 {
          color: #94a3b8;
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Set up listeners
    this.setupListeners();
    this.refreshMemoryLists();
  },

  // Open the palette UI with animation transitions
  show() {
    const modal = document.getElementById(this.containerId);
    if (!modal) return;

    this.isOpen = true;
    modal.classList.remove('hidden');
    this.refreshMemoryLists();

    // Trigger opening transitions
    setTimeout(() => {
      const card = modal.querySelector('.relative');
      if (card) {
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
      }
      const input = document.getElementById('engi-palette-input');
      if (input) {
        input.value = '';
        input.focus();
      }
      this.handleSearch('');
    }, 50);
  },

  // Close the palette smoothly
  hide() {
    const modal = document.getElementById(this.containerId);
    if (!modal) return;

    this.isOpen = false;
    const card = modal.querySelector('.relative');
    if (card) {
      card.classList.remove('scale-100', 'opacity-100');
      card.classList.add('scale-95', 'opacity-0');
    }

    // Timeout for translation completes
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  },

  // Load live content based on current storage registers
  refreshMemoryLists() {
    const weakList = document.getElementById('engi-palette-weak-list');
    const weakBlock = document.getElementById('engi-palette-weak');
    
    // 1. Weak Topics Board
    const weaks = AI_MEMORY.getWeakTopics();
    if (weaks && weaks.length > 0) {
      weakBlock.classList.remove('hidden');
      
      // Match route data
      const matchedRoutes = ROUTES.filter(r => weaks.includes(r.id)).slice(0, 4);
      if (matchedRoutes.length > 0) {
        weakList.innerHTML = matchedRoutes.map(route => `
          <button class="p-2.5 bg-rose-50 dark:bg-rose-950/15 border border-rose-200/40 dark:border-rose-900/40 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/30 text-left transition-all text-rose-700 dark:text-rose-300 flex items-center justify-between gap-1" onclick="window.handleAISemanticRouting('${route.topic}')">
            <span class="text-[10px] font-black uppercase truncate">${route.subject.replace('Engineering ', '')} • ${route.unit}</span>
            <span class="text-[8.5px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-rose-500/10 text-rose-500 rounded border border-rose-500/10 shrink-0">FAIL RISK</span>
          </button>
        `).join('');
      } else {
        weakBlock.classList.add('hidden');
      }
    } else {
      weakBlock.classList.add('hidden');
    }

    // 2. Recent Searches list
    const recentList = document.getElementById('engi-palette-recent-list');
    const recentBlock = document.getElementById('engi-palette-recent');
    const history = JSON.parse(localStorage.getItem(AI_MEMORY.KEYS.SEARCH_HISTORY) || '[]');
    
    if (history && history.length > 0) {
      recentBlock.classList.remove('hidden');
      
      recentList.innerHTML = history.slice(0, 4).map(item => `
        <div class="engi-search-row flex items-center justify-between font-medium text-xs border border-slate-200/50 dark:border-slate-800/40" onclick="window.handleAISemanticRouting('${item.query}')">
          <div class="flex items-center gap-3">
            <span class="text-slate-400">⏱</span>
            <span class="font-semibold text-slate-800 dark:text-slate-200">${item.query}</span>
          </div>
          <span class="text-[9px] text-slate-400 font-mono uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded leading-none shrink-0">${item.subject || 'All Units'}</span>
        </div>
      `).join('');
    } else {
      recentBlock.classList.add('hidden');
    }
  },

  // Dynamic typeahead fuzzy search engine linkage with live elements
  handleSearch(query) {
    const resultsBlock = document.getElementById('engi-palette-results');
    const resultsList = document.getElementById('engi-palette-results-list');
    const defaultsBlock = document.getElementById('engi-palette-defaults');

    if (!query) {
      resultsBlock.classList.add('hidden');
      defaultsBlock.classList.remove('hidden');
      return;
    }

    // Capture fuzzy matching
    const matches = FUZZY_SEARCH.search(query);
    if (matches.length > 0) {
      defaultsBlock.classList.add('hidden');
      resultsBlock.classList.remove('remove');
      resultsBlock.classList.remove('hidden');
      
      resultsList.innerHTML = matches.slice(0, 5).map(route => `
        <div class="engi-search-row flex items-center justify-between gap-4 border border-transparent hover:border-indigo-500/10" onclick="window.handleAISemanticRouting('${route.topic}')">
          <div class="flex items-center gap-3 truncate">
            <span class="text-sm shrink-0">📖</span>
            <div class="truncate">
              <div class="text-xs font-bold text-slate-800 dark:text-slate-100 leading-normal">${route.topic}</div>
              <div class="text-[9px] text-slate-400 dark:text-slate-500 leading-none">${route.subject} • ${route.unit}</div>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0 select-none">
            <span class="text-[8.5px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black rounded-lg text-slate-400 dark:text-slate-500 uppercase leading-none">LAUNCH ➜</span>
          </div>
        </div>
      `).join('');
    } else {
      defaultsBlock.classList.add('hidden');
      resultsBlock.classList.remove('hidden');
      resultsList.innerHTML = `
        <div class="p-6 text-center text-slate-400 dark:text-slate-500 text-xs italic">
          No syllabus matches found. Try entering abbreviations like "m1", "eg", "c lab" or "beee".
        </div>
      `;
    }
  },

  // General keyboard triggers (Ctrl + K) & interactions registry
  setupListeners() {
    // Escape or outer click close
    const backdrop = document.getElementById('engi-palette-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.hide());
    }

    document.addEventListener('keydown', (e) => {
      // 1. Hotkey trigger
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (this.isOpen) {
          this.hide();
        } else {
          this.show();
        }
      }

      // 2. Escape to close
      if (e.key === 'Escape' && this.isOpen) {
        this.hide();
      }

      // 3. Command list navigation utilizing up/down registers
      if (this.isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
        const rows = document.querySelectorAll('#engi-palette-results-list .engi-search-row, #engi-palette-recent-list .engi-search-row');
        if (rows.length === 0) return;

        let selectedIdx = -1;
        rows.forEach((row, i) => {
          if (row.classList.contains('selected')) {
            selectedIdx = i;
          }
        });

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          rows.forEach(r => r.classList.remove('selected'));
          const nextIdx = (selectedIdx + 1) % rows.length;
          rows[nextIdx].classList.add('selected');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          rows.forEach(r => r.classList.remove('selected'));
          const prevIdx = (selectedIdx - 1 + rows.length) % rows.length;
          rows[prevIdx].classList.add('selected');
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (selectedIdx > -1) {
            rows[selectedIdx].click();
          } else {
            // Apply submit input value
            const inputVal = document.getElementById('engi-palette-input').value.trim();
            if (inputVal) {
              AI_ROUTER.navigateToQuery(inputVal);
            }
          }
        }
      }
    });

    // Handle typing events in live interface inputs
    const input = document.getElementById('engi-palette-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // Set pill buttons bindings
    document.querySelectorAll('.engi-palette-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const qData = pill.getAttribute('data-query');
        if (qData) {
          window.handleAISemanticRouting(qData);
        }
      });
    });
  }
};

// Auto boot palette on runtime load!
if (typeof window !== 'undefined') {
  window.COMMAND_PALETTE = COMMAND_PALETTE;
  
  // Create wrapper after HTML fully mounts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => COMMAND_PALETTE.init());
  } else {
    COMMAND_PALETTE.init();
  }

  // Set AISearch helper
  window.setAISearchQuery = (q) => {
    COMMAND_PALETTE.show();
    const input = document.getElementById('engi-palette-input');
    if (input) {
      input.value = q;
      COMMAND_PALETTE.handleSearch(q);
    }
  };
}
