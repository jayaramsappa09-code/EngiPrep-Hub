import './derivations-widget.css';

const CHEM_DERIVATIONS = [
  { id: 'schrodinger', title: 'Schrodinger Wave Eq.', weight: 15 },
  { id: 'nernst', title: 'Nernst Equation', weight: 10 },
  { id: 'beer_lambert', title: 'Beer-Lambert Law', weight: 8 },
  { id: 'benzene_mo', title: 'Benzene π-MO Theory', weight: 8 }
];

const PHYS_DERIVATIONS = [
  { id: 'newtons_rings', title: "Newton's Rings Film", weight: 15 },
  { id: 'acceptance_angle', title: 'Acceptance Angle & N.A.', weight: 10 },
  { id: 'hall_effect', title: 'Hall Effect Coeff.', weight: 8 },
  { id: 'apf', title: 'APF for BCC/FCC/HCP', weight: 8 }
];

function initWidget() {
  // Determine subject
  const isChem = window.location.pathname.includes('chemistry');
  const isPhys = window.location.pathname.includes('physics');
  
  if (!isChem && !isPhys) return;

  const subjectId = isChem ? 'chemistry' : 'physics';
  const derivations = isChem ? CHEM_DERIVATIONS : PHYS_DERIVATIONS;
  const storageKey = `derivations_mastered_${subjectId}`;

  // Read mastered state
  const mastered: string[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
  
  // Create UI
  const widgetHtml = `
    <div id="derivations-widget" class="mb-12 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
        <!-- Background Accents -->
        <div class="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

        <div class="flex-1 w-full relative z-10">
            <div class="flex items-center gap-2 mb-2">
                <span class="text-xl">🔥</span>
                <h3 class="text-lg font-black text-slate-900 dark:text-slate-50 tracking-tight uppercase">Most Repeated Derivations</h3>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-sm">
                Master the highest-weightage topics to secure guaranteed marks in JNTUK R23.
            </p>

            <!-- Progress Bar -->
            <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-2 relative overflow-hidden">
                <div id="deriv_prog_bar" class="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
            <div class="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>Progress</span>
                <span id="deriv_prog_text">0%</span>
            </div>
        </div>

        <div class="w-full md:w-[320px] bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 relative z-10 relative">
            <h4 class="text-[10px] uppercase font-black tracking-widest text-indigo-500 mb-3">Up Next For You:</h4>
            
            <div id="deriv_next_suggest" class="mb-4">
                <!-- Injected via JS -->
            </div>

            <h4 class="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 mt-4 border-t border-slate-200 dark:border-slate-800 pt-3">Top Derivations Track:</h4>
            <div id="deriv_list" class="space-y-2">
                <!-- Injected via JS -->
            </div>
        </div>
    </div>
  `;

  // Inject into DOM
  // We want to insert it after the <header> inside the main content column.
  const mainCol = document.querySelector('.lg\\:col-span-3') || document.querySelector('main');
  const header = mainCol?.querySelector('header');
  
  if (header) {
      const widgetWrapper = document.createElement('div');
      widgetWrapper.innerHTML = widgetHtml;
      header.insertAdjacentElement('afterend', widgetWrapper.firstElementChild as Node);
  } else if (mainCol) {
      const widgetWrapper = document.createElement('div');
      widgetWrapper.innerHTML = widgetHtml;
      mainCol.insertBefore(widgetWrapper.firstElementChild as Node, mainCol.firstChild);
  }

  // Bind logic
  renderWidget();

  function toggleMastery(id: string) {
      const idx = mastered.indexOf(id);
      if (idx > -1) {
          mastered.splice(idx, 1);
      } else {
          mastered.push(id);
      }
      localStorage.setItem(storageKey, JSON.stringify(mastered));
      renderWidget();
  }

  // Expose globally for inline onclick
  (window as any).toggleDerivation = toggleMastery;

  function renderWidget() {
      // Calculate progress
      const totalWeight = derivations.reduce((sum, d) => sum + d.weight, 0);
      const masteryWeight = derivations.filter(d => mastered.includes(d.id)).reduce((sum, d) => sum + d.weight, 0);
      const progress = Math.round((masteryWeight / totalWeight) * 100) || 0;

      const pBar = document.getElementById('deriv_prog_bar');
      const pText = document.getElementById('deriv_prog_text');
      if (pBar) pBar.style.width = `${progress}%`;
      if (pText) pText.innerText = `${progress}%`;

      const listContainer = document.getElementById('deriv_list');
      const suggestContainer = document.getElementById('deriv_next_suggest');
      
      if (!listContainer || !suggestContainer) return;

      let html = '';
      let nextSuggest = null;

      for (const d of derivations) {
          const isMastered = mastered.includes(d.id);
          
          if (!isMastered && !nextSuggest) {
              nextSuggest = d;
          }

          html += `
            <label class="flex justify-between items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div class="flex items-center gap-2">
                    <input type="checkbox" onchange="window.toggleDerivation('${d.id}')" ${isMastered ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-indigo-500 bg-slate-200 border-slate-300 dark:bg-slate-700 dark:border-slate-600 focus:ring-indigo-500 dark:ring-offset-slate-900 transition-all cursor-pointer">
                    <span class="text-xs font-semibold ${isMastered ? 'line-through text-slate-400 dark:text-slate-600' : 'text-slate-700 dark:text-slate-200'}">${d.title}</span>
                </div>
                <span class="text-[10px] font-black ${isMastered ? 'text-slate-300 dark:text-slate-700' : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'} px-1.5 py-0.5 rounded">${d.weight}M</span>
            </label>
          `;
      }
      
      listContainer.innerHTML = html;

      if (nextSuggest) {
          suggestContainer.innerHTML = `
              <div class="flex items-center gap-3">
                  <div class="h-10 w-10 flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                      <h5 class="text-sm font-bold text-slate-900 dark:text-slate-50">${nextSuggest.title}</h5>
                      <p class="text-[10px] font-bold text-emerald-500">Weightage: ${nextSuggest.weight} Marks</p>
                  </div>
              </div>
          `;
      } else {
          suggestContainer.innerHTML = `
              <div class="flex items-center gap-3">
                  <div class="h-10 w-10 flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <span class="text-xl">🏆</span>
                  </div>
                  <div>
                      <h5 class="text-sm font-bold text-slate-900 dark:text-slate-50">Mastered All!</h5>
                      <p class="text-[10px] font-bold text-slate-500">You are ready for the exam.</p>
                  </div>
              </div>
          `;
      }
  }

}

// Wait for DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
} else {
    initWidget();
}
