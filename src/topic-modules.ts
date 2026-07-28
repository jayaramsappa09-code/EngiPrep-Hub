/**
 * EngiPrepHub Topic Modules Hydration Engine
 * Dynamically parses, structures, and hydrates study content into interactive modules:
 * - Concept Simplification Module (with Text-to-Speech audio assistant)
 * - Visual Assets & Illustrations Module (SVG rendering, AutoCAD terminal matrices, interactive canvas)
 * - Common Mistakes & Pitfalls Module (Bad vs Good comparison cards, trap alerts)
 * - PYQs & Solved Examples Module (Self-test toggle drawers, mark weightage badges)
 * - Formula Index Module (Interactive formula & unit matrices)
 * - Memory Tricks & Mnemonics Module
 */

import { FacultyReviewEngine } from './ai/facultyReview';

export interface TopicModuleData {
  concept?: string;
  visuals?: string;
  commonMistakes?: string[];
  pyqs?: { question: string; answer?: string; marks?: number; frequency?: number }[];
  formulas?: { name: string; formula: string; units?: string; notes?: string }[];
  memoryTricks?: string[];
}

export function hydrateTopicModules(container: HTMLElement, noteData: any = {}): void {
  if (!container) return;

  // 1. First, scan existing DOM inside container for Markdown headings or structured content
  const htmlContent = container.innerHTML;

  // Inject Faculty Team Quality Gate Verification Seal Banner
  hydrateFacultyReviewSeal(container, noteData);

  // Inject Topic Module Quick Navigation Filter Bar
  injectModuleFilterBar(container);

  // Hydrate Dynamic Concept Map SVG Graph
  hydrateConceptMap(container, noteData);

  // Hydrate SVG Code Blocks into Live Rendered Figures
  hydrateSVGBlocks(container);

  // Hydrate AutoCAD Terminal Command Blocks
  hydrateCADCommandBlocks(container);

  // Hydrate Common Mistakes & Pitfall Callouts
  hydrateCommonMistakesSections(container);

  // Hydrate Concept Simplification Sections
  hydrateConceptSections(container);

  // Hydrate Solved Examples and PYQ Accordions
  hydratePYQSections(container);

  // Hydrate Formula Tables
  hydrateFormulaTables(container);

  // Hydrate Blockquotes and Callout Alerts
  hydrateCalloutBoxes(container);

  // Re-attach KaTeX if available
  if ((window as any).renderMathInElement) {
    try {
      (window as any).renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('Math rendering notice:', e);
    }
  }
}

/**
 * Injects the Faculty Team Quality Gate Verification Seal Banner
 */
function hydrateFacultyReviewSeal(container: HTMLElement, noteData: any = {}): void {
  if (container.querySelector('.faculty-seal-wrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'faculty-seal-wrapper mb-6';

  const title = noteData.title || container.querySelector('h1, h2')?.textContent || 'Academic Engineering Unit';
  const subject = noteData.subject || 'JNTUK R23 Curriculum';
  const review = FacultyReviewEngine.processQualityGate(title, container.innerHTML, subject).review;

  wrapper.innerHTML = FacultyReviewEngine.renderQualitySealBanner(review);
  container.prepend(wrapper);
}

/**
 * Injects an interactive Topic Module tab filter at the top of the notes viewer
 */
function injectModuleFilterBar(container: HTMLElement): void {
  if (container.querySelector('#topic-module-filter-bar')) return;

  const nav = document.createElement('div');
  nav.id = 'topic-module-filter-bar';
  nav.className = 'my-6 p-2 bg-slate-100 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-wrap gap-2 items-center justify-between shadow-sm sticky top-16 z-20';

  nav.innerHTML = `
    <div class="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5 px-1 scrollbar-none">
      <button data-module-filter="all" class="module-tab-btn active px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-blue-600 text-white shadow-sm flex items-center gap-1.5">
        <span>📚</span> Full Notes
      </button>
      <button data-module-filter="conceptmap" class="module-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5">
        <span>🌐</span> Concept Map
      </button>
      <button data-module-filter="concept" class="module-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5">
        <span>💡</span> Concept
      </button>
      <button data-module-filter="visuals" class="module-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5">
        <span>🖼️</span> Visuals & CAD
      </button>
      <button data-module-filter="mistakes" class="module-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5">
        <span>⚠️</span> Common Mistakes
      </button>
      <button data-module-filter="pyqs" class="module-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5">
        <span>📝</span> PYQs & Practice
      </button>
    </div>
    <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-3 hidden sm:block">
      EngiPrepHub Topic Engine
    </div>
  `;

  container.insertBefore(nav, container.firstChild);

  // Tab switching logic
  const buttons = nav.querySelectorAll('.module-tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const filter = target.getAttribute('data-module-filter');

      buttons.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm', 'active');
        b.classList.add('text-slate-700', 'dark:text-slate-300');
      });

      target.classList.add('bg-blue-600', 'text-white', 'shadow-sm', 'active');
      target.classList.remove('text-slate-700', 'dark:text-slate-300');

      filterContentByModule(container, filter || 'all');
    });
  });
}

