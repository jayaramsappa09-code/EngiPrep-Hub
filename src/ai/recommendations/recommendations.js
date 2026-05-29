import { ROUTES } from '../db/routes.js';

export const AI_RECOMMENDATIONS = {
  // Get tailored recommendations for a specific subject
  getSubjectRecommendations(subjectName, limit = 3) {
    const list = ROUTES.filter(r => r.subject.toLowerCase().includes(subjectName.toLowerCase()));
    return list.slice(0, limit);
  },

  // Get recommendations for weak topics mapped in local memory
  getWeakTopicRecommendations(weakTopicList, limit = 3) {
    if (!weakTopicList || weakTopicList.length === 0) {
      // Return high priority hard items if list is empty
      return ROUTES.filter(r => r.difficulty === 'Hard').slice(0, limit);
    }
    
    // Fuzzy match weak text items to routes
    return ROUTES.filter(route => {
      return weakTopicList.some(weak => {
        const wLower = weak.toLowerCase();
        return route.topic.toLowerCase().includes(wLower) || 
               route.aliases.some(alias => alias.toLowerCase().includes(wLower));
      });
    }).slice(0, limit);
  },

  // Get generic trending or high-yield syllabus items
  getTrendingTopics(limit = 4) {
    // Return pyqs and hard/complex subjects first as high-yield
    return ROUTES.filter(r => r.id === 'pyqs' || r.difficulty === 'Hard' || r.id === 'cheat_sheets').slice(0, limit);
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.AI_RECOMMENDATIONS = AI_RECOMMENDATIONS;
}
