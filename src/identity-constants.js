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
