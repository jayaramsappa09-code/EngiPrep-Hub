export const AI_MEMORY = {
  // Key names in localStorage
  KEYS: {
    XP: 'engiprep_user_xp',
    STREAK: 'engiprep_user_streak',
    LAST_ACTIVE: 'engiprep_last_active_date',
    WEAK_TOPICS: 'engiprep_weak_topics',
    BOOKMARKS: 'engiprep_bookmarks',
    QUIZ_SCORES: 'engiprep_quiz_scores',
    SEARCH_HISTORY: 'engiprep_search_history',
    VIEWED_UNITS: 'engiprep_viewed_units'
  },

  // Setup defaults
  init() {
    if (!localStorage.getItem(this.KEYS.XP)) {
      localStorage.setItem(this.KEYS.XP, '280');
    }
    if (!localStorage.getItem(this.KEYS.STREAK)) {
      localStorage.setItem(this.KEYS.STREAK, '3');
    }
    if (!localStorage.getItem(this.KEYS.WEAK_TOPICS)) {
      localStorage.setItem(this.KEYS.WEAK_TOPICS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.BOOKMARKS)) {
      localStorage.setItem(this.KEYS.BOOKMARKS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.QUIZ_SCORES)) {
      localStorage.setItem(this.KEYS.QUIZ_SCORES, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.SEARCH_HISTORY)) {
      localStorage.setItem(this.KEYS.SEARCH_HISTORY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.VIEWED_UNITS)) {
      localStorage.setItem(this.KEYS.VIEWED_UNITS, JSON.stringify([]));
    }

    this.updateDailyActiveStreak();
  },

  // Get current student parameters
  getXP() {
    return parseInt(localStorage.getItem(this.KEYS.XP) || '280', 10);
  },

  getStreak() {
    return parseInt(localStorage.getItem(this.KEYS.STREAK) || '3', 10);
  },

  // Apply XP gains and trigger alerts
  rewardXP(amount, reason) {
    const current = this.getXP();
    const updated = current + amount;
    localStorage.setItem(this.KEYS.XP, updated.toString());
    
    // Sync with global custom handlers if available
    if (typeof window !== 'undefined') {
      window.userGamerXP = updated;
      if (typeof window.updateGamerDashboardUX === 'function') {
        window.updateGamerDashboardUX();
      }
    }
    return updated;
  },

  // Daily Streak manager
  updateDailyActiveStreak() {
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem(this.KEYS.LAST_ACTIVE);

    if (lastActive !== today) {
      if (lastActive) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastActive === yesterday.toDateString()) {
          // Increment streak
          const current = this.getStreak();
          const updated = current + 1;
          localStorage.setItem(this.KEYS.STREAK, updated.toString());
          this.rewardXP(30, "Consecutive daily study streak bonus");
        } else {
          // Reset streak
          localStorage.setItem(this.KEYS.STREAK, '1');
        }
      }
      localStorage.setItem(this.KEYS.LAST_ACTIVE, today);
    }
  },

  // Track and query bookmarks
  toggleBookmark(topicId) {
    const bookmarks = JSON.parse(localStorage.getItem(this.KEYS.BOOKMARKS) || '[]');
    let isAdded = false;
    
    if (bookmarks.includes(topicId)) {
      const filtered = bookmarks.filter(b => b !== topicId);
      localStorage.setItem(this.KEYS.BOOKMARKS, JSON.stringify(filtered));
    } else {
      bookmarks.push(topicId);
      localStorage.setItem(this.KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      isAdded = true;
      this.rewardXP(10, `Bookmarked topic ${topicId}`);
    }
    return isAdded;
  },

  getBookmarks() {
    return JSON.parse(localStorage.getItem(this.KEYS.BOOKMARKS) || '[]');
  },

  // Weak topics log manager
  logWeakTopic(topicId, isStruggling) {
    const list = JSON.parse(localStorage.getItem(this.KEYS.WEAK_TOPICS) || '[]');
    let updated;
    if (isStruggling) {
      if (!list.includes(topicId)) {
        list.push(topicId);
      }
      updated = list;
    } else {
      updated = list.filter(id => id !== topicId);
    }
    localStorage.setItem(this.KEYS.WEAK_TOPICS, JSON.stringify(updated));
    return updated;
  },

  getWeakTopics() {
    return JSON.parse(localStorage.getItem(this.KEYS.WEAK_TOPICS) || '[]');
  },

  // Log quiz grades
  saveQuizScore(topic, score, total) {
    const scores = JSON.parse(localStorage.getItem(this.KEYS.QUIZ_SCORES) || '[]');
    scores.push({
      topic,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(this.KEYS.QUIZ_SCORES, JSON.stringify(scores));
    
    const xpReward = score * 10;
    this.rewardXP(xpReward, `Passed quiz on ${topic}`);
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.AI_MEMORY = AI_MEMORY;
  AI_MEMORY.init();
}
