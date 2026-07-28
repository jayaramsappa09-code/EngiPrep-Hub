/**
 * EngiPrepHub - Interactive Study Roadmap Component for Subject Viewer
 * Visualizes JNTUK R23 unit sequences as an interactive, progress-tracked timeline.
 */

import { AchievementManager } from './achievement-manager.js';

export interface UnitRoadmapItem {
  unit_number: number;
  title: string;
  description: string;
  topics: string[];
  estimatedHours: number;
  examWeightageMarks: number;
  slug?: string;
  pyqCount?: number;
  formulaCount?: number;
}

export interface SubjectRoadmapData {
  subjectTitle: string;
  subjectCode?: string;
  semester?: number;
  units: UnitRoadmapItem[];
}

// Fallback JNTUK R23 Subject Curriculums
export const JNTUK_SUBJECT_CURRICULUMS: Record<string, UnitRoadmapItem[]> = {
  "Engineering Mathematics I": [
    {
      unit_number: 1,
      title: "Matrices & Linear Equations",
      description: "Rank of matrix, Row Echelon form, Consistency of linear equations (AX=B), Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem.",
      topics: ["Rank of Matrix & Echelon Form", "Consistency of AX = B", "Eigenvalues & Eigenvectors", "Cayley-Hamilton Theorem & Matrix Inverses"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "m1-unit-1-matrices",
      pyqCount: 18,
      formulaCount: 12
    },
    {
      unit_number: 2,
      title: "Mean Value Theorems & Series Expansion",
      description: "Rolle's Theorem, Lagrange's Mean Value Theorem (LMVT), Cauchy's Mean Value Theorem, Taylor's & Maclaurin's series expansions.",
      topics: ["Rolle's Theorem Proofs", "Lagrange Mean Value Theorem", "Cauchy Mean Value Theorem", "Taylor's & Maclaurin's Series"],
      estimatedHours: 6,
      examWeightageMarks: 14,
      slug: "m1-unit-2-mean-value-theorems",
      pyqCount: 15,
      formulaCount: 8
    },
    {
      unit_number: 3,
      title: "Multivariable Calculus & Partial Differentiation",
      description: "Partial derivatives, Total derivative, Chain rule, Jacobians, Functional dependence, Maxima & Minima of functions of two variables.",
      topics: ["Partial Differentiation & Chain Rule", "Jacobian Determinants", "Functional Dependence", "Maxima & Minima (Lagrange Multipliers)"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "m1-unit-3-partial-differentiation",
      pyqCount: 16,
      formulaCount: 10
    },
    {
      unit_number: 4,
      title: "Multiple Integrals",
      description: "Double integrals in Cartesian & Polar coordinates, Change of order of integration, Triple integrals, Area and Volume calculations.",
      topics: ["Double Integrals (Cartesian & Polar)", "Change of Order of Integration", "Triple Integrals", "Area & Volume Applications"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "m1-unit-4-multiple-integrals",
      pyqCount: 14,
      formulaCount: 9
    },
    {
      unit_number: 5,
      title: "Special Functions & Differential Calculus",
      description: "Beta and Gamma functions, Relation between Beta & Gamma functions, Evaluation of improper integrals using Beta-Gamma relations.",
      topics: ["Beta Function Properties", "Gamma Function Evaluation", "Beta-Gamma Symmetrical Relation", "Improper Integral Applications"],
      estimatedHours: 6,
      examWeightageMarks: 14,
      slug: "m1-unit-5-special-functions",
      pyqCount: 12,
      formulaCount: 7
    }
  ],
  "C Programming": [
    {
      unit_number: 1,
      title: "C Fundamentals & Flow Control",
      description: "Structure of C program, Data types, Variables, Constants, Operators, Expressions, Decision making (if-else, switch), Loops (for, while, do-while).",
      topics: ["Data Types & Variable Scope", "Operators & Precedence Table", "Branching (if-else, switch)", "Looping Constructs & Break/Continue"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "c-prog-unit-1-fundamentals",
      pyqCount: 20,
      formulaCount: 6
    },
    {
      unit_number: 2,
      title: "Arrays, Strings & Functions",
      description: "1D & 2D Arrays, String manipulation functions (string.h), Function definition, Parameter passing (Call by value vs Call by reference), Recursion.",
      topics: ["1D & 2D Array Matrix Operations", "String Library Functions (strlen, strcpy, strcmp)", "Function Prototypes & Scope", "Recursion & Call Stack"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "c-prog-unit-2-arrays-functions",
      pyqCount: 22,
      formulaCount: 5
    },
    {
      unit_number: 3,
      title: "Pointers & Dynamic Memory Allocation",
      description: "Pointer declaration, Pointer arithmetic, Array of pointers, Function pointers, Dynamic Memory Allocation (malloc, calloc, realloc, free).",
      topics: ["Pointer Declaration & Indirection", "Pointer Arithmetic & Array Access", "Dynamic Allocation (malloc, calloc, realloc)", "Dangling Pointers & Memory Leaks"],
      estimatedHours: 9,
      examWeightageMarks: 14,
      slug: "c-prog-unit-3-pointers",
      pyqCount: 25,
      formulaCount: 8
    },
    {
      unit_number: 4,
      title: "Structures, Unions & File Management",
      description: "Defining structures, Nested structures, Array of structures, Unions vs Structures, File handling (fopen, fclose, fread, fwrite, fprintf, fscanf).",
      topics: ["Structure Declaration & Memory Alignment", "Unions vs Structures Memory Comparison", "File I/O Operations & Modes (r, w, a)", "Binary File Processing"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "c-prog-unit-4-structures-files",
      pyqCount: 18,
      formulaCount: 6
    },
    {
      unit_number: 5,
      title: "Introduction to Data Structures & Algorithms",
      description: "Linear vs Non-linear data structures, Linked lists, Stacks, Queues, Searching (Linear, Binary) & Sorting (Bubble, Selection, Insertion).",
      topics: ["Single Linked List Creation & Traversal", "Stack Operations (Push/Pop)", "Queue Operations (Enqueue/Dequeue)", "Binary Search vs Linear Search"],
      estimatedHours: 10,
      examWeightageMarks: 14,
      slug: "c-prog-unit-5-data-structures",
      pyqCount: 28,
      formulaCount: 10
    }
  ],
  "Engineering Physics": [
    {
      unit_number: 1,
      title: "Wave Optics & Interference",
      description: "Principle of superposition, Interference in thin films by reflection, Newton's Rings experiment, Determination of wavelength, Anti-reflection coating.",
      topics: ["Superposition & Coherence", "Interference in Thin Parallel Films", "Newton's Rings Theory & Formula", "Anti-reflection Coating"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "physics-unit-1-wave-optics",
      pyqCount: 16,
      formulaCount: 11
    },
    {
      unit_number: 2,
      title: "Diffraction & Polarization",
      description: "Fraunhofer diffraction at single slit & double slit, Diffraction grating, Resolving power, Polarization by reflection & refraction, Quarter/Half wave plates.",
      topics: ["Single & Double Slit Fraunhofer Diffraction", "Diffraction Grating Spectrum", "Brewster's Law & Polarization", "Quarter & Half Wave Plates"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "physics-unit-2-diffraction-polarization",
      pyqCount: 15,
      formulaCount: 9
    },
    {
      unit_number: 3,
      title: "Quantum Mechanics & Free Electron Theory",
      description: "De Broglie hypothesis, Heisenberg uncertainty principle, Time-independent Schrodinger wave equation, Particle in a 1D box, Fermi-Dirac distribution.",
      topics: ["De Broglie Matter Waves", "Heisenberg Uncertainty Principle", "Schrodinger 1D Wave Equation", "Particle in a 1D Infinite Potential Well"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "physics-unit-3-quantum-mechanics",
      pyqCount: 19,
      formulaCount: 12
    },
    {
      unit_number: 4,
      title: "Semiconductor Physics & Devices",
      description: "Intrinsic & Extrinsic semiconductors, Carrier concentration, Fermi level, Hall Effect and determination of Hall coefficient, P-N junction diode energy band diagram.",
      topics: ["Carrier Concentration in N & P Semiconductors", "Fermi Level Temperature Dependence", "Hall Effect Theory & Derivation", "P-N Junction Energy Band Diagrams"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "physics-unit-4-semiconductors",
      pyqCount: 21,
      formulaCount: 10
    },
    {
      unit_number: 5,
      title: "Lasers, Fiber Optics & Nanomaterials",
      description: "Einstein coefficients, Population inversion, Ruby Laser, He-Ne Laser, Optical Fiber acceptance angle & numerical aperture, Synthesis of nanomaterials.",
      topics: ["Einstein Coefficients A & B Relation", "Ruby & He-Ne Laser Working Principles", "Optical Fiber Numerical Aperture Derivation", "Sol-Gel Synthesis of Nanomaterials"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "physics-unit-5-lasers-fiber-optics",
      pyqCount: 22,
      formulaCount: 14
    }
  ],
  "Engineering Chemistry": [
    {
      unit_number: 1,
      title: "Water Technology & Boiler Troubles",
      description: "Hardness of water, Units of hardness, EDTA method, Boiler troubles (Scale & Sludge, Priming & Foaming, Caustic embrittlement), Softening methods (Zeolite, Ion-exchange, RO).",
      topics: ["Hardness Types & EDTA Titration", "Boiler Scales & Sludges Prevention", "Ion Exchange De-mineralization Process", "Reverse Osmosis (RO) Desalination"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "chem-unit-1-water-technology",
      pyqCount: 20,
      formulaCount: 8
    },
    {
      unit_number: 2,
      title: "Electrochemistry & Corrosion Engineering",
      description: "Electrochemical cells, Nernst equation, Reference electrodes, Types of corrosion (Dry, Wet/Galvanic), Pilling-Bedworth rule, Corrosion control methods.",
      topics: ["Electrochemical Cells & Nernst Equation", "Galvanic Corrosion & Differential Aeration", "Pilling-Bedworth Rule", "Cathodic Protection (Sacrificial Anode)"],
      estimatedHours: 8,
      examWeightageMarks: 14,
      slug: "chem-unit-2-electrochemistry-corrosion",
      pyqCount: 24,
      formulaCount: 11
    },
    {
      unit_number: 3,
      title: "High Polymers, Plastics & Conducting Polymers",
      description: "Mechanism of addition & condensation polymerization, Thermoplastics vs Thermosetting, Conducting polymers (Polyaniline), Biodegradable polymers.",
      topics: ["Addition vs Condensation Polymerization", "Preparation & Uses of PVC, Bakelite, Nylon", "Conducting Polymer Mechanism", "Biodegradable Polymers (PLA, PHBV)"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "chem-unit-3-polymers-plastics",
      pyqCount: 16,
      formulaCount: 6
    },
    {
      unit_number: 4,
      title: "Instrumental Analysis & Spectroscopy",
      description: "Beer-Lambert's law, UV-Visible spectroscopy, Infrared (IR) spectroscopy, Conductometric & Potentiometric titrations.",
      topics: ["Beer-Lambert Law & Derivation", "UV-Vis Spectroscopy Working Principle", "IR Spectroscopy Functional Group Analysis", "Conductometric Titrations Curves"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "chem-unit-4-instrumental-analysis",
      pyqCount: 15,
      formulaCount: 7
    },
    {
      unit_number: 5,
      title: "Energy Sources & Energy Storage Devices",
      description: "Batteries (Primary & Secondary), Lead-acid battery, Lithium-ion battery, Fuel cells (H2-O2 fuel cell), Solar energy conversion & Photovoltaic cells.",
      topics: ["Lead-Acid Battery Charge/Discharge Reactions", "Lithium-Ion Battery Working Mechanism", "H2-O2 Fuel Cell Construction", "Photovoltaic Solar Cell Operation"],
      estimatedHours: 7,
      examWeightageMarks: 14,
      slug: "chem-unit-5-energy-sources",
      pyqCount: 18,
      formulaCount: 6
    }
  ]
};

// Helper to sanitize subject key
function getSubjectKey(subjectTitle: string): string {
  const match = Object.keys(JNTUK_SUBJECT_CURRICULUMS).find(k =>
    k.toLowerCase().includes(subjectTitle.toLowerCase()) || subjectTitle.toLowerCase().includes(k.toLowerCase())
  );
  return match || "Engineering Mathematics I";
}

// Progress State Manager
export class SubjectProgressManager {
  private subjectKey: string;
  private storageKey: string;

  constructor(subjectTitle: string) {
    this.subjectKey = getSubjectKey(subjectTitle);
    this.storageKey = `engiprephub_roadmap_progress_${this.subjectKey.replace(/\s+/g, '_').toLowerCase()}`;
  }

  getProgressMap(): Record<number, 'not_started' | 'in_progress' | 'completed'> {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse roadmap progress', e);
    }
    // Default Unit 1 in progress, rest not started
    return { 1: 'in_progress', 2: 'not_started', 3: 'not_started', 4: 'not_started', 5: 'not_started' };
  }

  setUnitStatus(unitNum: number, status: 'not_started' | 'in_progress' | 'completed'): Record<number, 'not_started' | 'in_progress' | 'completed'> {
    const map = this.getProgressMap();
    map[unitNum] = status;

    // Auto unlock next unit if previous is completed
    if (status === 'completed' && map[unitNum + 1] === 'not_started') {
      map[unitNum + 1] = 'in_progress';
    }

    localStorage.setItem(this.storageKey, JSON.stringify(map));

    // Check achievement
    const completedCount = Object.values(map).filter(s => s === 'completed').length;
    const achievementManager = new AchievementManager();
    if (completedCount === 1) {
      achievementManager.checkMilestone('First Unit Mastered!', () => true, '🎯');
    } else if (completedCount === 5) {
      achievementManager.checkMilestone(`${this.subjectKey} Curriculum Completed!`, () => true, '🏆');
    }

    return map;
  }
}

/**
 * Main Interactive Study Roadmap Component Generator
 */
export function createStudyRoadmapElement(
  subjectTitle: string,
  unitsData?: UnitRoadmapItem[],
  onUnitSelect?: (unit: UnitRoadmapItem) => void
): HTMLElement {
  const subjectKey = getSubjectKey(subjectTitle);
  const units: UnitRoadmapItem[] = (unitsData && unitsData.length > 0)
    ? unitsData
    : (JNTUK_SUBJECT_CURRICULUMS[subjectKey] || JNTUK_SUBJECT_CURRICULUMS["Engineering Mathematics I"]);

  const progressMgr = new SubjectProgressManager(subjectTitle);
  let progressMap = progressMgr.getProgressMap();

  const container = document.createElement('div');
  container.className = 'study-roadmap-component my-8 w-full font-sans selection:bg-blue-200 dark:selection:bg-blue-900';

  let activeFilter: 'all' | 'in_progress' | 'completed' | 'high_weightage' = 'all';
  let activeViewMode: 'timeline' | 'cards' = 'timeline';
  let selectedUnitForModal: UnitRoadmapItem | null = null;

  function render(): void {
    const totalUnits = units.length;
    const completedUnits = units.filter(u => progressMap[u.unit_number] === 'completed').length;
    const inProgressUnits = units.filter(u => progressMap[u.unit_number] === 'in_progress').length;
    const progressPercent = Math.round((completedUnits / totalUnits) * 100);

    const remainingHours = units
      .filter(u => progressMap[u.unit_number] !== 'completed')
      .reduce((acc, u) => acc + (u.estimatedHours || 7), 0);

    const totalMarks = units.reduce((acc, u) => acc + (u.examWeightageMarks || 14), 0);
    const coveredMarks = units
      .filter(u => progressMap[u.unit_number] === 'completed')
      .reduce((acc, u) => acc + (u.examWeightageMarks || 14), 0);

    // Filter units
    let filteredUnits = units;
    if (activeFilter === 'in_progress') {
      filteredUnits = units.filter(u => progressMap[u.unit_number] === 'in_progress');
    } else if (activeFilter === 'completed') {
      filteredUnits = units.filter(u => progressMap[u.unit_number] === 'completed');
    } else if (activeFilter === 'high_weightage') {
      filteredUnits = [...units].sort((a, b) => b.examWeightageMarks - a.examWeightageMarks);
    }

    container.innerHTML = `
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <!-- Ambient Lighting Glows -->
        <div class="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header Overview -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/20">
              🗺️
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-extrabold tracking-tight text-white">${subjectTitle} Study Roadmap</h3>
                <span class="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold border border-blue-500/30">
                  JNTUK R23
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Interactive unit milestone sequence & progress tracker</p>
            </div>
          </div>

          <!-- Quick Action Stats -->
          <div class="flex flex-wrap items-center gap-3 text-xs">
            <div class="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
              <span class="text-emerald-400 font-bold text-sm">✓ ${completedUnits}/${totalUnits}</span>
              <span class="text-slate-400">Units Mastered</span>
            </div>
            <div class="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
              <span class="text-amber-400 font-bold text-sm">⏱️ ${remainingHours}h</span>
              <span class="text-slate-400">Time Left</span>
            </div>
            <div class="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
              <span class="text-cyan-400 font-bold text-sm">🎯 ${coveredMarks}/${totalMarks}</span>
              <span class="text-slate-400">Marks Secured</span>
            </div>
          </div>
        </div>

        <!-- Overall Progress Meter Bar -->
        <div class="mt-6 mb-6 relative z-10">
          <div class="flex justify-between items-center mb-2 text-xs font-bold">
            <span class="text-slate-300 flex items-center gap-1.5">
              <span>Syllabus Completion Meter</span>
              <span class="text-emerald-400">(${progressPercent}% Complete)</span>
            </span>
            <span class="text-slate-400">${completedUnits} Completed • ${inProgressUnits} Active • ${totalUnits - completedUnits - inProgressUnits} Up Next</span>
          </div>
          <div class="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
              style="width: ${progressPercent}%;"
            ></div>
          </div>
        </div>

        ${progressPercent === 100 ? `
          <div class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-slate-900 border border-emerald-500/40 flex items-center gap-3 animate-fade-in text-emerald-200">
            <span class="text-3xl">🎉</span>
            <div>
              <h4 class="font-bold text-white text-sm">Syllabus Fully Mastered!</h4>
              <p class="text-xs text-emerald-300">You have completed all 5 units for ${subjectTitle}. Ready to ace the JNTUK examination!</p>
            </div>
          </div>
        ` : ''}

        <!-- Toolbar: Filters & View Mode -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-800/60 relative z-10">
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              data-filter="all"
              class="roadmap-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeFilter === 'all' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
            >
              📚 All Units (${units.length})
            </button>
            <button
              data-filter="in_progress"
              class="roadmap-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeFilter === 'in_progress' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
            >
              ⚡ In Progress (${inProgressUnits})
            </button>
            <button
              data-filter="completed"
              class="roadmap-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeFilter === 'completed' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
            >
              ✓ Completed (${completedUnits})
            </button>
            <button
              data-filter="high_weightage"
              class="roadmap-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeFilter === 'high_weightage' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
            >
              🔥 High Weightage
            </button>
          </div>

          <!-- View Mode Toggle -->
          <div class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              data-view="timeline"
              class="roadmap-view-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${activeViewMode === 'timeline' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}"
            >
              Timeline
            </button>
            <button
              data-view="cards"
              class="roadmap-view-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${activeViewMode === 'cards' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}"
            >
              Grid Cards
            </button>
          </div>
        </div>

        <!-- Roadmap Content Container -->
        <div class="relative z-10">
          ${activeViewMode === 'timeline' ? renderTimelineView(filteredUnits, progressMap) : renderCardsView(filteredUnits, progressMap)}
        </div>
      </div>
    `;

    attachEventListeners();
  }

  function renderTimelineView(unitsList: UnitRoadmapItem[], pMap: Record<number, string>): string {
    if (unitsList.length === 0) {
      return `
        <div class="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400">
          <p class="text-sm">No units found for selected filter.</p>
        </div>
      `;
    }

    return `
      <div class="relative pl-6 sm:pl-10 space-y-8 before:content-[''] before:absolute before:left-3.5 sm:before:left-5 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-blue-600 before:via-indigo-500 before:to-emerald-500 before:rounded-full">
        ${unitsList.map((unit) => {
          const status = pMap[unit.unit_number] || 'not_started';
          const isCompleted = status === 'completed';
          const isInProgress = status === 'in_progress';

          let nodeBg = 'bg-slate-800 border-slate-700 text-slate-400';
          let badgeText = 'Up Next';
          let badgeClass = 'bg-slate-800/80 text-slate-400 border-slate-700';
          let iconSymbol: string | number = unit.unit_number;

          if (isCompleted) {
            nodeBg = 'bg-emerald-500 border-emerald-400 text-slate-950 ring-4 ring-emerald-500/20';
            badgeText = 'Mastered';
            badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            iconSymbol = '✓';
          } else if (isInProgress) {
            nodeBg = 'bg-blue-600 border-blue-400 text-white ring-4 ring-blue-500/30 animate-pulse';
            badgeText = 'In Progress';
            badgeClass = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
            iconSymbol = '⚡';
          }

          return `
            <div class="relative group" data-unit-num="${unit.unit_number}">
              <!-- Timeline Milestone Node Icon -->
              <div class="absolute -left-[30px] sm:-left-[46px] top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${nodeBg} border-2 flex items-center justify-center font-black text-sm sm:text-base shadow-lg transition-transform group-hover:scale-110 z-10 cursor-pointer">
                ${iconSymbol}
              </div>

              <!-- Main Unit Card -->
              <div class="bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-md hover:shadow-xl">
                <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">UNIT ${unit.unit_number}</span>
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeClass}">
                        ${badgeText}
                      </span>
                    </div>
                    <h4 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      ${unit.title}
                    </h4>
                  </div>

                  <!-- Status Action Toggle Button -->
                  <div class="flex items-center gap-2">
                    <button
                      data-toggle-unit="${unit.unit_number}"
                      class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                        isCompleted
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                          : isInProgress
                          ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/30'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }"
                    >
                      ${isCompleted ? '✓ Completed' : isInProgress ? '⚡ Mark Complete' : '▶ Start Unit'}
                    </button>
                  </div>
                </div>

                <p class="text-xs text-slate-300 leading-relaxed mb-4">${unit.description}</p>

                <!-- Core Topics Tags -->
                <div class="flex flex-wrap gap-1.5 mb-4">
                  ${unit.topics.map(t => `
                    <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                      • ${t}
                    </span>
                  `).join('')}
                </div>

                <!-- Footer Quick Navigation Actions -->
                <div class="pt-3 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div class="flex items-center gap-3 text-slate-400 font-semibold text-[11px]">
                    <span class="flex items-center gap-1">⏱️ ${unit.estimatedHours} Hours</span>
                    <span class="flex items-center gap-1">🎯 ${unit.examWeightageMarks} Marks</span>
                    <span class="flex items-center gap-1">📝 ${unit.pyqCount || 15}+ PYQs</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <a
                      href="/note-viewer.html?slug=${unit.slug || 'c-prog-unit-1-fundamentals'}"
                      class="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold transition-colors flex items-center gap-1"
                    >
                      📖 Notes
                    </a>
                    <a
                      href="/pyqs.html?subject=${encodeURIComponent(subjectTitle)}&unit=${unit.unit_number}"
                      class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold transition-colors flex items-center gap-1"
                    >
                      📝 PYQs
                    </a>
                    <a
                      href="/quiz.html?subject=${encodeURIComponent(subjectTitle)}&unit=${unit.unit_number}"
                      class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold transition-colors flex items-center gap-1"
                    >
                      🧪 Quiz
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderCardsView(unitsList: UnitRoadmapItem[], pMap: Record<number, string>): string {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${unitsList.map(unit => {
          const status = pMap[unit.unit_number] || 'not_started';
          const isCompleted = status === 'completed';
          const isInProgress = status === 'in_progress';

          return `
            <div class="bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="text-xs font-mono font-bold text-cyan-400">UNIT ${unit.unit_number}</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-300' : isInProgress ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                  }">
                    ${isCompleted ? '✓ Completed' : isInProgress ? '⚡ In Progress' : 'Up Next'}
                  </span>
                </div>
                <h4 class="text-base font-bold text-white mb-2">${unit.title}</h4>
                <p class="text-xs text-slate-400 line-clamp-2 mb-4">${unit.description}</p>
              </div>

              <div class="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-400 font-medium">${unit.estimatedHours}h • ${unit.examWeightageMarks} Marks</span>
                <button
                  data-toggle-unit="${unit.unit_number}"
                  class="px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isCompleted ? 'bg-emerald-950 text-emerald-300' : 'bg-blue-600 text-white hover:bg-blue-500'
                  }"
                >
                  ${isCompleted ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function attachEventListeners(): void {
    // Filter click handlers
    container.querySelectorAll('.roadmap-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = (e.currentTarget as HTMLElement).getAttribute('data-filter') as any;
        if (filter) {
          activeFilter = filter;
          render();
        }
      });
    });

    // View mode handlers
    container.querySelectorAll('.roadmap-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = (e.currentTarget as HTMLElement).getAttribute('data-view') as any;
        if (view) {
          activeViewMode = view;
          render();
        }
      });
    });

    // Toggle unit status buttons
    container.querySelectorAll('[data-toggle-unit]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const unitNum = parseInt((e.currentTarget as HTMLElement).getAttribute('data-toggle-unit') || '0', 10);
        if (unitNum) {
          const currentStatus = progressMap[unitNum] || 'not_started';
          const nextStatus = currentStatus === 'completed' ? 'in_progress' : 'completed';
          progressMap = progressMgr.setUnitStatus(unitNum, nextStatus);
          render();
        }
      });
    });
  }

  render();
  return container;
}