function filterContentByModule(container: HTMLElement, filter: string): void {
  const allModules = container.querySelectorAll('.topic-module-card, h1, h2, h3, p, ul, ol, blockquote, .table-wrapper, pre');

  if (filter === 'all') {
    allModules.forEach(el => (el as HTMLElement).style.display = '');
    return;
  }

  // Hide everything first, then selectively show matching sections
  allModules.forEach(el => {
    const element = el as HTMLElement;
    if (element.id === 'topic-module-filter-bar') return;
    element.style.display = 'none';
  });

  const selectorMap: Record<string, string> = {
    conceptmap: '.module-concept-map, [data-module="conceptmap"]',
    concept: '.module-concept, [data-module="concept"]',
    visuals: '.module-visuals, [data-module="visuals"], pre, svg',
    mistakes: '.module-mistakes, [data-module="mistakes"], .err-box',
    pyqs: '.module-pyq, [data-module="pyq"], .pyq-card'
  };

  const selector = selectorMap[filter];
  if (selector) {
    const matches = container.querySelectorAll(selector);
    matches.forEach(m => {
      let current: HTMLElement | null = m as HTMLElement;
      while (current && current !== container) {
        current.style.display = '';
        current = current.parentElement;
      }
    });
  }
}

/**
 * Hydrates Concept Simplification sections into styled interactive cards with Text-To-Speech
 */
