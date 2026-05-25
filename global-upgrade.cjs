const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const files = fs.readdirSync(__dirname);

// Identify subject files, either -unit-X.html or -notes.html or main subjects.
const targetFiles = files.filter(f => 
  (f.endsWith('.html') && (f.includes('-unit-') || f.includes('-notes') || f.includes('engineering') || f.includes('chemistry') || f.includes('physics') || f.includes('maths') || f.includes('programming'))) && 
  f !== 'index.html' && !f.includes('about') && !f.includes('privacy')
);

targetFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const html = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  const $ = cheerio.load(html, { decodeEntities: false });

  // 1. Upgrade Sections
  $('.sec-label').each((i, el) => {
    let text = $(el).text().trim();
    let og = text;
    
    if (text.includes('Why This') || text.includes('Why AutoCAD')) {
      $(el).text('🔥 Why This Topic Matters');
    } else if (text.includes('Visual Imagination') || text.includes('Visual') || text.includes('Concept')) {
      $(el).text('🧠 Intuition First');
    } else if (text.includes('PYQ')) {
      $(el).text('⭐ PYQ Intelligence');
    } else if (text.includes('Mistakes')) {
      $(el).text('⚠️ Common Mistakes');
    } else if (text.includes('Quick Revision')) {
      $(el).text('⚡ Quick Revision');
    } else if (text.includes('Shortcut') || text.includes('True Length')) {
      $(el).text('🚀 Shortcut Tricks');
    } else if (text.includes('Formula') || text.includes('Matrices') || text.includes('Theorem')) {
      $(el).text('⚡ Formula / Concept Zone');
    } else if (text.includes('Step-by-Step') || text.includes('Construction') || text.includes('Method') || text.includes('Development') || text.includes('Conversion')) {
      $(el).text('⚙️ Step-by-Step Learning');
    } else if (text.includes('Reference') || text.includes('Essential') || text.includes('Workflow') || text.includes('Coordinate') || text.includes('Basics')) {
      $(el).text('📘 Core Concepts');
    } else {
      if (text.startsWith('✏️')) $(el).text('⚙️ Step-by-Step Learning');
      else if (text.startsWith('⚙️')) $(el).text('📘 Core Concepts');
    }
    
    if (og !== $(el).text()) updated = true;
  });

  // Inject missing Exam focus
  $('.topic-content').each((i, el) => {
    const contentText = $(el).text();
    if (!contentText.includes('Exam Focus')) {
      $(el).append(`
        <div class="sec"><div class="sec-line"></div><div class="sec-label">🎯 Exam Focus</div><div class="sec-line"></div></div>
        <div class="exam-grid">
          <div class="exam-card">
            <div class="exam-card-num">#1</div>
            <div class="exam-card-label">High Priority</div>
          </div>
          <div class="exam-card">
            <div class="exam-card-num">#2</div>
            <div class="exam-card-label">Repeated</div>
          </div>
          <div class="exam-card">
            <div class="exam-card-num">#3</div>
            <div class="exam-card-label">Core Logic</div>
          </div>
        </div>
      `);
      updated = true;
    }
  });

  // 2. Inject AI Tools Dock
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
    color: var(--text2, #9ab0cc);
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ai-tool-btn:hover {
    background: rgba(0, 168, 255, 0.1);
    border-color: rgba(0, 168, 255, 0.3);
    color: var(--text, #e8edf7);
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
  if(typeof toggleAIProfessor === 'undefined') {
    window.toggleAIProfessor = function() {
      alert("🧠 AI Professor Initializing... Processing current context.");
    }
    window.toggleFocusMode = function() {
      document.body.classList.toggle('focus-mode-active');
      const isActive = document.body.classList.contains('focus-mode-active');
      
      if (isActive) {
        document.querySelectorAll('.sidebar, .topbar, footer, header').forEach(el => {
           if(el) el.style.opacity = '0.05';
        });
      } else {
        document.querySelectorAll('.sidebar, .topbar, footer, header').forEach(el => {
           if(el) el.style.opacity = '1';
        });
      }
    }
    window.toggleQuiz = function() {
      alert("⚡ Interactive Quiz Engine loading... Getting PYQs for current unit.");
    }
    window.toggleOneDayMode = function() {
      alert("🔥 One-Day-Before-Exam Mode ACTIVE! Highlighting only ⭐ PYQs & 🎯 Exam Focus.");
      if(typeof setMode === 'function') setMode('exam');
      else document.body.classList.toggle('exam-mode');
    }
  }
  </script>
  `;

  if (!$.html().includes('ai-tools-dock')) {
    $('body').append(floatingTools);
    updated = true;
  }

  // 3. Inject CSS upgrades
  const newCss = `
  <style id="premium-engi-prep-hub">
  /* PREMIUM ENGI PREP HUB SMOOTHNESS */
  html { scroll-padding-top: 100px; }
  .topic-block {
    background: rgba(12, 20, 40, 0.4);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .topic-block:hover {
    border-color: rgba(0, 168, 255, 0.2);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px inset rgba(255, 255, 255, 0.02);
    transform: translateY(-2px);
  }
  .topic-header { padding: 24px 28px; }
  .topic-title {
    font-size: 1.05rem; font-family: 'Syne', sans-serif; letter-spacing: -0.3px;
  }
  .sec-line { background: linear-gradient(90deg, rgba(0,168,255,0.2), transparent); }
  .sec-label {
    font-family: 'Inter', sans-serif; font-size: 0.75rem; letter-spacing: 1px;
    color: var(--accent, #00a8ff); padding: 4px 12px;
    background: rgba(0, 168, 255, 0.05); border-radius: 100px;
    border: 1px solid rgba(0, 168, 255, 0.15);
  }
  .info-card, .step-card, .rev-card, .exam-card, .box { transition: all 0.3s ease; }
  .info-card:hover, .step-card:hover, .rev-card:hover, .exam-card:hover, .box:hover {
    transform: translateY(-2px) scale(1.01);
  }
  .step-card {
    background: linear-gradient(135deg, rgba(0, 168, 255, 0.03), rgba(0, 168, 255, 0.01));
    border: 1px solid rgba(0, 168, 255, 0.08);
  }
  .hero h1 {
    background: linear-gradient(110deg, #fff 0%, #e2e8f0 30%, #38bdf8 70%, #818cf8 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    text-shadow: 0 10px 30px rgba(56, 189, 248, 0.2);
  }
  .steps-container { display: flex; flex-direction: column; gap: 8px; }
  </style>
  `;

  if (!$.html().includes('premium-engi-prep-hub')) {
    $('head').append(newCss);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, $.html());
    console.log('Upgraded:', file);
  }
});
