import { AI_MEMORY } from './ai/memory/memory.js';

// Fully loaded JNTUK R23 curriculum content with dynamic simulators
export const GRAPHICS_LAB_DATA: Record<string, {
  title: string;
  unit: string;
  desc: string;
  interactiveHtml: string;
  initScript?: (container: HTMLElement) => void;
}> = {
  // --- UNIT 1: MANUAL DRAWINGS ---
  'lines': {
    title: 'Lines & Lettering (JNTUK Standard)',
    unit: 'Unit I',
    desc: 'Understand correct line weight protocols and lettering proportions according to IS:10711-2001.',
    interactiveHtml: `
      <div class="space-y-4">
        <div class="p-4 bg-indigo-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Practice Box: Identify and Draw standard Line Types</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button class="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-left flex flex-col gap-1 hover:border-indigo-500" onclick="window.drawPresetLine('object')">
              <span class="text-indigo-600 font-extrabold uppercase text-[9px]">Object Line</span>
              <div class="h-1.5 bg-slate-900 dark:bg-white rounded w-full"></div>
            </button>
            <button class="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-left flex flex-col gap-1 hover:border-indigo-500" onclick="window.drawPresetLine('hidden')">
              <span class="text-blue-500 font-extrabold uppercase text-[9px]">Hidden Line</span>
              <div class="h-1 bg-transparent border-t-2 border-indigo-500 border-dashed w-full pt-1"></div>
            </button>
            <button class="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-left flex flex-col gap-1 hover:border-indigo-500" onclick="window.drawPresetLine('center')">
              <span class="text-red-500 font-extrabold uppercase text-[9px]">Center Line</span>
              <div class="h-1 pt-1 flex gap-0.5 justify-center w-full">
                <span class="w-6 h-0.5 bg-red-500"></span><span class="w-1.5 h-0.5 bg-red-500"></span><span class="w-6 h-0.5 bg-red-500"></span>
              </div>
            </button>
          </div>
        </div>

        <div class="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-950/60 p-4 relative">
          <h4 class="text-xs font-black uppercase text-indigo-500 mb-2">Active Drawing Sheet Canvas</h4>
          <canvas id="lines-canvas" width="600" height="250" class="w-full bg-[#111118] border border-slate-850 rounded-2xl cursor-crosshair h-48"></canvas>
          <div class="flex items-center justify-between text-[10px] mt-2 font-semibold">
            <span id="canvas-status" class="text-slate-400">Click and drag to draw lines manually.</span>
            <button class="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-300" onclick="window.clearLinesCanvas()">Clear Board</button>
          </div>
        </div>
      </div>
    `,
    initScript: (container) => {
      const canvas = container.querySelector('#lines-canvas') as HTMLCanvasElement;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let drawing = false;
      let lastX = 0, lastY = 0;
      let activeStyle: 'object' | 'hidden' | 'center' = 'object';

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;

      (window as any).drawPresetLine = (type: any) => {
        activeStyle = type;
        const status = container.querySelector('#canvas-status');
        if (status) status.textContent = `Mode Selected: ${type.toUpperCase()} line representation. Try drawing on the board!`;
      };

      (window as any).clearLinesCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
      });

      canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        if (activeStyle === 'object') {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.setLineDash([]);
        } else if (activeStyle === 'hidden') {
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 6]);
        } else {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.setLineDash([15, 5, 2, 5]);
        }

        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
      });

      canvas.addEventListener('mouseup', () => {
        drawing = false;
        AI_MEMORY.rewardXP(5, 'Completed Line drawing exercise');
      });
    }
  },

  'conics': {
    title: 'Conic Sections - Eccentricity Calculator',
    unit: 'Unit I',
    desc: 'Locus of points where ratio of distance from focus is proportional to directrix.',
    interactiveHtml: `
      <div class="space-y-4">
        <div class="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black uppercase text-indigo-500">Eccentricity Ratio (e)</span>
            <span id="ecc-val" class="text-sm font-black font-mono text-indigo-600">0.70</span>
          </div>
          <input type="range" id="ecc-slider" min="0.2" max="1.8" step="0.05" value="0.7" class="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer">
          <div class="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-tight">
            <span>Ellipse (e < 1)</span>
            <span>Parabola (e = 1)</span>
            <span>Hyperbola (e > 1)</span>
          </div>
        </div>

        <div class="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-950 p-4 flex flex-col items-center">
          <h4 id="conic-classification" class="text-sm font-black text-slate-800 dark:text-white uppercase mb-2">ELLIPSE DETECTED</h4>
          <svg id="conic-svg" viewBox="0 0 500 300" class="w-full h-64 border border-slate-200 dark:border-slate-850 bg-black/40 rounded-2xl">
            <!-- Gridlines -->
            <line x1="100" y1="20" x2="100" y2="280" stroke="#374151" stroke-width="1" />
            <line x1="50" y1="150" x2="450" y2="150" stroke="#374151" stroke-width="1" />
            <circle cx="180" cy="150" r="3" fill="#ef4444" />
            <text x="175" y="168" fill="#ef4444" font-size="10" font-weight="bold">Focus F</text>
            <text x="85" y="40" fill="#3b82f6" font-size="10" font-weight="bold" transform="rotate(-90 85 40)">Directrix</text>
            
            <path id="conic-curve" fill="none" stroke="#22d3ee" stroke-width="3" d="M 130 150 Q 150 150 180 150" />
          </svg>
        </div>
      </div>
    `,
    initScript: (container) => {
      const slider = container.querySelector('#ecc-slider') as HTMLInputElement;
      const display = container.querySelector('#ecc-val');
      const classification = container.querySelector('#conic-classification');
      const path = container.querySelector('#conic-curve');

      if (!slider || !display || !classification || !path) return;

      const updateConic = () => {
        const val = parseFloat(slider.value);
        display.textContent = val.toFixed(2);
        
        let pathD = '';
        if (val < 1) {
          classification.textContent = `Ellipse detected (e = ${val} < 1)`;
          classification.className = 'text-sm font-black text-indigo-600 uppercase mb-2';
          // Draw ellipse path
          pathD = `M 130 150 C 130 100, ${130 + 150 * val} 50, ${130 + 200 * val} 150 C ${130 + 200 * val} 250, 130 200, 130 150`;
        } else if (Math.abs(val - 1) < 0.01) {
          classification.textContent = `Parabola detected (e = 1)`;
          classification.className = 'text-sm font-black text-emerald-500 uppercase mb-2';
          // Draw parabola
          pathD = `M 400 30 Q 140 150, 400 270`;
        } else {
          classification.textContent = `Hyperbola detected (e = ${val} > 1)`;
          classification.className = 'text-sm font-black text-rose-500 uppercase mb-2';
          // Draw hyperbola
          pathD = `M 380 40 Q 180 150, 380 260`;
        }
        path.setAttribute('d', pathD);
      };

      slider.addEventListener('input', updateConic);
      updateConic();
    }
  },

  'scales': {
    title: 'Representative Fraction (RF) & Scales',
    unit: 'Unit I',
    desc: 'Calculate RF values and map dynamic divisions on Plain and Diagonal scales.',
    interactiveHtml: `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <label class="text-[9px] font-black uppercase text-indigo-505 block mb-1">Drawing Length (mm):</label>
            <input type="number" id="sc-draw" value="50" class="w-full bg-black border border-slate-800 rounded-xl p-2.5 text-sm font-mono text-slate-100 font-bold focus:border-indigo-500 outline-none">
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <label class="text-[9px] font-black uppercase text-indigo-505 block mb-1">Actual Length (meters):</label>
            <input type="number" id="sc-act" value="10" class="w-full bg-black border border-slate-800 rounded-xl p-2.5 text-sm font-mono text-slate-100 font-bold focus:border-indigo-500 outline-none">
          </div>
        </div>

        <div class="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between">
          <span class="text-xs font-black uppercase text-indigo-400">Representative Fraction (R.F.)</span>
          <span id="sc-rf" class="text-sm font-black font-mono text-white">1 : 200</span>
        </div>
      </div>
    `,
    initScript: (container) => {
      const drawInput = container.querySelector('#sc-draw') as HTMLInputElement;
      const actInput = container.querySelector('#sc-act') as HTMLInputElement;
      const rf = container.querySelector('#sc-rf');

      if (!drawInput || !actInput || !rf) return;

      const calcRF = () => {
        const d = parseFloat(drawInput.value) || 1;
        const a = parseFloat(actInput.value) || 1;
        const a_mm = a * 1000; // convert to mm
        const ratio = Math.round(a_mm / d);
        rf.textContent = `1 : ${ratio}`;
      };

      drawInput.addEventListener('input', calcRF);
      actInput.addEventListener('input', calcRF);
      calcRF();
    }
  },

  // --- UNIT 2: PROJECTIONS ---
  'ortho-intro': {
    title: 'Planes & Projections of Points',
    unit: 'Unit II',
    desc: 'Understand the multi-quadrant reference grid separating horizontal (HP) and vertical (VP) planes.',
    interactiveHtml: `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-100/10 rounded-2xl">
            <label class="text-[9px] font-black uppercase text-indigo-505 block mb-1">Vertical axis coordinate (VP or HP):</label>
            <input type="range" id="pt-vp" min="-50" max="50" value="30" class="w-full h-1 bg-indigo-500 rounded-lg appearance-none cursor-pointer">
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-100/10 rounded-2xl">
            <label class="text-[9px] font-black uppercase text-indigo-505 block mb-1">Horizontal axis coordinate (HP or VP):</label>
            <input type="range" id="pt-hp" min="-50" max="50" value="40" class="w-full h-1 bg-indigo-500 rounded-lg appearance-none cursor-pointer">
          </div>
        </div>

        <div class="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-950 p-4">
          <svg viewBox="0 0 400 300" class="w-full h-64 border border-slate-200 dark:border-slate-850 bg-black/40 rounded-2xl">
            <!-- Base plane -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="#4b5563" stroke-width="2" />
            <text x="325" y="140" fill="#64748b" font-size="10" font-weight="bold">X - Y</text>
            
            <line x1="200" y1="50" x2="200" y2="250" stroke="#4b5563" stroke-dasharray="4 4" />
            
            <!-- Dynamic project Point -->
            <circle id="proj-dot" cx="240" cy="110" r="6" fill="#fbbf24" />
            <!-- Project Line markers -->
            <line id="proj-line-vp" x1="240" y1="110" x2="240" y2="150" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="2 2" />
          </svg>
        </div>
      </div>
    `,
    initScript: (container) => {
      const vp = container.querySelector('#pt-vp') as HTMLInputElement;
      const hp = container.querySelector('#pt-hp') as HTMLInputElement;
      const dot = container.querySelector('#proj-dot');
      const line = container.querySelector('#proj-line-vp');

      if (!vp || !hp || !dot || !line) return;

      const triggerProjection = () => {
        const vVal = parseFloat(vp.value);
        const hVal = parseFloat(hp.value);
        
        const cx = 200 + hVal;
        const cy = 150 - vVal;

        dot.setAttribute('cx', cx.toString());
        dot.setAttribute('cy', cy.toString());

        line.setAttribute('x1', cx.toString());
        line.setAttribute('y1', cy.toString());
        line.setAttribute('x2', cx.toString());
        line.setAttribute('y2', '150');
      };

      vp.addEventListener('input', triggerProjection);
      hp.addEventListener('input', triggerProjection);
      triggerProjection();
    }
  },

  // --- UNIT 5: AUTOCAD MODULES ---
  'cadlab': {
    title: 'AutoCAD Terminal Master Sandbox',
    unit: 'Unit V',
    desc: 'Practise JNTUK graphics commands. Standard CLI codes are functional in sandbox.',
    interactiveHtml: `
      <div id="react-cad-tutor-root"></div>
    `,
    initScript: () => {
      if (typeof window !== 'undefined' && (window as any).initAutoCADTutor) {
        (window as any).initAutoCADTutor('react-cad-tutor-root');
      }
    }
  }
};