function hydrateConceptSections(container: HTMLElement): void {
  const headings = container.querySelectorAll('h1, h2, h3');

  headings.forEach(h => {
    const text = h.textContent?.toLowerCase() || '';
    if (text.includes('concept') || text.includes('intuition') || text.includes('concept simplification')) {
      const sectionEl = h.closest('section') || h.parentElement;
      if (!sectionEl || sectionEl.classList.contains('module-concept')) return;

      const card = document.createElement('div');
      card.className = 'topic-module-card module-concept my-8 p-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/50 rounded-3xl shadow-sm relative overflow-hidden';
      card.setAttribute('data-module', 'concept');

      // Accent pill
      const accentBar = document.createElement('div');
      accentBar.className = 'absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400';
      card.appendChild(accentBar);

      // Header with Audio TTS controls
      const headerDiv = document.createElement('div');
      headerDiv.className = 'flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-blue-100 dark:border-blue-900/40 pb-3';

      const titleGroup = document.createElement('div');
      titleGroup.className = 'flex items-center gap-2.5';
      titleGroup.innerHTML = `
        <div class="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
          💡
        </div>
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">${h.textContent}</h3>
          <span class="text-[11px] font-semibold text-blue-600 dark:text-blue-400">Concept Simplification • Core Intuition</span>
        </div>
      `;

      const audioBtn = document.createElement('button');
      audioBtn.className = 'px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95';
      audioBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
        <span>Listen Concept</span>
      `;

      let isSpeaking = false;
      audioBtn.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) return alert('Text-to-speech not supported in this browser.');
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          isSpeaking = false;
          audioBtn.innerHTML = `<span>Listen Concept</span>`;
          return;
        }

        const textToRead = card.innerText.replace('Listen Concept', '').trim();
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => {
          isSpeaking = false;
          audioBtn.innerHTML = `<span>Listen Concept</span>`;
        };
        window.speechSynthesis.speak(utterance);
        isSpeaking = true;
        audioBtn.innerHTML = `<span>Pause Audio</span>`;
      });

      headerDiv.appendChild(titleGroup);
      headerDiv.appendChild(audioBtn);
      card.appendChild(headerDiv);

      // Move section elements into card
      let sibling = h.nextElementSibling;
      const contentBody = document.createElement('div');
      contentBody.className = 'prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed';

      while (sibling && !['H1', 'H2', 'H3'].includes(sibling.tagName)) {
        const next = sibling.nextElementSibling;
        contentBody.appendChild(sibling);
        sibling = next;
      }

      card.appendChild(contentBody);
      h.parentNode?.replaceChild(card, h);
    }
  });
}

/**
 * Hydrates Common Mistakes and Pitfalls sections into high-impact warning alert cards
 */
function hydrateCommonMistakesSections(container: HTMLElement): void {
  const headings = container.querySelectorAll('h1, h2, h3, h4, p, strong');

  headings.forEach(h => {
    const text = h.textContent?.toLowerCase() || '';
    if (text.includes('common mistake') || text.includes('pitfall') || text.includes('syllabus pitfalls')) {
      const parentBlock = h.tagName.startsWith('H') ? h : h.parentElement;
      if (!parentBlock || parentBlock.classList.contains('module-mistakes')) return;

      const card = document.createElement('div');
      card.className = 'topic-module-card module-mistakes my-8 p-6 bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-3xl shadow-sm relative overflow-hidden';
      card.setAttribute('data-module', 'mistakes');

      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4 pb-3 border-b border-rose-200/60 dark:border-rose-900/40">
          <div class="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-lg">
            ⚠️
          </div>
          <div>
            <h3 class="text-base font-extrabold text-rose-950 dark:text-rose-200 tracking-tight">Syllabus Pitfalls & Common Mistakes</h3>
            <span class="text-[11px] font-semibold text-rose-600 dark:text-rose-400">Exam Trap Alerts • Don't Lose Marks Here</span>
          </div>
        </div>
      `;

      const body = document.createElement('div');
      body.className = 'text-sm text-slate-800 dark:text-slate-200 space-y-3';

      let sibling = parentBlock.nextElementSibling;
      while (sibling && !['H1', 'H2', 'H3'].includes(sibling.tagName)) {
        const next = sibling.nextElementSibling;
        body.appendChild(sibling);
        sibling = next;
      }

      card.appendChild(body);
      parentBlock.parentNode?.replaceChild(card, parentBlock);
    }
  });
}

/**
 * Hydrates SVG Code blocks into live rendered figures with captions & fullscreen zoom modal
 */
function hydrateSVGBlocks(container: HTMLElement): void {
  const codeBlocks = container.querySelectorAll('pre code.language-xml, pre code.language-html, pre code.language-svg');

  codeBlocks.forEach(code => {
    const rawText = code.textContent || '';
    if (rawText.trim().startsWith('<svg')) {
      const pre = code.parentElement;
      if (!pre) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'topic-module-card module-visuals my-8 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-center relative overflow-hidden';
      wrapper.setAttribute('data-module', 'visuals');

      const header = document.createElement('div');
      header.className = 'flex justify-between items-center mb-4 text-xs font-bold text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2';
      header.innerHTML = `
        <span class="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
          <span>🖼️</span> Vector Visual Diagram Spec
        </span>
        <button class="svg-zoom-btn px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
          🔍 Expand View
        </button>
      `;

      const svgContainer = document.createElement('div');
      svgContainer.className = 'p-4 flex justify-center items-center bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/60 max-w-full overflow-x-auto';
      svgContainer.innerHTML = rawText;

      const zoomBtn = header.querySelector('.svg-zoom-btn');
      zoomBtn?.addEventListener('click', () => {
        openVisualModal(rawText);
      });

      wrapper.appendChild(header);
      wrapper.appendChild(svgContainer);
      pre.parentNode?.replaceChild(wrapper, pre);
    }
  });
}

/**
 * Hydrates AutoCAD terminal commands into CLI matrix codeblocks with 1-click copy
 */
