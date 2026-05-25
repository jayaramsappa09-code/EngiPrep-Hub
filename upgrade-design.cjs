const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('engineering-graphics-lab.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const newCss = `
/* PREMIUM ENGI PREP HUB SMOOTHNESS */
html {
  scroll-padding-top: 100px; /* Accounts for sticky headers */
}

/* Enhancing Topic Blocks with Glassmorphism and Hover */
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

.topic-header {
  padding: 24px 28px;
}
.topic-title {
  font-size: 1.05rem;
  font-family: 'Syne', sans-serif;
  letter-spacing: -0.3px;
}

/* Enhancing the Content Flow */
.sec-line {
  background: linear-gradient(90deg, rgba(0,168,255,0.2), transparent);
}
.sec-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: var(--accent);
  padding: 4px 12px;
  background: rgba(0, 168, 255, 0.05);
  border-radius: 100px;
  border: 1px solid rgba(0, 168, 255, 0.15);
}

/* Better Card Designs */
.info-card, .step-card, .rev-card, .exam-card, .box {
  transition: all 0.3s ease;
}
.info-card:hover, .step-card:hover, .rev-card:hover, .exam-card:hover, .box:hover {
  transform: translateY(-2px) scale(1.01);
}

.step-card {
  background: linear-gradient(135deg, rgba(0, 168, 255, 0.03), rgba(0, 168, 255, 0.01));
  border: 1px solid rgba(0, 168, 255, 0.08);
}

/* Typography Upgrades for Readability */
body {
  font-size: 15.5px;
  line-height: 1.75;
  color: #d1d5db;
}

strong {
  color: #f3f4f6;
  font-weight: 600;
}

/* The hero section */
.hero h1 {
  background: linear-gradient(110deg, #fff 0%, #e2e8f0 30%, #38bdf8 70%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 30px rgba(56, 189, 248, 0.2);
}

/* Smart Active Section Tracking */
.sidebar {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.unit-btn {
  border-radius: 8px;
  margin: 2px 12px;
  width: calc(100% - 24px);
}
.unit-btn.active {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Storytelling Layout for Steps */
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
`;

if (!html.includes('PREMIUM ENGI PREP HUB SMOOTHNESS')) {
  $('style').first().append(newCss);
}

fs.writeFileSync('engineering-graphics-lab.html', $.html());
console.log('Design upgrades injected.');
