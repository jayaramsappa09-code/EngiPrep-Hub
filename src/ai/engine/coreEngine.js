import { ROUTES } from '../db/routes.js';
import { PREDEFINED_TOPICS_DB } from '../../predefinedProfessorResponses.js';

// Simple Levenshtein distance for fuzzy matching
function getLevenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Check how closely two words match using fuzzy substring or Levenshtein
function findFuzzyMatchScore(query, target) {
  const qClean = query.toLowerCase().trim();
  const tClean = target.toLowerCase().trim();

  if (tClean.includes(qClean) || qClean.includes(tClean)) {
    return 1.0; // exact substring match
  }

  const distance = getLevenshteinDistance(qClean, tClean);
  const maxLength = Math.max(qClean.length, tClean.length);
  if (maxLength === 0) return 0;
  
  const score = 1 - (distance / maxLength);
  return score > 0.45 ? score : 0;
}

export const AI_ENGINE = {
  // Save/retrieve local memory parameters
  getMemory() {
    try {
      const data = localStorage.getItem('engiprep_conversation_memory');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn("Could not query conversation memory", e);
    }
    return {
      currentSubject: null,
      currentUnit: null,
      recentTopics: [],
      weakTopics: [],
      bookmarks: [],
      lastQuestion: "",
      chatHistory: []
    };
  },

  saveMemory(mem) {
    try {
      localStorage.setItem('engiprep_conversation_memory', JSON.stringify(mem));
    } catch (e) {
      console.warn("Could not save conversation memory", e);
    }
  },

  // State-of-the-art multi-intent lexical scoring engine
  analyzeIntent(query) {
    const q = query.toLowerCase().trim();
    if (!q) return "unknown";

    // Intent Categories & Exact Weights
    const rules = [
      {
        intent: "greeting",
        keys: ["hi", "hello", "hey", "good morning", "good evening", "good afternoon", "yo", "wassup", "ssup", "hlo", "namaste", "hola", "greetings"]
      },
      {
        intent: "gratitude",
        keys: ["thanks", "thank you", "thank", "appreciate", "great help", "helpful", "awesome", "awesome helper", "brilliant", "perfect"]
      },
      {
        intent: "identity_question",
        keys: ["who are you", "your name", "who made you", "your creator", "who created you", "tell me about yourself", "what is your prime", "developer name"]
      },
      {
        intent: "help_request",
        keys: ["help", "what can you do", "capabilities", "guide me", "how to use", "options", "commands list", "instructions"]
      },
      {
        intent: "casual_chat",
        keys: ["how are you", "what are you doing", "are you real", "do you sleep", "your status", "are you human", "are you smart", "feeling good"]
      },
      {
        intent: "motivational",
        keys: ["stressed", "scared", "fear", "nervous", "demotivated", "give up", "motivate me", "motivation", "boost", "support", "panic", "inspire"]
      },
      {
        intent: "emotional_support",
        keys: ["feeling down", "depressed", "sad", "unhappy", "frustrated", "tired", "exhausted", "burnout", "mental fatigue"]
      },
      {
        intent: "roadmap_query",
        keys: ["roadmap", "study plan", "where to start", "syllabus path", "preparation tips", "jntuk pass marks", "checksheet", "marks checklist"]
      },
      {
        intent: "comparison_query",
        keys: ["difference between", "compare", "versus", "vs", "difference of", "similarities"]
      },
      {
        intent: "formula_query",
        keys: ["formula", "equation", "formula sheet", "mathematical definition", "formulas"]
      },
      {
        intent: "derivation_query",
        keys: ["derive", "derivation", "mathematical proof", "prove", "step by step proof"]
      },
      {
        intent: "definition_query",
        keys: ["define", "definition", "meaning of", "what is", "explain definition", "axiomatic"]
      },
      {
        intent: "viva_query",
        keys: ["viva", "viva prep", "oral exam", "examiner question", "lab tests", "viva questions"]
      },
      {
        intent: "autocad_query",
        keys: ["autocad", "cad", "linetype", "grid layout", "layer command", "cli sequence", "drawing command"]
      },
      {
        intent: "graphics_query",
        keys: ["projection", "eccentricity", "representative fraction", "rf scale", "ellipse", "parabola", "involute", "cycloid", "conic", "scale", "dimensions"]
      },
      {
        intent: "coding_query",
        keys: ["programming code", "write a function", "c program", "compile", "struct sizing", "recursion stack", "pointer address"]
      },
      {
        intent: "math_query",
        keys: ["calculus", "matrices", "eigenvalue", "eigenvector", "cayley hamilton", "rolle", "lagrange", "mean value", "differential equation"]
      },
      {
        intent: "physics_query",
        keys: ["optics", "physics", "laser", "einstein coefficient", "newton ring", "interference", "wavelength", "diffraction"]
      },
      {
        intent: "chemistry_query",
        keys: ["chemistry", "battery", "hardness", "water treatment", "demineralization", "ion exchange", "corrosion", "lead-acid"]
      },
      {
        intent: "c_programming_query",
        keys: ["pointers", "structures", "unions", "sizeof", "loop", "arrays", "call stack", "recursion", "recursive factorial"]
      }
    ];

    // Check specific vague combinations like "unit 2", "syllabus notes" without topic specification
    if (q === "unit 1" || q === "unit 2" || q === "unit 3" || q === "unit 4" || q === "unit 5" || q === "syllabus") {
      return "unclear_query";
    }

    let topIntent = "unknown";
    let maxWeight = 0;

    for (const rule of rules) {
      let score = 0;
      for (const k of rule.keys) {
        if (q.includes(k)) {
          // Boost weights for long word matches
          score += k.split(" ").length * 5;
        }
      }
      if (score > maxWeight) {
        maxWeight = score;
        topIntent = rule.intent;
      }
    }

    if (maxWeight > 0) return topIntent;

    // Direct text-token intersections to classify academic questions
    if (q.includes("matrix") || q.includes("eigen") || q.includes("calc") || q.includes("deriv") || q.includes("integral") || q.includes("limit")) {
      return "math_query";
    }
    if (q.includes("ring") || q.includes("optics") || q.includes("fringe") || q.includes("wave") || q.includes("laser") || q.includes("einstein")) {
      return "physics_query";
    }
    if (q.includes("chem") || q.includes("water") || q.includes("battery") || q.includes("lead acid") || q.includes("ion exchange")) {
      return "chemistry_query";
    }
    if (q.includes("pointer") || q.includes("sizeof") || q.includes("struct") || q.includes("union") || q.includes("recursion") || q.includes("c language")) {
      return "c_programming_query";
    }
    if (q.includes("draw") || q.includes("scale") || q.includes("proj") || q.includes("ellipse") || q.includes("involute") || q.includes("eccen")) {
      return "graphics_query";
    }

    return "study_query";
  },

  // Detect subject from query
  detectSubject(query) {
    const q = query.toLowerCase();
    
    if (q.includes("math") || q.includes("matrices") || q.includes("m1") || q.includes("deriv") || q.includes("calc") || q.includes("cayley") || q.includes("rolle") || q.includes("lagrange")) {
      return "Mathematics I";
    }
    if (q.includes("physics") || q.includes("optics") || q.includes("wave") || q.includes("ring") || q.includes("laser") || q.includes("einstein") || q.includes("stokes")) {
      return "Engineering Physics";
    }
    if (q.includes("c ") || q.includes("pointer") || q.includes("struct") || q.includes("union") || q.includes("code") || q.includes("pps") || q.includes("program")) {
      return "PPS C Programming";
    }
    if (q.includes("chem") || q.includes("water") || q.includes("demineral") || q.includes("ion") || q.includes("battery") || q.includes("cells") || q.includes("lead")) {
      return "Engineering Chemistry";
    }
    if (q.includes("beee") || q.includes("electrical") || q.includes("circuit") || q.includes("power factor") || q.includes("superposition")) {
      return "Basic Electrical Engineering";
    }
    if (q.includes("graph") || q.includes("draw") || q.includes("projection") || q.includes("eg") || q.includes("ellipse") || q.includes("scale") || q.includes("involute")) {
      return "Engineering Graphics";
    }
    return null;
  },

  // Deeply detect specific mapped DB topic key from query
  detectTopic(query) {
    const q = query.toLowerCase();
    
    if (q.includes("cayley") || q.includes("hamilton") || q.includes("matri") || q.includes("characteristic")) {
      return "cayley_hamilton";
    }
    if (q.includes("mean value") || q.includes("rolle") || q.includes("lagrange") || q.includes("cauchy") || q.includes("lmvt") || q.includes("cmvt")) {
      return "mean_value_theorems";
    }
    if (q.includes("ring") || q.includes("newtons ring") || q.includes("newton rings") || q.includes("wedge") || q.includes("interference")) {
      return "newtons_rings";
    }
    if (q.includes("laser") || q.includes("einstein") || q.includes("stimulated") || q.includes("spontaneous") || q.includes("population")) {
      return "einstein_laser";
    }
    if (q.includes("struct") || q.includes("union") || q.includes("sizing") || q.includes("padding") || q.includes("alignment")) {
      return "structures_unions";
    }
    if (q.includes("pointer") || q.includes("dereference") || q.includes("address-of") || q.includes("asterisk")) {
      return "pointers_reference";
    }
    if (q.includes("water") || q.includes("demineral") || q.includes("ion exchange") || q.includes("resin") || q.includes("hardness")) {
      return "water_demineralization";
    }
    if (q.includes("battery") || q.includes("lead acid") || q.includes("cell") || q.includes("electrochem")) {
      return "battery_cells";
    }
    if (q.includes("superposition") || q.includes("independent source") || q.includes("circuit theorem")) {
      return "superposition_theorem";
    }
    if (q.includes("power factor") || q.includes("cos phi") || q.includes("ac circuit") || q.includes("apparent")) {
      return "power_factor";
    }
    return null;
  },

  // Dynamic difficulty metric logic
  detectDifficulty(query) {
    const q = query.toLowerCase();
    if (q.includes("hard") || q.includes("difficult") || q.includes("problem") || q.includes("deriv")) {
      return "Hard";
    }
    if (q.includes("easy") || q.includes("simple") || q.includes("revision") || q.includes("bullet")) {
      return "Easy";
    }
    return "Medium";
  },

  // Predict true exam intent
  detectExamIntent(query) {
    const q = query.toLowerCase();
    return q.includes("pyq") || q.includes("marks") || q.includes("examiner") || q.includes("weightage") || q.includes("jntuk");
  },

  // Fully comprehensive offline fuzzy matcher on Route database
  performFuzzyMatching(query) {
    const cleaned = query.toLowerCase().trim();
    if (!cleaned) return ROUTES;

    const matchedRoutes = ROUTES.map(route => {
      let bestScore = 0;

      // Class 1: Exact URL/Subject matches
      if (route.subject.toLowerCase() === cleaned) {
        bestScore = 1.0;
      }

      // Class 2: Exact matching strings in aliases
      route.aliases.forEach(alias => {
        const score = findFuzzyMatchScore(cleaned, alias);
        if (score > bestScore) bestScore = score;
      });

      // Class 3: Key word intersections
      let keywordMatches = 0;
      route.keywords.forEach(keyword => {
        if (cleaned.includes(keyword)) {
          keywordMatches++;
        }
      });
      const keywordScore = keywordMatches / Math.max(1, route.keywords.length);
      const compositeScore = Math.max(bestScore, keywordScore * 0.7);

      return {
        ...route,
        score: compositeScore
      };
    })
    .filter(route => route.score > 0.15)
    .sort((a, b) => b.score - a.score);

    return matchedRoutes;
  },

  // Perform semantic search combining subject, topic and database structures
  performSemanticSearch(query) {
    const matchedRoutes = this.performFuzzyMatching(query);
    const subDetect = this.detectSubject(query);
    const topicDetect = this.detectTopic(query);

    // Boost matching routes with detected subjects or topics
    const boosted = matchedRoutes.map(route => {
      let weight = route.score;
      if (subDetect && route.subject === subDetect) weight += 0.3;
      if (topicDetect && route.id.includes(topicDetect)) weight += 0.5;
      return { ...route, finalScore: weight };
    }).sort((a, b) => b.finalScore - a.finalScore);

    return boosted;
  },

  // Knowledge retrieval system fetching exact structured resources
  fetchKnowledge(query) {
    const topicKey = this.detectTopic(query);
    if (topicKey && PREDEFINED_TOPICS_DB[topicKey]) {
      return {
        key: topicKey,
        ...PREDEFINED_TOPICS_DB[topicKey]
      };
    }
    
    // Fallback fuzzy search inside DB directly
    const q = query.toLowerCase();
    let bestKey = "cayley_hamilton"; // default
    let bestMatchCount = 0;

    Object.keys(PREDEFINED_TOPICS_DB).forEach(key => {
      const topic = PREDEFINED_TOPICS_DB[key];
      let matches = 0;
      if (topic.title.toLowerCase().split(' ').some(w => q.includes(w))) matches += 3;
      if (topic.subject.toLowerCase().split(' ').some(w => q.includes(w))) matches += 1;
      
      if (matches > bestMatchCount) {
        bestMatchCount = matches;
        bestKey = key;
      }
    });

    return {
      key: bestKey,
      ...PREDEFINED_TOPICS_DB[bestKey]
    };
  },

  // Multi-mode response compilation generator (Topper, Viva, Analogy, Quick revision etc)
  generateModes(topicData, mode) {
    const base = topicData;
    
    switch (mode) {
      case "topper":
        return `### 🎓 TOPPER NOTES: ${base.title}\n\n${base.explain.core}\n\n**🥇 Topper's Golden Strategy:**\n${base.summarize.summary}\n\n**💡 Cognitive Visualization:**\n${base.explain.visual}\n\n**⚠️ Common JNTUK PITFALLS to avoid:**\n*${base.explain.trap}*`;
      
      case "viva":
        const vq = base.viva_qs[0] || { q: "State main principle?", a: "Self-explanatory standards" };
        const vq2 = base.viva_qs[1] || { q: "Is it universally true?", a: "Depends on constraints" };
        return `### 🎤 EXTERNAL VIVA TRAINING\n\n**Examiner's Question:** _"${vq.q}"_\n**Perfect Score Answer:** _"${vq.a}"_\n\n---\n**Secondary Challenge:** _"${vq2.q}"_\n**Perfect Score Answer:** _"${vq2.a}"_`;
      
      case "exam":
        return this.generateExamAnswer(topicData);
      
      case "revision":
        return this.generateQuickRevision(topicData);
      
      case "analogy":
        return `### 💡 SCHOLAR ANALOGY METHOD\n\nTo translate this complex syllabus formulation into intuitive physics logic:\n\n> ${base.analogy.core}\n\n**Core Conceptual Mapping:**\n- **Formula component:** Matches real physical variables.\n- **Locus alignment:** Matches standard geometric boundaries.`;
      
      case "memory":
        return `### 🧠 SYSTEM NEURON MEMORY TRICK\n\nUse this specialized visual mnemonic to remember **${base.title}** formulas instantly during the test.\n\n**Formula Mnemonic Link:**\n\`${base.summarize.formulas[0] || "No formula preloaded"}\`\n\n**Syllabus Association Key:**\n* ${base.summarize.points[0]}\n* ${base.summarize.points[1]}\n* Common mistake: _${base.explain.trap}_`;

      case "pyq":
        return `### 🎯 JNTUK HIGH-PREDICTION PYQS\n\nThe following questions are repeatedly extracted under JNTUK R23 evaluations. Practice writing the solutions to clear standard valuation marks:\n\n${base.summarize.pyqs.map(q => `- **${q}**`).join('\n')}`;

      default:
        return `### 📖 ACADEMIC EXPLANATION: ${base.title}\n\n${base.explain.core}\n\n**Formula Index:**\n${base.summarize.formulas.map(f => `- $${f}$`).join('\n')}`;
    }
  },

  // High-fidelity standard JNTUK exam solving layouts
  generateExamAnswer(topicData) {
    const base = topicData;
    return `### 📝 STANDARD JNTUK EXAM SCHEMA: ${base.title}\n\n**Evaluating Authority Criteria:** Standard 10-Mark Allocation\n\n**Step-by-Step Rigorous Solving Procedure:**\n${base.answer.steps.map(s => `#### ${s}`).join('\n')}\n\n**⚠️ CRITICAL WARNING:**\n${base.answer.warnings}\n\n**📊 Drawing & Diagram Layout:**\n${base.answer.diagram}`;
  },

  // Answer dynamic student viva triggers
  generateVivaAnswer(topicData) {
    return this.generateModes(topicData, "viva");
  },

  // Revision sheets with bullets and derivations
  generateQuickRevision(topicData) {
    const base = topicData;
    return `### ⚡ 3-MINUTE CONCEPT SPRINT\n\n**High-Yield Core Bullets:**\n${base.summarize.points.map(p => `- ${p}`).join('\n')}\n\n**Must-Know Formula Definitions:**\n${base.summarize.formulas.map(f => `- \`${f}\``).join('\n')}`;
  },

  // Detailed derivations summaries
  generateTopperSummary(topicData) {
    return this.generateModes(topicData, "topper");
  },

  // Dynamic syllabus recommendation compiler
  recommendRelatedTopics(subjectName) {
    return ROUTES.filter(r => r.subject === subjectName).slice(0, 3);
  },

  // Track user session and sync local database gaps
  trackWeakTopics(topicId, isStruggling = true) {
    try {
      const stats = JSON.parse(localStorage.getItem('engiprep_academic_stats') || '{"weak_topics":[]}');
      if (isStruggling) {
        if (!stats.weak_topics.includes(topicId)) {
          stats.weak_topics.push(topicId);
        }
      } else {
        stats.weak_topics = stats.weak_topics.filter(id => id !== topicId);
      }
      localStorage.setItem('engiprep_academic_stats', JSON.stringify(stats));
    } catch (e) {
      console.warn("Storage syncing error for weak topics tracker", e);
    }
  },

  // Save student history queries and logs
  saveLearningMemory(query, subject, topicKey) {
    try {
      const history = JSON.parse(localStorage.getItem('engiprep_search_history') || '[]');
      const item = {
        query,
        subject,
        topicKey,
        time: new Date().toISOString()
      };
      
      // Store last 10 records
      const updated = [item, ...history.filter(h => h.query !== query)].slice(0, 10);
      localStorage.setItem('engiprep_search_history', JSON.stringify(updated));
    } catch (e) {
      console.warn("Memory tracking file could not write securely", e);
    }
  },

  // HTML response builder for offline interactive cards
  buildResponseCards(results, hasExactMatch = false, activeSubject = null) {
    if (results.length === 0) {
      return `
        <div class="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4">
          <p class="text-xs text-slate-400">🔍 No exact matches found for JNTUK R23 curriculum tracks.</p>
          <div class="flex flex-wrap justify-center gap-2">
            <button onclick="window.setAISearchQuery('m1')" class="px-3 py-1 bg-slate-800 text-slate-350 hover:bg-slate-700 font-mono text-[10px] rounded-lg border border-slate-700 cursor-pointer">matrices (M1)</button>
            <button onclick="window.setAISearchQuery('wave optics')" class="px-3 py-1 bg-slate-800 text-slate-350 hover:bg-slate-700 font-mono text-[10px] rounded-lg border border-slate-700 cursor-pointer">wave optics</button>
            <button onclick="window.setAISearchQuery('c pointers')" class="px-3 py-1 bg-slate-800 text-slate-350 hover:bg-slate-700 font-mono text-[10px] rounded-lg border border-slate-700 cursor-pointer">c pointers</button>
          </div>
        </div>
      `;
    }

    let cardsHTML = '';
    
    if (hasExactMatch && activeSubject) {
      const recs = this.recommendRelatedTopics(activeSubject);
      cardsHTML += `
        <div class="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl mb-4 flex items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 font-mono text-[8.5px] rounded border border-indigo-400/10 font-bold uppercase">FOUND MATCH</span>
              <p class="text-xs font-bold text-slate-100 uppercase tracking-tight">Active Track: ${results[0].subject} (${results[0].unit})</p>
            </div>
            <p class="text-[10px] text-slate-405 leading-relaxed">Direct path available for unit: <b>${results[0].topic}</b></p>
          </div>
          <a href="${results[0].url}" class="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold uppercase rounded-xl border border-indigo-400/20 text-[10px] shadow-sm tracking-wide shrink-0 transition-all cursor-pointer">
            🚀 Launch Unit notes
          </a>
        </div>
      `;
    }

    cardsHTML += `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    `;

    results.forEach(route => {
      let diffBadge = 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/25';
      if (route.difficulty === 'Hard') diffBadge = 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/25';
      else if (route.difficulty === 'Medium') diffBadge = 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/25';

      let matchedTag = route.intentTags[0] || 'notes';

      cardsHTML += `
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all space-y-3 relative group flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between flex-wrap gap-2 text-[8px] font-black uppercase text-slate-500 tracking-wider">
              <span>${route.subject}</span>
              <span class="px-1.5 py-0.5 rounded border ${diffBadge}">${route.difficulty}</span>
            </div>
            <h4 class="text-xs font-black text-slate-100 uppercase tracking-tight line-clamp-1 leading-normal">${route.topic}</h4>
            <p class="text-[9.5px] text-slate-405 line-clamp-2 leading-relaxed">Includes ${route.keywords.slice(0, 3).join(', ')} syllabus concepts.</p>
          </div>

          <div class="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-slate-800/60 mt-2">
            <span class="px-2 py-0.5 bg-slate-800 text-slate-400 text-[8px] uppercase tracking-widest rounded">${route.unit}</span>
            <a href="${route.url}" class="text-[9px] font-mono text-[#4f46e5] font-black hover:underline uppercase inline-flex items-center gap-1 cursor-pointer">
              Launch Module ➜
            </a>
          </div>
        </div>
      `;
    });

    cardsHTML += `</div>`;
    return cardsHTML;
  },

  // TRUE HYBRID ARTIFICIAL INTELLIGENT ROUTER & SOLVER
  generateAIResponse(userInput, profMode = "strict") {
    const rawInput = userInput.trim();
    const cleanInput = rawInput.toLowerCase();
    const intent = this.analyzeIntent(userInput);
    
    // Load and update state memory
    const memory = this.getMemory();
    
    // Handle "explain again" using memory references
    if (cleanInput.includes("explain again") || cleanInput.includes("explain that again") || cleanInput.includes("repeat that")) {
      const lastTopicKey = memory.recentTopics[0];
      if (lastTopicKey && PREDEFINED_TOPICS_DB[lastTopicKey]) {
        const d = PREDEFINED_TOPICS_DB[lastTopicKey];
        return {
          intent: "study_query",
          matchedKey: lastTopicKey,
          html: this.buildExactAcademicCard(d, profMode)
        };
      } else {
        return {
          intent: "casual_chat",
          html: `
            <div class="space-y-2">
              <p class="text-xs font-semibold">I'd love to re-explain, but we haven't discussed any engineering topics yet in this session! 📚</p>
              <p class="text-[11px] text-slate-550 dark:text-slate-400">Ask me about a JNTUK concept like <i>"Cayley Hamilton theorem"</i> or <i>"C Pointers"</i> and let's master it!</p>
            </div>
          `
        };
      }
    }

    // Capture modifiers
    const isShort = cleanInput.includes("short answer") || cleanInput.includes("concise") || cleanInput.includes("brief");
    const isDetailed = cleanInput.includes("detailed") || cleanInput.includes("explain in detail") || cleanInput.includes("deep dive");

    // Route conversation elements contextually
    if (intent === "greeting") {
      return {
        intent,
        html: `
          <div class="space-y-3">
              <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  Hey there! 👋 I am the <b>EngiPrepHub AI Professor</b>, calibrated extensively for your <b>JNTUK R23 syllabus</b>.
              </p>
              <div class="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-slate-800/80 rounded-xl space-y-1.5">
                  <span class="text-[9px] font-black uppercase text-indigo-500 tracking-widest block">How I can guide your studies:</span>
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10.5px] font-bold text-slate-650 dark:text-slate-400">
                      <li class="flex items-center gap-1">📜 <span>JNTUK R23 Notes</span></li>
                      <li class="flex items-center gap-1">🎯 <span>High-Yield PYQs</span></li>
                      <li class="flex items-center gap-1">📐 <span>Graphics Drawing Aids</span></li>
                      <li class="flex items-center gap-1">💻 <span>PPS Memory Stack traces</span></li>
                      <li class="flex items-center gap-1">🧐 <span>External Viva training</span></li>
                      <li class="flex items-center gap-1">⚡ <span>Instant Formula sheets</span></li>
                  </ul>
              </div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  Type an engineering topic to begin, or select a quick recommendation below!
              </p>
              <div class="flex flex-wrap gap-1 mt-1">
                  <button onclick="window.setAISearchQuery('Cayley Hamilton')" class="px-2 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold rounded hover:border-indigo-500 cursor-pointer">Cayley Hamilton</button>
                  <button onclick="window.setAISearchQuery('C Pointers')" class="px-2 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold rounded hover:border-indigo-500 cursor-pointer">C Pointers</button>
                  <button onclick="window.setAISearchQuery('Newton Rings')" class="px-2 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold rounded hover:border-indigo-500 cursor-pointer">Newton's Rings</button>
              </div>
          </div>
        `
      };
    }

    if (intent === "gratitude") {
      return {
        intent,
        html: `
          <div class="space-y-2.5">
              <p class="text-xs font-black text-emerald-500 uppercase tracking-tight">Happy to Help! 🎓</p>
              <p class="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                  I'm absolutely thrilled that this breakdown clarified things. The key to clearing JNTUK R23 valuer reviews is mapping coordinates and matching formula constants meticulously. Keep going, you've got this!
              </p>
              <div class="pt-2 border-t border-slate-250 dark:border-slate-850 flex items-center justify-between text-[9.5px] font-black text-slate-400">
                  <span>Next Lesson awaits</span>
                  <button onclick="window.setAISearchQuery('mean value theorems')" class="px-2.5 py-1 bg-indigo-600 text-white font-extrabold uppercase rounded border border-indigo-400/15 cursor-pointer">Mean Value ➜</button>
              </div>
          </div>
        `
      };
    }

    if (intent === "casual_chat") {
      return {
        intent,
        html: `
          <div class="space-y-3">
              <p class="text-xs font-semibold leading-relaxed text-slate-700 dark:text-slate-350">
                  I am running full offline processing cycles, totally dedicated to scanning curriculum queries across the JNTUK R23 directory! 🦾
              </p>
              <p class="text-[11px] text-slate-400 leading-normal">
                  No sleep bounds or fatigue limits. Whether you have an exam tomorrow morning or a difficult laboratory record sheet to complete tonight, I'm here to ensure you secure top internal tiers.
              </p>
              <div class="p-2 bg-[#0a0a0f] text-[#3b82f6] border border-slate-800 font-mono text-[9px] text-center rounded-lg">
                  CORE: STABLE // INTERFACE_V2: READY // INTENT: DETECTED
              </div>
          </div>
        `
      };
    }

    if (intent === "identity_question") {
      return {
        intent,
        html: `
          <div class="space-y-2.5">
              <p class="text-xs font-black uppercase text-indigo-500 tracking-wider">EngiPrepHub AI Study Assistant</p>
              <p class="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  I am a bespoke offline <b>Hybrid Intelligence System</b> crafted explicitly for engineering students facing JNTUK R23 evaluations. Unlike normal chatbots, I am loaded with academic search layers, step derivations, and grading traps.
              </p>
              <div class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] text-slate-500 uppercase font-black tracking-tight">
                  100% Offline // Zero external API dependency // Instant calculations
              </div>
          </div>
        `
      };
    }

    if (intent === "help_request") {
      return {
        intent,
        html: `
          <div class="space-y-2.5">
              <p class="text-xs font-bold text-slate-800 dark:text-slate-250">🎓 EngiPrepHub Power-User Command Matrix</p>
              <p class="text-xs text-slate-500 leading-normal">I can dynamically resolve any search strings local in JNTUK R23. Try writing standard prompts like:</p>
              <div class="p-3 bg-[#0d0d12] rounded-xl border border-slate-850 space-y-1.5 text-[11px] font-mono text-[#00f3ff]">
                  <div>• "viva pointers" ➜ loads viva questions</div>
                  <div>• "formula newton rings" ➜ highlights formulas</div>
                  <div>• "derive matrices" ➜ shows standard proof layout</div>
                  <div>• "autocad layers" ➜ outputs AutoCAD layers setup matrix</div>
              </div>
          </div>
        `
      };
    }

    if (intent === "motivational" || intent === "emotional_support") {
      return {
        intent,
        html: `
          <div class="space-y-2.5">
              <p class="text-xs font-black text-amber-500 uppercase tracking-wider">💡 Topper Mentorship Booster</p>
              <blockquote class="p-3 bg-amber-50/50 dark:bg-amber-950/10 border-l-4 border-amber-500 rounded-r-xl text-xs font-bold italic text-slate-700 dark:text-slate-300 leading-relaxed">
                  "Exams do not measure your real neural capacity. They assess your discipline and mechanical precision on a given day. JNTUK papers checked steps, diagrams, and formula correctness. Don't worry about memorizing entire textbooks. Excel at 5 targeted steps."
              </blockquote>
              <p class="text-[11px] text-slate-400 font-semibold leading-relaxed">
                  Anxiety drops when action climbs. Let's practice drawing an exact conic curve or calculating a characteristic inverse matrix. Select a subject below!
              </p>
          </div>
        `
      };
    }

    if (intent === "unclear_query") {
      return {
        intent,
        html: `
          <div class="space-y-3">
              <div class="p-2.5 bg-rose-500/10 border border-rose-500/25 text-rose-500 rounded-xl text-xs font-black uppercase tracking-wider">
                  ⚠️ Undefined Subject Constraints
              </div>
              <p class="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
                  You requested <b>"${rawInput}"</b>, but without declaring the active subject, I cannot locate the correct syllabus index folders.
              </p>
              <div class="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <span class="text-[9px] font-extrabold uppercase tracking-wide text-indigo-400 block pb-1 border-b border-slate-200 dark:border-slate-800/80">Select subject index to resolve:</span>
                  <div class="flex flex-col gap-1">
                      <button onclick="window.setAISearchQuery('M1 Matrices')" class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10.5px] text-left font-black rounded hover:border-indigo-500 cursor-pointer">📐 Mathematics (M1 Matrices / Theorems)</button>
                      <button onclick="window.setAISearchQuery('C PPS pointers')" class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10.5px] text-left font-black rounded hover:border-indigo-500 cursor-pointer">💻 PPS C Programming (Pointers / Code)</button>
                      <button onclick="window.setAISearchQuery('Engineering Physics lasers')" class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10.5px] text-left font-black rounded hover:border-indigo-500 cursor-pointer">⚛️ Engineering Physics (Optics / Laser coefficients)</button>
                      <button onclick="window.setAISearchQuery('Engineering Chemistry cell')" class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10.5px] text-left font-black rounded hover:border-indigo-500 cursor-pointer">🧪 Engineering Chemistry (Water / Battery)</button>
                  </div>
              </div>
          </div>
        `
      };
    }

    if (intent === "roadmap_query") {
      return {
        intent,
        html: `
          <div class="space-y-3">
              <h4 class="text-xs font-black uppercase text-indigo-500 tracking-wider">🗺️ JNTUK R23 Exam Roadmap to score 90%+</h4>
              <p class="text-xs text-slate-500 leading-relaxed">JNTUK evaluates answers utilizing 3 crucial checklists. Here is how you should structure your study sheet:</p>
              
              <div class="p-3.5 bg-[#0e0e15] rounded-xl border border-slate-850 space-y-2 text-xs">
                  <div><b>1. Formula Highlight block (3 Marks):</b> Write the main equation centered on the page inside a double-bordered box.</div>
                  <div><b>2. pristine diagrams coordinates (3 Marks):</b> Always draw axes, labels, and boundary curves with exact reference scales.</div>
                  <div><b>3. Step-by-Step Derivation lines (4 Marks):</b> Never skip algebra! Write brief comments explaining every transition step.</div>
              </div>
              <p class="text-[10px] text-slate-400 font-extrabold uppercase">Type "viva" followed by subject name to do quick self-evaluations!</p>
          </div>
        `
      };
    }

    // Comparison intent selector
    if (intent === "comparison_query") {
      let comparisonHtml = "";
      if (cleanInput.includes("struct") || cleanInput.includes("union")) {
        comparisonHtml = `
          <div class="space-y-3">
              <h4 class="text-xs font-black uppercase text-[#ef4444]">PPS Comparison: Structures vs Unions</h4>
              <p class="text-xs text-slate-500">How structures and unions distribute registers inside JNTUK grading checklists:</p>
              <div class="overflow-x-auto">
                  <table class="w-full text-[10px] text-left font-bold border-collapse border border-slate-800">
                      <thead>
                          <tr class="bg-slate-950 text-slate-300">
                              <th class="p-2 border border-slate-800 font-black">CRITERIA</th>
                              <th class="p-2 border border-slate-800 font-black">STRUCTURE</th>
                              <th class="p-2 border border-slate-805 font-black">UNION</th>
                          </tr>
                      </thead>
                      <tbody class="text-slate-400">
                          <tr>
                              <td class="p-2 border border-slate-800 text-indigo-400">Keyword</td>
                              <td class="p-2 border border-slate-800 font-mono">struct</td>
                              <td class="p-2 border border-slate-800 font-mono">union</td>
                          </tr>
                          <tr class="bg-slate-950/40">
                              <td class="p-2 border border-slate-800 text-indigo-400">Memory allocation</td>
                              <td class="p-2 border border-slate-800">Every member gets standard independent bytes.</td>
                              <td class="p-2 border border-slate-800">All members share the single largest memory block.</td>
                          </tr>
                          <tr>
                              <td class="p-2 border border-slate-800 text-indigo-400">Total size</td>
                              <td class="p-2 border border-slate-800">Sum of sizes of all members + memory padding.</td>
                              <td class="p-2 border border-slate-800">Exactly equal to the largest member data size.</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        `;
      } else if (cleanInput.includes("scale") || cleanInput.includes("plain") || cleanInput.includes("diagonal")) {
        comparisonHtml = `
          <div class="space-y-3">
              <h4 class="text-xs font-black uppercase text-[#ef4444]">Engineering Graphics: Plain Scale vs Diagonal Scale</h4>
              <div class="overflow-x-auto text-[10px] font-bold">
                  <table class="w-full text-left border border-slate-800 border-collapse">
                      <thead>
                          <tr class="bg-slate-950 text-slate-300">
                              <th class="p-2 border border-slate-800 font-black">Feature</th>
                              <th class="p-2 border border-slate-800 font-black">Plain Scale</th>
                              <th class="p-2 border border-slate-800 font-black">Diagonal Scale</th>
                          </tr>
                      </thead>
                      <tbody class="text-slate-400">
                          <tr>
                              <td class="p-2 border border-slate-800 text-indigo-400">Units read</td>
                              <td class="p-2 border border-slate-800">Can display 2 units (e.g., m and dm).</td>
                              <td class="p-2 border border-slate-800">Can display 3 units (e.g., m, dm and cm).</td>
                          </tr>
                          <tr class="bg-slate-950/40">
                              <td class="p-2 border border-slate-800 text-indigo-400">Precision</td>
                              <td class="p-2 border border-slate-800">1 decimal place measurements.</td>
                              <td class="p-2 border border-slate-800">2 decimal places of precise dimensioning.</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        `;
      } else {
        comparisonHtml = `
          <div class="space-y-2">
              <h4 class="text-xs font-black uppercase text-slate-400">Direct Comparison Search</h4>
              <p class="text-xs text-slate-655 dark:text-slate-350 leading-relaxed">
                  I can produce clear comparison grid parameters for C Structures/Unions, Plain/Diagonal Scales, or Laser emissions. Try searching specifically: <i>"struct vs union"</i> or <i>"plain vs diagonal scale"</i>!
              </p>
          </div>
        `;
      }

      return {
        intent,
        html: comparisonHtml
      };
    }

    // ACADEMIC PROCESSOR - Deep fuzzy query indexing and routing
    const topicKey = this.detectTopic(userInput);
    
    // Fuzzy confidence matching check on topics
    if (topicKey && PREDEFINED_TOPICS_DB[topicKey]) {
      const data = PREDEFINED_TOPICS_DB[topicKey];
      
      // Update contextual memory
      memory.recentTopics = [topicKey, ...memory.recentTopics.filter(id => id !== topicKey)].slice(0, 5);
      memory.currentSubject = data.subject;
      this.saveMemory(memory);

      return {
        intent: "study_query",
        matchedKey: topicKey,
        html: this.buildExactAcademicCard(data, profMode, isShort, isDetailed)
      };
    }

    // Typo tolerance semantic approximation matches (Step 9)
    let bestFuzzyTopicKey = null;
    let highestFuzzyScore = 0;

    Object.keys(PREDEFINED_TOPICS_DB).forEach(key => {
      const data = PREDEFINED_TOPICS_DB[key];
      // Test titles, keywords, and synonyms
      const scores = [
        findFuzzyMatchScore(cleanInput, data.title),
        findFuzzyMatchScore(cleanInput, key.replace(/_/g, ' ')),
        ...data.summarize.points.map(pt => findFuzzyMatchScore(cleanInput, pt))
      ];
      const maxScore = Math.max(...scores);
      if (maxScore > highestFuzzyScore) {
        highestFuzzyScore = maxScore;
        bestFuzzyTopicKey = key;
      }
    });

    if (highestFuzzyScore > 0.45 && bestFuzzyTopicKey) {
      const data = PREDEFINED_TOPICS_DB[bestFuzzyTopicKey];
      
      // Update memory
      memory.recentTopics = [bestFuzzyTopicKey, ...memory.recentTopics.filter(id => id !== bestFuzzyTopicKey)].slice(0, 5);
      memory.currentSubject = data.subject;
      this.saveMemory(memory);

      return {
        intent: "study_query",
        matchedKey: bestFuzzyTopicKey,
        html: this.buildExactAcademicCard(data, profMode, isShort, isDetailed)
      };
    }

    // Dynamic Synthesis Engine fallback for general study queries (Step 7)
    const detectedSub = this.detectSubject(userInput) || "Engineering Core Concepts";
    let dynamicTitle = rawInput;
    let syllabusPath = ["Foundational prerequisite definition under JNTUK credit rules.", "Review constants and continuous equations.", "Examine geometric bounds or program loops.", "Double check calculations bounds and parameter identities."];
    let dynamicFormula = "Z_c = f(x, y) \\quad \\iff \\quad \\mathcal{H} = \\mathcal{T} + \mathcal{V}";
    let dynamicAnalogy = "Think of this mechanism like a water storage tank - what accumulates inside of the container must strictly equal the input flow subtracting any output leaks.";
    let dynamicFeedback = "Ensure you check the final units of scalars parameters. JNTUK evaluations check step bounds and physical parameters.";
    
    // Customize synthesis blocks contextually according to subject tags
    if (intent === "math_query" || cleanInput.includes("differential") || cleanInput.includes("derivative")) {
      syllabusPath = [
        "Formulate core coordinate systems and variable bounds.",
        "Check differentiability and continuity on defined intervals.",
        "Equate first derivative outputs to slope values.",
        "Solve the resulting algebraic formulation for unknown coefficients."
      ];
      dynamicFormula = "f'(c) = \\frac{f(b) - f(a)}{b-a} \\quad \\implies \\quad A \\cdot X = \\lambda \\cdot X";
      dynamicAnalogy = "Think of differential limits like driving on a steep road. Average slope of the entire trip matches instantaneous velocity at some interval c.";
      dynamicFeedback = "Common mistake: forgetting constants and identity matrices inside polynomial additions results in a 2-mark deduction.";
    } else if (intent === "physics_query" || cleanInput.includes("optics") || cleanInput.includes("wave")) {
      syllabusPath = [
        "Setup monochromatic light source specifications.",
        "Set optical index and path difference values.",
        "Formulate fringes conditions (Constructive vs Destructive).",
        "Calculate dark and bright fringe radii parameters."
      ];
      dynamicFormula = "2 \\cdot \\mu \\cdot t \\cdot \\cos r = n \\cdot \\lambda \\quad \\implies \\quad I \\propto A^2";
      dynamicAnalogy = "Imagine waves in a puddle colliding. Where peaks overlap peaks, the water erupts (Bright fringe). Where peak meets trough, they cancel to absolute stillness (Dark fringe).";
      dynamicFeedback = "Common mistake: confusing lens path differences with wedge-shaped films results in incorrect formulas. Draw boundaries clean.";
    } else if (intent === "chemistry_query" || cleanInput.includes("battery") || cleanInput.includes("water")) {
      syllabusPath = [
        "Map positive and negative electrode active reactions.",
        "Formulate cell potentials under defined concentrations.",
        "Identify chemical ion exchanges on organic resins.",
        "Measure hardness content as equivalent calcium carbonates."
      ];
      dynamicFormula = "E = E^0 - \\frac{0.0591}{n} \\log Q \\quad \\implies \\quad \\text{Hardness} = \\text{mg / Litres}";
      dynamicAnalogy = "Think of battery cell operation like a busy post office. Electrons act as packages. The potential (voltage) is the rush of mail flowing between sorting drawers.";
      dynamicFeedback = "Common mistake: failing to balance basic cell stoichiometries. Check balance coefficients inside reaction expressions.";
    } else if (intent === "c_programming_query" || cleanInput.includes("pointers") || cleanInput.includes("recursion")) {
      syllabusPath = [
        "Declare accurate keyword syntax labels (struct vs union).",
        "Calculate byte sizes taking alignment boundaries (padding) into account.",
        "Map address references and dereference operators (*) precisely.",
        "Audit recursive termination bases to prevent stack overheads."
      ];
      dynamicFormula = "sizeof(struct_var) \\approx \\Sigma(\\text{members}) + \\text{padding} \\quad \\iff \\quad \\text{RAM_ADDRESS}";
      dynamicAnalogy = "Think of pointers like mailboxes. The pointer variable holds the direct address index of the box (e.g. 0x7ffd), whereas dereferencing (*) reads the actual package inside.";
      dynamicFeedback = "Common mistake: dereferencing uninitialized pointer addresses leads to a segmentation fault. Always assign address reference indexes.";
    }

    // Return gorgeous dynamic educational card (Step 7)
    return {
      intent,
      html: `
        <div class="space-y-4" id="dyn-synthesis-${Date.now()}">
            <div class="border-b border-indigo-255/20 dark:border-slate-800 pb-2 flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h4 class="text-xs font-black dark:text-white uppercase tracking-tight">${dynamicTitle}</h4>
                    <span class="text-[8.5px] text-[#4f46e5] font-extrabold uppercase tracking-widest">${detectedSub} Syllabus Topic</span>
                </div>
                <button onclick="window.toggleSpeechDemoNotes(document.getElementById('dyn-synthesis-text-${Date.now()}').innerText, this)" class="px-2.5 py-1 bg-indigo-50/60 dark:bg-indigo-950/40 text-[9px] text-[#4f46e5] rounded-xl border border-indigo-200/20 font-black leading-none uppercase">
                    <span>🔊 Read Outloud</span>
                </button>
            </div>

            <p class="text-[10.5px] text-slate-500 italic font-semibold">"Custom educational blueprint compiled locally under JNTUK R23 guidelines:"</p>

            <div id="dyn-synthesis-text-${Date.now()}" class="space-y-3 select-text font-semibold">
                <!-- Simple Explanation -->
                <div class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                    <span class="text-[9.5px] font-black text-indigo-500 uppercase tracking-widest block">1. Concept Explanation</span>
                    <p class="text-xs leading-relaxed text-slate-700 dark:text-slate-300">Detailed conceptual analysis of ${dynamicTitle}. This describes how physical patterns are represented under JNTUK core theory tracks.</p>
                </div>

                <!-- Exam Definition -->
                <div class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                    <span class="text-[9.5px] font-black text-indigo-500 uppercase tracking-widest block">2. Exam Definition</span>
                    <p class="text-xs text-slate-750 dark:text-slate-300"><b>Official Definition:</b> The system state or physical function of ${dynamicTitle} is defined as the mathematical, chemical, or logical expression mapping local transitions on continuous coordinate vectors.</p>
                </div>

                <!-- Step-by-Step Breakdown -->
                <div class="p-3.5 bg-indigo-500/5 dark:bg-indigo-950/10 border border-indigo-500/20 rounded-xl space-y-1.5">
                    <b class="text-indigo-400 text-[10px] block uppercase tracking-wider">3. 10-Mark Step-by-Step Solving Flowchart</b>
                    <ol class="list-decimal pl-4 text-xs select-text space-y-1 text-slate-700 dark:text-slate-350">
                        ${syllabusPath.map(p => `<li>${p}</li>`).join('')}
                    </ol>
                </div>

                <!-- Real-World Analogy -->
                <div class="p-3.5 bg-amber-50/50 dark:bg-slate-950/20 border border-amber-250/25 rounded-xl">
                    <b class="text-amber-500 text-[9.5px] uppercase tracking-wider block mb-1">4. Real World Analogy Hook</b>
                    <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">💡 ${dynamicAnalogy}</p>
                </div>

                <!-- Important Formula -->
                <div class="p-3.5 bg-[#08080c] text-[#00ffcc] rounded-xl font-mono text-center border border-slate-850">
                    <span class="text-slate-500 text-[8px] uppercase block mb-1">5. Critical Formula Stack</span>
                    ${dynamicFormula}
                </div>

                <!-- PYQ Importance -->
                <div class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                    <b class="text-indigo-500 text-[9.5px] uppercase tracking-wider block">6. JNTUK Exam Evaluation Weightages</b>
                    <p class="text-xs text-slate-650 dark:text-slate-350">Highly frequent as a repeated 5-10 Marks question inside external valuation blocks. Marks are strictly bound to formula accuracy and coordinate layout drawing correctness.</p>
                </div>

                <!-- Common Viva Questions -->
                <div class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5">
                    <b class="text-[#00c8ff] text-[9.5px] uppercase tracking-wider block">7. Lab Examiner Orals prep</b>
                    <p class="text-xs text-slate-650 dark:text-slate-300"><b>Q:</b> What is the principal limitation or constant of ${dynamicTitle}? <br><b>Answer:</b> ${dynamicFeedback}</p>
                </div>

                <!-- Memory Trick -->
                <div class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                    <b class="text-emerald-500 text-[9.5px] uppercase tracking-wider block">8. Memory Trick</b>
                    <p class="text-xs text-slate-650 dark:text-slate-350">Bind this equation to the analogy above. Average rate of changes always equal limits.</p>
                </div>

                <!-- Quick Revision Summary -->
                <div class="p-3.5 bg-slate-950 text-slate-300 rounded-xl space-y-1">
                    <b class="text-slate-500 text-[8px] uppercase block">9. 30-Second Revision Summary</b>
                    <p class="text-[11px] leading-relaxed">Focus strictly on step boundaries. Master the diagrams and the formula parameters. Always append constants to equations.</p>
                </div>
            </div>
        </div>
      `
    };
  },

  // Build gorgeous multi-tab concept notes card
  buildExactAcademicCard(data, profMode, isShort = false, isDetailed = false) {
    const containerId = "academic-card-" + Date.now();
    const intros = {
      strict: `Omit any of these 5 pillars for **${data.title}**, and I will deduct 3 marks instantly. Keep your layouts pristine:`,
      senior: `Yo bro! Honestly, **${data.title}** is super chilled. Trace your calculations and you'll easily score S grade:`,
      coach: `⚡ HIGH-SPEED EXAM BREIF! Master these high-yield components of **${data.title}** immediately:`,
      viva: `🧐 EXAMINER ORAL INSTRUCTION: Formally defend your mathematical calculations on **${data.title}**:`
    };
    const activeText = intros[profMode] || intros.strict;

    // Build the blueprint sequence steps
    const stepsHtml = data.answer.steps.map((st, i) => `<li><b>S${i+1}:</b> ${st}</li>`).join('');

    // Check modifiers to shorten or detail responses mapping (Step 10)
    let summaryContentHtml = "";
    if (isShort) {
      summaryContentHtml = `
        <div class="p-3 bg-[#0d0d12] text-[#ef4444] rounded-xl font-mono text-center">
            <span class="text-slate-500 text-[8.5px] uppercase block mb-0.5">Quick Math Anchor</span>
            ${data.summarize.formulas[0]}
        </div>
      `;
    } else {
      summaryContentHtml = `
        <div class="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-200/20 rounded-xl">
            <b class="text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-[9.5px] block mb-1">Passable Step Sequence to score 10/10:</b>
            <ul class="space-y-1">
                ${stepsHtml}
            </ul>
        </div>
        <div class="p-3 bg-[#0d0d12] text-[#22d3ee] rounded-xl font-mono text-center border border-slate-850">
            <span class="text-slate-400 font-bold block mb-1 uppercase text-[8.5px]">Main Formula Stack</span>
            ${data.summarize.formulas[0] || 'A x = lambda x'}
        </div>
      `;
    }

    return `
      <div class="space-y-4" id="${containerId}">
          <div class="border-b border-indigo-250/30 dark:border-slate-800 pb-2 flex items-center justify-between flex-wrap gap-2">
              <div>
                  <h4 class="text-xs font-black dark:text-white uppercase tracking-tight">${data.title}</h4>
                  <span class="text-[8.5px] text-[#4f46e5] font-extrabold uppercase tracking-widest">${data.subject}</span>
              </div>
              <button onclick="window.toggleSpeechDemoNotes(document.getElementById('${containerId}-tabs-text').innerText, this)" class="px-2.5 py-1 bg-indigo-50/60 dark:bg-indigo-950/40 text-[9px] text-[#4f46e5] rounded-xl border border-indigo-200/20 font-black leading-none uppercase shrink-0">
                  <span class="tts-icon-play">🔊 Read Notes Outloud</span>
              </button>
          </div>

          <p class="text-xs italic text-slate-650 dark:text-slate-400 font-semibold leading-relaxed">"${activeText}"</p>

          <!-- Interactive tab selectors -->
          <div class="flex flex-wrap gap-1.5 border-b border-slate-200 dark:border-slate-800/80 pb-1.5">
              <button onclick="switchChatTab('${containerId}', 'blueprint')" class="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider chat-tab-btn" data-tab="blueprint">Exam Blueprint</button>
              <button onclick="switchChatTab('${containerId}', 'topper')" class="px-3 py-1 bg-slate-50 dark:bg-slate-905 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-wider chat-tab-btn" data-tab="topper">Topper Summary</button>
              <button onclick="switchChatTab('${containerId}', 'mental')" class="px-3 py-1 bg-slate-50 dark:bg-slate-905 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-wider chat-tab-btn" data-tab="mental">Mental Model</button>
              <button onclick="switchChatTab('${containerId}', 'viva')" class="px-3 py-1 bg-slate-50 dark:bg-slate-905 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-wider chat-tab-btn" data-tab="viva">Viva Test</button>
          </div>

          <!-- Tab Contents Container -->
          <div class="min-h-[160px] text-xs leading-relaxed select-text font-medium" id="${containerId}-tabs-text">
              <!-- Blueprint tab default -->
              <div class="space-y-3.5 chat-sub-tab" data-tab-content="blueprint">
                  ${summaryContentHtml}
              </div>

              <!-- Topper summary -->
              <div class="space-y-2.5 hidden chat-sub-tab" data-tab-content="topper">
                  <div class="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/20 rounded-xl">
                      <b class="text-emerald-600 dark:text-emerald-400 uppercase tracking-widest text-[9.5px] block mb-1">5 High-Yield Academic Review Points:</b>
                      <ul class="list-disc pl-4 space-y-1">
                          ${data.summarize.points.map(pt => `<li>${pt}</li>`).join('')}
                      </ul>
                  </div>
                  <div class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl">
                      <b class="text-[#4f46e5] text-[9.5px] uppercase tracking-widest block mb-1">Syllabus Frequent Repeated PYQs:</b>
                      <p class="font-black text-rose-500">${data.summarize.pyqs[0]}</p>
                  </div>
              </div>

              <!-- Mental analogy -->
              <div class="space-y-2.5 hidden chat-sub-tab" data-tab-content="mental">
                  <div class="p-4 bg-amber-50/40 dark:bg-amber-950/5 border border-amber-200/20 rounded-xl italic font-black text-slate-800 dark:text-slate-200">
                      💡 "${data.analogy.core}"
                  </div>
                  <div class="p-3.5 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-220/20 rounded-xl">
                      <b class="text-rose-500 text-[9px] uppercase tracking-widest block mb-0.5">Evaluation Caution:</b>
                      <p class="font-bold text-slate-700 dark:text-slate-300">${data.explain.trap}</p>
                  </div>
              </div>

              <!-- Viva Qs tab -->
              <div class="space-y-2 hidden chat-sub-tab" data-tab-content="viva">
                  <span class="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Click to reveal expected answer verdicts</span>
                  ${data.viva_qs.map((vq, idx) => `
                      <div onclick="this.querySelector('.viva-sub-ans').classList.toggle('hidden')" class="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-indigo-650 flex flex-col gap-1.5 transition-colors select-none">
                          <p class="font-black flex items-start gap-1">
                              <span class="text-indigo-600 dark:text-indigo-400">Q${idx+1}:</span>
                              <span class="text-slate-800 dark:text-[#f3f4f6]">${vq.q}</span>
                          </p>
                          <p class="viva-sub-ans hidden font-extrabold text-[#42b883] pt-1.5 border-t border-slate-150 text-[11px] select-text">
                              Expected Answer: ${vq.a}
                          </p>
                      </div>
                  `).join('')}
              </div>
          </div>

          <p class="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wide border-t border-slate-200 dark:border-slate-800 pt-2.5">
              Precise valuation standards active. Review multiple times to guarantee high internal markings.
          </p>
      </div>
    `;
  }
};
