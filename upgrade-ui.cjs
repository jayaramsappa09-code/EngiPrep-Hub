const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('engineering-graphics-lab.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const floatingTools = `
<!-- ENGI PREP HUB AI TOOLS DOCK -->
<div class="ai-tools-dock">
  <button class="ai-tool-btn" onclick="toggleAIProfessor()">
    <span class="ai-tool-icon">🧠</span>
    <span class="ai-tool-label">AI Prof</span>
  </button>
  <button class="ai-tool-btn" onclick="toggleFocusMode()">
    <span class="ai-tool-icon">🎯</span>
    <span class="ai-tool-label">Focus</span>
  </button>
  <button class="ai-tool-btn" onclick="toggleQuiz()">
    <span class="ai-tool-icon">⚡</span>
    <span class="ai-tool-label">Quiz</span>
  </button>
  <button class="ai-tool-btn" onclick="toggleOneDayMode()" style="background: rgba(255, 71, 87, 0.1); border-color: rgba(255, 71, 87, 0.3); color: var(--red);">
    <span class="ai-tool-icon">🔥</span>
    <span class="ai-tool-label">1-Day</span>
  </button>
</div>

<style>
.ai-tools-dock {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 100px;
  display: flex;
  gap: 12px;
  padding: 8px 12px;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px inset var(--glass-border);
}

.ai-tool-btn {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 100px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text2);
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ai-tool-btn:hover {
  background: rgba(0, 168, 255, 0.1);
  border-color: rgba(0, 168, 255, 0.3);
  color: var(--text);
  transform: translateY(-2px);
}

.ai-tool-icon {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .ai-tools-dock {
    width: 90%;
    justify-content: space-between;
    padding: 12px;
    bottom: 16px;
  }
  .ai-tool-btn {
    padding: 8px 12px;
    flex-direction: column;
    gap: 4px;
    border: none;
    background: transparent;
  }
  .ai-tool-btn:hover {
    background: transparent;
    border: none;
    transform: none;
    color: var(--accent);
  }
  .ai-tool-label {
    font-size: 0.65rem;
  }
}
</style>

<script>
function toggleAIProfessor() {
  alert("🧠 AI Professor Initializing... Processing current context 'Engineering Graphics'.");
}
function toggleFocusMode() {
  document.body.classList.toggle('focus-mode-active');
  const isActive = document.body.classList.contains('focus-mode-active');
  
  if (isActive) {
    document.querySelectorAll('.sidebar, .topbar').forEach(el => el.style.opacity = '0.05');
  } else {
    document.querySelectorAll('.sidebar, .topbar').forEach(el => el.style.opacity = '1');
  }
  alert(isActive ? "🎯 Focus Mode ON: Distractions hidden." : "🎯 Focus Mode OFF.");
}
function toggleQuiz() {
  alert("⚡ Interactive Quiz Engine loading... Getting PYQs for current unit.");
}
function toggleOneDayMode() {
  alert("🔥 One-Day-Before-Exam Mode ACTIVE! Highlighting only ⭐ PYQs & 🎯 Exam Focus.");
  setMode('exam');
}
</script>
`;

if (!html.includes('ai-tools-dock')) {
  $('body').append(floatingTools);
}

fs.writeFileSync('engineering-graphics-lab.html', $.html());
console.log('AI tools dock injected.');