function hydrateCADCommandBlocks(container: HTMLElement): void {
  const codeBlocks = container.querySelectorAll('pre');

  codeBlocks.forEach(pre => {
    const text = pre.textContent || '';
    if (text.includes('COMMAND:') || text.includes('AUTOCAD TERMINAL') || text.includes('LINE ->') || text.includes('OFFSET ->')) {
      if (pre.closest('.module-cad')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'topic-module-card module-visuals module-cad my-8 p-5 bg-slate-950 border border-slate-800 rounded-2xl shadow-xl text-left relative font-mono text-xs overflow-hidden';
      wrapper.setAttribute('data-module', 'visuals');

      const header = document.createElement('div');
      header.className = 'flex justify-between items-center mb-3 pb-2 border-b border-slate-800 text-slate-400';
      header.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span class="ml-2 font-bold text-slate-200">AutoCAD Terminal Sequence Matrix</span>
        </div>
        <button class="copy-cad-btn px-3 py-1 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors font-sans text-[11px] font-bold">
          Copy CLI Commands
        </button>
      `;

      const copyBtn = header.querySelector('.copy-cad-btn');
      copyBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(text);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy CLI Commands', 2000);
      });

      wrapper.appendChild(header);
      
      const codeArea = document.createElement('pre');
      codeArea.className = 'text-emerald-400 p-2 overflow-x-auto whitespace-pre';
      codeArea.textContent = text;

      wrapper.appendChild(codeArea);
      pre.parentNode?.replaceChild(wrapper, pre);
    }
  });
}

/**
 * Hydrates Solved Examples and PYQ sections into self-test accordion drawers
 */
function hydratePYQSections(container: HTMLElement): void {
  const headings = container.querySelectorAll('h1, h2, h3');

  headings.forEach(h => {
    const text = h.textContent?.toLowerCase() || '';
    if (text.includes('pyq') || text.includes('solved example') || text.includes('important questions')) {
      const sectionEl = h.closest('section') || h.parentElement;
      if (!sectionEl || sectionEl.classList.contains('module-pyq')) return;

      const card = document.createElement('div');
      card.className = 'topic-module-card module-pyq my-8 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm';
      card.setAttribute('data-module', 'pyq');

      card.innerHTML = `
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              📝
            </div>
            <div>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">${h.textContent}</h3>
              <span class="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Previous Year Questions • Verified Exam Layout</span>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/50">
            High Frequency
          </span>
        </div>
      `;

      const body = document.createElement('div');
      body.className = 'space-y-4 text-sm text-slate-700 dark:text-slate-300';

      let sibling = h.nextElementSibling;
      while (sibling && !['H1', 'H2', 'H3'].includes(sibling.tagName)) {
        const next = sibling.nextElementSibling;
        body.appendChild(sibling);
        sibling = next;
      }

      card.appendChild(body);
      h.parentNode?.replaceChild(card, h);
    }
  });
}

/**
 * Hydrates tables with responsive overflow containers and custom styling
 */
function hydrateFormulaTables(container: HTMLElement): void {
  const tables = container.querySelectorAll('table');

  tables.forEach(table => {
    if (table.parentElement?.classList.contains('table-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm';

    table.classList.add('w-full', 'text-left', 'border-collapse', 'text-sm');
    
    // Add header styles
    const ths = table.querySelectorAll('th');
    ths.forEach(th => th.classList.add('bg-slate-100', 'dark:bg-slate-800', 'p-3', 'font-bold', 'text-slate-900', 'dark:text-slate-100', 'border-b', 'border-slate-200', 'dark:border-slate-700'));

    const tds = table.querySelectorAll('td');
    tds.forEach(td => td.classList.add('p-3', 'border-b', 'border-slate-100', 'dark:border-slate-800/60', 'text-slate-700', 'dark:text-slate-300'));

    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

/**
 * Hydrates blockquotes into custom warning/tip callouts
 */
function hydrateCalloutBoxes(container: HTMLElement): void {
  const quotes = container.querySelectorAll('blockquote');

  quotes.forEach(bq => {
    const text = bq.textContent?.trim() || '';
    if (text.startsWith('⚠️') || text.toLowerCase().includes('warning') || text.toLowerCase().includes('important')) {
      bq.className = 'my-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 text-sm font-medium shadow-sm';
    } else if (text.startsWith('💡') || text.toLowerCase().includes('tip') || text.toLowerCase().includes('note')) {
      bq.className = 'my-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 text-blue-900 dark:text-blue-200 text-sm font-medium shadow-sm';
    }
  });
}

/**
 * Opens fullscreen SVG modal for visual inspection
 */
function openVisualModal(svgContent: string): void {
  let modal = document.getElementById('visual-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'visual-modal';
    modal.className = 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative flex flex-col items-center">
      <button class="close-modal-btn absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
        ✕ Close
      </button>
      <h3 class="text-base font-bold text-slate-900 dark:text-white mb-4">Vector Diagram Fullscreen Inspection</h3>
      <div class="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl w-full flex justify-center items-center overflow-auto max-h-[70vh]">
        ${svgContent}
      </div>
    </div>
  `;

  modal.querySelector('.close-modal-btn')?.addEventListener('click', () => {
    modal?.remove();
  });
}

/**
 * Dynamic Concept Map Node-Link Graph Generator
 * Parses document heading hierarchy and renders an interactive SVG relationship graph
 */
function hydrateConceptMap(container: HTMLElement, noteData: any = {}): void {
  if (container.querySelector('#topic-concept-map-card')) return;

  // Extract Root Title
  const rootTitle = noteData.title || noteData.subject || container.querySelector('h1')?.textContent || 'Unit Overview';

  // Extract Headings
  const h2Elements = Array.from(container.querySelectorAll('h2'));
  if (h2Elements.length === 0) return;

  interface MapNode {
    id: string;
    label: string;
    targetEl?: HTMLElement;
    children: { id: string; label: string; targetEl?: HTMLElement }[];
  }

  const nodes: MapNode[] = h2Elements.map((h2, idx) => {
    const children: { id: string; label: string; targetEl?: HTMLElement }[] = [];
    let sibling = h2.nextElementSibling;
    let subIdx = 0;
    while (sibling && sibling.tagName !== 'H2') {
      if (sibling.tagName === 'H3') {
        children.push({
          id: `node-${idx}-sub-${subIdx++}`,
          label: sibling.textContent?.trim().replace(/^[\d.\s]+/, '') || 'Subtopic',
          targetEl: sibling as HTMLElement
        });
      }
      sibling = sibling.nextElementSibling;
    }

    return {
      id: `node-primary-${idx}`,
      label: h2.textContent?.trim().replace(/^[\d.\s]+/, '') || `Section ${idx + 1}`,
      targetEl: h2 as HTMLElement,
      children
    };
  });

  const card = document.createElement('div');
  card.id = 'topic-concept-map-card';
  card.className = 'topic-module-card module-concept-map my-8 p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl relative overflow-hidden text-white';
  card.setAttribute('data-module', 'conceptmap');

  card.innerHTML = `
    <div class="flex flex-wrap justify-between items-center gap-3 mb-4 pb-3 border-b border-slate-800">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg">
          🌐
        </div>
        <div>
          <h3 class="text-base font-extrabold text-white tracking-tight">Dynamic Topic Concept Map</h3>
          <span class="text-[11px] font-semibold text-cyan-400">Interactive SVG Node-Link Graph • Click any node to jump</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="map-layout-toggle" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5">
          <span>🔄</span> Layout: <span id="map-layout-mode-text">Orbit</span>
        </button>
        <button id="map-fullscreen-btn" class="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-sm">
          <span>🔍</span> Fullscreen
        </button>
      </div>
    </div>
    <div id="concept-map-svg-wrapper" class="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-2 overflow-x-auto flex justify-center items-center relative min-h-[360px]">
    </div>
  `;

  // Insert map card right after filter bar or at top of container
  const filterBar = container.querySelector('#topic-module-filter-bar');
  if (filterBar && filterBar.nextSibling) {
    container.insertBefore(card, filterBar.nextSibling);
  } else {
    container.insertBefore(card, container.firstChild);
  }

  let currentLayout = 'prereq'; // 'prereq' | 'orbit' | 'flow'
  const svgWrapper = card.querySelector('#concept-map-svg-wrapper') as HTMLElement;

  function renderSVG(): void {
    if (!svgWrapper) return;
    svgWrapper.innerHTML = generateConceptMapSVG(rootTitle, nodes, currentLayout, noteData);
    attachNodeClickEvents(card);
  }

  renderSVG();

  // Layout toggle handler
  const toggleBtn = card.querySelector('#map-layout-toggle');
  const modeText = card.querySelector('#map-layout-mode-text');
  toggleBtn?.addEventListener('click', () => {
    if (currentLayout === 'prereq') currentLayout = 'orbit';
    else if (currentLayout === 'orbit') currentLayout = 'flow';
    else currentLayout = 'prereq';

    if (modeText) {
      if (currentLayout === 'prereq') modeText.textContent = 'Prerequisites Map';
      else if (currentLayout === 'orbit') modeText.textContent = 'Orbit';
      else modeText.textContent = 'Tree Flow';
    }
    renderSVG();
  });

  // Fullscreen modal handler
  const fullscreenBtn = card.querySelector('#map-fullscreen-btn');
  fullscreenBtn?.addEventListener('click', () => {
    openVisualModal(generateConceptMapSVG(rootTitle, nodes, currentLayout));
    const modalEl = document.getElementById('visual-modal');
    if (modalEl) attachNodeClickEvents(modalEl);
  });
}

function generateConceptMapSVG(rootTitle: string, primaryNodes: any[], layout: string, noteData: any = {}): string {
  const width = 880;
  const height = 400;

  // Clean root label
  const cleanRoot = rootTitle.length > 28 ? rootTitle.substring(0, 26) + '...' : rootTitle;

  interface SVGNode {
    id: string;
    label: string;
    x: number;
    y: number;
    type: 'root' | 'primary' | 'sub' | 'prereq' | 'next';
    targetText: string;
  }

  interface SVGLink {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color?: string;
  }

  const nodes: SVGNode[] = [];
  const links: SVGLink[] = [];

  if (layout === 'prereq') {
    // Center Node (Current Topic)
    const cx = 440;
    const cy = 200;
    nodes.push({ id: 'root', label: cleanRoot, x: cx, y: cy, type: 'root', targetText: rootTitle });

    // Infer subject prerequisites based on subject name
    const subject = noteData.subject || rootTitle;
    let prereqList = [
      'Class 12 Calculus & Vectors',
      'Unit 1: Foundational Matrix Theory'
    ];
    let nextList = [
      'Unit 3: Partial Derivatives & Jacobians',
      'Unit 4: Double Integrals & Area Calculations'
    ];

    if (/physics/i.test(subject)) {
      prereqList = ['Class 12 Wave Optics', 'Unit 1: Interference Fundamentals'];
      nextList = ['Unit 3: Lasers & Optical Fibers', 'Unit 4: Quantum Mechanics'];
    } else if (/chemistry/i.test(subject)) {
      prereqList = ['Basic Atomic Structure', 'Unit 1: Water Hardness & Softening'];
      nextList = ['Unit 3: Corrosion & Electrochemistry', 'Unit 4: High Polymers'];
    } else if (/programming|c\b|data structure/i.test(subject)) {
      prereqList = ['Basic Algorithmic Logic', 'Unit 1: C Data Types & Operators'];
      nextList = ['Unit 3: Pointers & Dynamic Memory', 'Unit 4: Structures & File I/O'];
    } else if (/graphics|drawing/i.test(subject)) {
      prereqList = ['Plane Geometry & Instruments', 'Unit 1: Conic Sections'];
      nextList = ['Unit 3: Projections of Planes & Solids', 'Unit 4: Isometric & Orthographic View'];
    } else if (/electrical|beee|civil|mechanical/i.test(subject)) {
      prereqList = ['Ohm\'s Law & KCL/KVL Physics', 'Unit 1: DC Circuit Analysis'];
      nextList = ['Unit 3: Single Phase AC Circuits', 'Unit 4: Transformers & Machines'];
    }

    // Add Prerequisite Nodes (Left Column)
    prereqList.forEach((pr, idx) => {
      const px = 150;
      const py = 120 + idx * 160;
      nodes.push({ id: `prereq-${idx}`, label: pr, x: px, y: py, type: 'prereq', targetText: pr });
      links.push({ x1: px + 80, y1: py, x2: cx - 110, y2: cy, color: 'url(#linkPrereq)' });
    });

    // Add Next Dependent Nodes (Right Column)
    nextList.forEach((nx, idx) => {
      const rx = 730;
      const ry = 120 + idx * 160;
      nodes.push({ id: `next-${idx}`, label: nx, x: rx, y: ry, type: 'next', targetText: nx });
      links.push({ x1: cx + 110, y1: cy, x2: rx - 80, y2: ry, color: 'url(#linkNext)' });
    });

    // Add Key Section Subnodes around the center
    const subCount = Math.min(primaryNodes.length, 3);
    primaryNodes.slice(0, subCount).forEach((p, idx) => {
      const sx = 320 + idx * 120;
      const sy = 340;
      const pLabel = p.label.length > 16 ? p.label.substring(0, 14) + '...' : p.label;
      nodes.push({ id: p.id, label: pLabel, x: sx, y: sy, type: 'sub', targetText: p.label });
      links.push({ x1: cx, y1: cy + 24, x2: sx, y2: sy - 14, color: '#475569' });
    });

  } else if (layout === 'orbit') {
    const cx = 440;
    const cy = 200;

    // Root Node
    nodes.push({ id: 'root', label: cleanRoot, x: cx, y: cy, type: 'root', targetText: rootTitle });

    const N = primaryNodes.length;
    const Rx = 290;
    const Ry = 135;

    primaryNodes.forEach((p, idx) => {
      const angle = (2 * Math.PI * idx) / N - Math.PI / 2;
      const px = cx + Rx * Math.cos(angle);
      const py = cy + Ry * Math.sin(angle);

      const pLabel = p.label.length > 20 ? p.label.substring(0, 18) + '...' : p.label;
      nodes.push({ id: p.id, label: pLabel, x: px, y: py, type: 'primary', targetText: p.label });
      links.push({ x1: cx, y1: cy, x2: px, y2: py });

      // Secondary nodes branching
      if (p.children && p.children.length > 0) {
        const subCount = Math.min(p.children.length, 2);
        p.children.slice(0, subCount).forEach((sub: any, sIdx: number) => {
          const subAngle = angle + (sIdx === 0 ? -0.35 : 0.35);
          const sx = px + 85 * Math.cos(subAngle);
          const sy = py + 45 * Math.sin(subAngle);

          const subLabel = sub.label.length > 16 ? sub.label.substring(0, 14) + '...' : sub.label;
          nodes.push({ id: sub.id, label: subLabel, x: sx, y: sy, type: 'sub', targetText: sub.label });
          links.push({ x1: px, y1: py, x2: sx, y2: sy });
        });
      }
    });
  } else {
    // Hierarchical Tree Flow Layout
    const rootX = 440;
    const rootY = 50;
    nodes.push({ id: 'root', label: cleanRoot, x: rootX, y: rootY, type: 'root', targetText: rootTitle });

    const N = primaryNodes.length;
    const startX = 100;
    const endX = 780;
    const stepX = N > 1 ? (endX - startX) / (N - 1) : 0;

    primaryNodes.forEach((p, idx) => {
      const px = N === 1 ? 440 : startX + idx * stepX;
      const py = 180;

      const pLabel = p.label.length > 18 ? p.label.substring(0, 16) + '...' : p.label;
      nodes.push({ id: p.id, label: pLabel, x: px, y: py, type: 'primary', targetText: p.label });
      links.push({ x1: rootX, y1: rootY, x2: px, y2: py });

      if (p.children && p.children.length > 0) {
        const subCount = Math.min(p.children.length, 2);
        p.children.slice(0, subCount).forEach((sub: any, sIdx: number) => {
          const sx = px + (sIdx === 0 ? -40 : 40);
          const sy = 330;

          const subLabel = sub.label.length > 14 ? sub.label.substring(0, 12) + '...' : sub.label;
          nodes.push({ id: sub.id, label: subLabel, x: sx, y: sy, type: 'sub', targetText: sub.label });
          links.push({ x1: px, y1: py, x2: sx, y2: sy });
        });
      }
    });
  }

  // Generate Link Paths
  const linkPaths = links.map(link => {
    const midX = (link.x1 + link.x2) / 2;
    const midY = (link.y1 + link.y2) / 2;
    const strokeColor = link.color || "url(#linkGrad)";
    return `<path d="M ${link.x1} ${link.y1} Q ${midX} ${midY} ${link.x2} ${link.y2}" stroke="${strokeColor}" stroke-width="2.5" fill="none" opacity="0.8" stroke-dasharray="5 3" />`;
  }).join('');

  // Generate Nodes Markup
  const nodeMarkup = nodes.map(n => {
    if (n.type === 'root') {
      return `
        <g class="map-node cursor-pointer group" data-target-text="${n.targetText}">
          <rect x="${n.x - 110}" y="${n.y - 24}" width="220" height="48" rx="24" fill="url(#rootGrad)" stroke="#38bdf8" stroke-width="2.5" class="drop-shadow-xl transition-transform group-hover:scale-105" />
          <text x="${n.x}" y="${n.y + 5}" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="13">${n.label}</text>
        </g>
      `;
    } else if (n.type === 'prereq') {
      return `
        <g class="map-node cursor-pointer group" data-target-text="${n.targetText}">
          <rect x="${n.x - 85}" y="${n.y - 20}" width="170" height="40" rx="20" fill="#064e3b" stroke="#10b981" stroke-width="1.5" class="drop-shadow-md transition-transform group-hover:scale-105 group-hover:fill-emerald-900" />
          <circle cx="${n.x - 65}" cy="${n.y}" r="8" fill="#10b981" />
          <text x="${n.x - 65}" y="${n.y + 3}" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="9">✓</text>
          <text x="${n.x + 5}" y="${n.y + 4}" text-anchor="middle" fill="#a7f3d0" font-weight="700" font-size="10">${n.label.length > 20 ? n.label.substring(0,18) + '...' : n.label}</text>
        </g>
      `;
    } else if (n.type === 'next') {
      return `
        <g class="map-node cursor-pointer group" data-target-text="${n.targetText}">
          <rect x="${n.x - 85}" y="${n.y - 20}" width="170" height="40" rx="20" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5" class="drop-shadow-md transition-transform group-hover:scale-105 group-hover:fill-sky-900" />
          <text x="${n.x}" y="${n.y + 4}" text-anchor="middle" fill="#bae6fd" font-weight="700" font-size="10">${n.label.length > 20 ? n.label.substring(0,18) + '...' : n.label}</text>
        </g>
      `;
    } else if (n.type === 'primary') {
      return `
        <g class="map-node cursor-pointer group" data-target-text="${n.targetText}">
          <rect x="${n.x - 75}" y="${n.y - 18}" width="150" height="36" rx="18" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" class="drop-shadow-md transition-transform group-hover:scale-105 group-hover:fill-slate-800" />
          <text x="${n.x}" y="${n.y + 4}" text-anchor="middle" fill="#38bdf8" font-weight="700" font-size="11">${n.label}</text>
        </g>
      `;
    } else {
      return `
        <g class="map-node cursor-pointer group" data-target-text="${n.targetText}">
          <rect x="${n.x - 55}" y="${n.y - 14}" width="110" height="28" rx="14" fill="#020617" stroke="#475569" stroke-width="1" class="transition-transform group-hover:scale-105 group-hover:stroke-cyan-400" />
          <text x="${n.x}" y="${n.y + 4}" text-anchor="middle" fill="#94a3b8" font-weight="600" font-size="10">${n.label}</text>
        </g>
      `;
    }
  }).join('');

  return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto min-w-[650px] select-none font-sans">
      <defs>
        <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#4f46e5" />
        </linearGradient>
        <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <g id="map-links-group">
        ${linkPaths}
      </g>
      <g id="map-nodes-group">
        ${nodeMarkup}
      </g>
    </svg>
  `;
}

function attachNodeClickEvents(parentEl: HTMLElement): void {
  const nodeEls = parentEl.querySelectorAll('[data-target-text]');
  nodeEls.forEach(node => {
    node.addEventListener('click', (e) => {
      const targetText = (e.currentTarget as HTMLElement).getAttribute('data-target-text');
      if (!targetText) return;

      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
      const match = headings.find(h => h.textContent?.toLowerCase().includes(targetText.toLowerCase()));

      if (match) {
        match.scrollIntoView({ behavior: 'smooth', block: 'center' });

        match.classList.add('ring-4', 'ring-cyan-500/80', 'transition-all', 'duration-500');
        setTimeout(() => {
          match.classList.remove('ring-4', 'ring-cyan-500/80');
        }, 2000);
      }
    });
  });
}