// Global route handling mechanisms
export const GRAPHICS_ROUTER = {
  activeMode: 'eg',

  switchMode(mode: 'eg' | 'cad', element?: HTMLElement) {
    this.activeMode = mode;
    
    // Toggle active menu selectors
    const egNav = document.getElementById('eg-nav');
    const cadNav = document.getElementById('cad-nav');
    
    if (egNav && cadNav) {
      if (mode === 'eg') {
        egNav.style.display = 'block';
        cadNav.style.display = 'none';
      } else {
        egNav.style.display = 'none';
        cadNav.style.display = 'block';
      }
    }

    // Toggle button stylings
    if (element) {
      const btns = element.parentElement?.querySelectorAll('.mbtn');
      btns?.forEach(b => b.classList.remove('act'));
      element.classList.add('act');
    }

    // Direct redirection to default modes
    if (mode === 'eg') {
      this.gto('lines');
    } else {
      this.gto('cadlab');
    }
  },

  gto(topicKey: string, element?: HTMLElement) {
    const mainArea = document.getElementById('main');
    if (!mainArea) return;

    // Highlight active link in sidebar
    if (element) {
      const siblings = element.parentElement?.querySelectorAll('.nit');
      siblings?.forEach(s => s.classList.remove('act'));
      element.classList.add('act');
    }

    // Select topic content
    const data = GRAPHICS_LAB_DATA[topicKey];
    if (data) {
      mainArea.innerHTML = `
        <div class="cwrap space-y-6 animate-fadeIn">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span class="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/20 text-indigo-500 text-[10px] font-black uppercase tracking-widest rounded-xl inline-block mb-2">${data.unit} Syllabus Match</span>
            <h1 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-snug">${data.title}</h1>
            <p class="text-sm text-slate-500 leading-normal mt-1">${data.desc}</p>
          </div>

          <!-- Dynamic visualizer card representation -->
          <div id="graphics-visualizer-card" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            ${data.interactiveHtml}
          </div>
        </div>
      `;

      // Run code binders on compile success
      if (typeof data.initScript === 'function') {
        const visualizer = document.getElementById('graphics-visualizer-card');
        if (visualizer) data.initScript(visualizer);
      }
    } else {
      // General textbook static fallback for normal units
      mainArea.innerHTML = `
        <div class="cwrap py-12 text-center text-slate-400">
          <h2 class="text-lg font-black uppercase mb-1">Lesson Content Hub</h2>
          <p class="text-xs">Dynamic visuals and solvers for <b>${topicKey}</b> compiles shortly.</p>
        </div>
      `;
    }

    // Scroll main back to top
    mainArea.scrollTop = 0;
  }
};

// Bind to window to allow global events
if (typeof window !== 'undefined') {
  (window as any).gto = (key: string, el: HTMLElement) => GRAPHICS_ROUTER.gto(key, el);
  (window as any).switchMode = (mode: 'eg' | 'cad', el: HTMLElement) => GRAPHICS_ROUTER.switchMode(mode, el);

  // Auto-boot landing page on DOM mount
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('eg-nav')) {
      GRAPHICS_ROUTER.gto('lines');
    }
  });
}
