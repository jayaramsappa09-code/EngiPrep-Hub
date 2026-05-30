import { AI_ENGINE } from '../engine/coreEngine.js';
import { ROUTES } from '../db/routes.js';

export const AI_ROUTER = {
  // Resolve a natural language query into an elegant target path
  resolveRoute(query) {
    const cleaned = query.toLowerCase().trim();
    if (!cleaned) return null;

    // Direct exact keyword/abbreviation mapping first
    if (cleaned === 'm1' || cleaned === 'maths 1' || cleaned === 'mathematics 1') {
      return '/maths/unit-1';
    }
    if (cleaned === 'm2' || cleaned === 'maths 2' || cleaned === 'mathematics 2') {
      return '/engineering-mathematics-2';
    }
    if (cleaned === 'eg' || cleaned === 'graphics' || cleaned === 'engg graphics') {
      return '/engineering-graphics/ellipse';
    }
    if (cleaned === 'clab' || cleaned === 'c lab' || cleaned === 'pps lab') {
      return '/c-programming/pointers';
    }
    if (cleaned === 'physics notes' || cleaned === 'physics' || cleaned === 'wave optics') {
      return '/physics/wave-optics';
    }
    if (cleaned === 'chemistry' || cleaned === 'electrochemistry') {
      return '/chemistry/electrochemistry';
    }
    if (cleaned === 'water' || cleaned === 'demineralization') {
      return '/chemistry/water-demineralization';
    }

    // Run semantic AI engine routing analysis
    const searchResult = AI_ENGINE.performSemanticSearch(cleaned);
    if (searchResult && searchResult.length > 0) {
      const topRoute = searchResult[0];
      
      // Map matched routes to beautiful clean restructuring rules
      if (topRoute.id === 'm1_u1') return '/maths/unit-1';
      if (topRoute.id === 'm1_u2') return '/maths/unit-2';
      if (topRoute.id === 'physics_u1') return '/physics/wave-optics';
      if (topRoute.id === 'physics_u2') return '/physics/lasers';
      if (topRoute.id === 'c_u1') return '/c-programming/structures-unions';
      if (topRoute.id === 'c_u2') return '/c-programming/pointers';
      if (topRoute.id === 'chemistry_u1') return '/chemistry/water-demineralization';
      if (topRoute.id === 'chemistry_u2') return '/chemistry/electrochemistry';
      if (topRoute.id === 'beee_u1') return '/beee/superposition';
      if (topRoute.id === 'beee_u2') return '/beee/power-factor';
      if (topRoute.id === 'graphics_u1') return '/engineering-graphics/ellipse';
      if (topRoute.id === 'graphics_u2') return '/engineering-graphics/projections';
      
      if (topRoute.id === 'pyqs') return '/jntuk-r23-previous-question-papers';
      if (topRoute.id === 'cheat_sheets') return '/c-programming-cheat-sheet';
      if (topRoute.id === 'ai_professor') return '/ai-professor.html';

      return topRoute.url;
    }

    return null;
  },

  // Perform client-side active path redirect with instant notification/toast feedback
  navigateToQuery(query) {
    const targetURL = this.resolveRoute(query);
    if (targetURL) {
      console.log(`Semantic Routing redirect: "${query}" -> ${targetURL}`);
      window.location.href = targetURL;
      return true;
    }
    
    return false;
  }
};

// Expose globally on window for HTML templates to load dynamically
if (typeof window !== 'undefined') {
  window.AI_ROUTER = AI_ROUTER;
  window.handleAISemanticRouting = (query) => AI_ROUTER.navigateToQuery(query);
}
