import { ROUTES } from '../db/routes.js';

export const FUZZY_SEARCH = {
  // Simple edit distance algorithm 
  getEditDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  },

  // Compute similarity score between 0 and 1
  getSimilarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (longerLength - this.getEditDistance(longer, shorter)) / parseFloat(longerLength);
  },

  // Perform a full fuzzy search pass on route items
  search(query) {
    const qClean = query.toLowerCase().trim();
    if (!qClean) return [];

    const matches = ROUTES.map(item => {
      let maxScore = 0;

      // Class 1: Direct matches
      if (item.topic.toLowerCase().includes(qClean) || item.subject.toLowerCase().includes(qClean)) {
        maxScore = 0.9;
      }

      // Class 2: Fuzzy matching over aliases
      item.aliases.forEach(alias => {
        const similarity = this.getSimilarity(qClean, alias);
        if (similarity > maxScore) {
          maxScore = similarity;
        }
      });

      // Class 3: Key word intersection mapping
      let intersections = 0;
      item.keywords.forEach(word => {
        if (qClean.includes(word)) {
          intersections++;
        }
      });
      const keywordsScore = intersections / Math.max(1, item.keywords.length);
      const compositeScore = Math.max(maxScore, keywordsScore * 0.7);

      return {
        item,
        score: compositeScore
      };
    });

    return matches
      .filter(m => m.score > 0.25)
      .sort((a, b) => b.score - a.score)
      .map(m => m.item);
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.FUZZY_SEARCH = FUZZY_SEARCH;
}
