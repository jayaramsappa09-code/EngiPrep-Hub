export const AVATARS = [
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    style: 'cyber',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai&backgroundColor=b6e3f4,c0aede,d1d4f9',
    gradient: 'from-blue-500 to-cyan-400',
    badge: '🤖'
  },
  {
    id: 'night-coder',
    name: 'Night Coder',
    style: 'futuristic',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=night&backgroundColor=050505,1a1a1a',
    gradient: 'from-purple-900 to-indigo-900',
    badge: '🌙'
  },
  {
    id: 'physics-master',
    name: 'Physics Master',
    style: 'minimal',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=physics&backgroundColor=ffdfbf,ffd5dc',
    gradient: 'from-amber-500 to-red-500',
    badge: '⚛️'
  },
  {
    id: 'revision-ninja',
    name: 'Revision Ninja',
    style: 'anime',
    url: 'https://api.dicebear.com/7.x/notionists/svg?seed=ninja',
    gradient: 'from-emerald-500 to-teal-500',
    badge: '🥷'
  },
  {
    id: 'circuit-wizard',
    name: 'Circuit Wizard',
    style: 'engineering',
    url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=circuit',
    gradient: 'from-yellow-400 to-orange-500',
    badge: '⚡'
  },
  {
    id: 'math-titan',
    name: 'Math Titan',
    style: 'modern',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=math',
    gradient: 'from-blue-600 to-indigo-700',
    badge: '📐'
  },
  {
    id: 'focus-expert',
    name: 'Focus Expert',
    style: 'productivity',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=focus',
    gradient: 'from-pink-500 to-rose-500',
    badge: '⏱️'
  }
];

export const BADGES = [
  { id: 'verified', name: 'Verified Contributor', icon: '🏅', color: 'text-blue-400' },
  { id: 'top-uploader', name: 'Top Uploader', icon: '🔥', color: 'text-orange-500' },
  { id: 'notes-master', name: 'Notes Master', icon: '📚', color: 'text-emerald-400' },
  { id: 'pyq-expert', name: 'PYQ Expert', icon: '⚡', color: 'text-purple-400' }
];

export const getGreeting = (name) => {
  const hour = new Date().getHours();
  let timeGreeting = "Good Morning";
  if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
  if (hour >= 17) timeGreeting = "Good Evening";

  return `${timeGreeting}, ${name || 'Future Engineer'} 👋`;
};

export const getMotivation = (progress) => {
  if (progress === 0) return "Ready to crush your engineering goals today?";
  if (progress < 30) return "Strong start! Consistency beats intensity.";
  if (progress < 70) return "You're building momentum. Stay focused!";
  return "Absolute beast mode active. You're nearly there!";
};
