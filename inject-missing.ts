import fs from 'fs';
import path from 'path';

const filepath = path.join(process.cwd(), 'chemistry-topper-notes.html');
let html = fs.readFileSync(filepath, 'utf8');

// The units and their expected IDs and titles
const units = {
  1: [
    { id: 'u1-01', title: 'Quantum Mechanics Basics' },
    { id: 'u1-02', title: 'Schrodinger Wave Eq.' },
    { id: 'u1-03', title: 'Molecular Orbital Theory' },
    { id: 'u1-04', title: 'Energy Level Diagrams' },
    { id: 'u1-05', title: 'Bond Order Calc' },
    { id: 'u1-06', title: 'Benzene π-MO Theory' },
    { id: 'u1-07', title: 'Solved Numericals' },
    { id: 'u1-08', title: 'PYQs & Viva' },
    { id: 'u1-09', title: 'Quick Revision' },
    { id: 'u1-10', title: 'Memory Tricks' }
  ],
  2: [
    { id: 'u2-01', title: 'Semiconductors' },
    { id: 'u2-02', title: 'Superconductors' },
    { id: 'u2-03', title: 'Super Capacitors' },
    { id: 'u2-04', title: 'Nano Materials' },
    { id: 'u2-05', title: 'Fullerenes & CNT' },
    { id: 'u2-06', title: 'Graphene' },
    { id: 'u2-07', title: 'Prep Methods' },
    { id: 'u2-08', title: 'Applications' },
    { id: 'u2-09', title: 'PYQs' },
    { id: 'u2-10', title: 'Exam Revision' }
  ],
  3: [
    { id: 'u3-01', title: 'Electrochemical Cells' },
    { id: 'u3-02', title: 'Nernst Equation' },
    { id: 'u3-03', title: 'Potential Numericals' },
    { id: 'u3-04', title: 'Conductometry' },
    { id: 'u3-05', title: 'Potentiometry' },
    { id: 'u3-06', title: 'Reference Electrodes' },
    { id: 'u3-07', title: 'Batteries & Fuel Cells' },
    { id: 'u3-08', title: 'PEMFC' },
    { id: 'u3-09', title: 'PYQs & Viva' },
    { id: 'u3-10', title: 'Quick Revision' }
  ],
  4: [
    { id: 'u4-01', title: 'Polymer Basics' },
    { id: 'u4-02', title: 'Polymerization Mechanisms' },
    { id: 'u4-03', title: 'Free Radical Mechanism' },
    { id: 'u4-04', title: 'Plastics & Resins' },
    { id: 'u4-05', title: 'Elastomers' },
    { id: 'u4-06', title: 'Conducting Polymers' },
    { id: 'u4-07', title: 'Bio-Degradable Polymers' },
    { id: 'u4-08', title: 'Applications' },
    { id: 'u4-09', title: 'PYQs' },
    { id: 'u4-10', title: 'Exam Survival Notes' }
  ],
  5: [
    { id: 'u5-01', title: 'Electromagnetic Spectrum' },
    { id: 'u5-02', title: 'Beer-Lambert Law' },
    { id: 'u5-03', title: 'UV Spectroscopy' },
    { id: 'u5-04', title: 'IR Spectroscopy' },
    { id: 'u5-05', title: 'Chromatography' },
    { id: 'u5-06', title: 'Solar Cells' },
    { id: 'u5-07', title: 'Hydro & Geothermal Energy' },
    { id: 'u5-08', title: 'Green Chemistry' },
    { id: 'u5-09', title: 'Expected Questions' },
    { id: 'u5-10', title: 'Quick Revision' }
  ]
};

for (let u = 1; u <= 5; u++) {
  const unitStartMatch = html.match(new RegExp(`<section id="unit${u}"[\\s\\S]*?<div class="mb-8">[\\s\\S]*?<a href="/chemistry-unit-${u}[\\s\\S]*?</a>\\s*</div>`));
  
  if (unitStartMatch) {
    let unitHtmlIndexStart = unitStartMatch.index + unitStartMatch[0].length;
    
    let toInject = '';
    
    units[u].reverse().forEach(topic => {
      // If missing
      if (!html.includes(`id="${topic.id}"`)) {
        toInject += `
          <!-- Concept: ${topic.title} -->
          <div id="${topic.id}" class="mb-12">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-xs font-black text-indigo-500 tracking-widest uppercase">Overview</span>
              <div class="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <h3 class="text-xl font-black mb-2 text-slate-900 dark:text-slate-50">${topic.title}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              This topic is comprehensively covered in the modular interactive workbench. 
              Review the detailed derivations, visual aids, and exam strategy for <strong>${topic.title}</strong> by entering the Full Unit Portal.
            </p>
            <a href="/chemistry-unit-${u}.html" class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase rounded-xl hover:bg-indigo-100 transition-colors">
              Go to Full Module →
            </a>
          </div>
        `;
      }
    });

    html = html.substring(0, unitHtmlIndexStart) + toInject + html.substring(unitHtmlIndexStart);
  }
}

fs.writeFileSync(filepath, html);
console.log('Successfully injected missing sections!');
