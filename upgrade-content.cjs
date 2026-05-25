const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('engineering-graphics-lab.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

$('.sec-label').each((i, el) => {
  let text = $(el).text().trim();
  
  if (text.includes('Why This') || text.includes('Why AutoCAD')) {
    $(el).text('🔥 Why This Topic Matters');
  } 
  else if (text.includes('Visual Imagination') || text.includes('Visual') || text.includes('Concept')) {
    $(el).text('🧠 Intuition First');
  }
  else if (text.includes('PYQ')) {
    $(el).text('⭐ PYQ Intelligence');
  }
  else if (text.includes('Mistakes')) {
    $(el).text('⚠️ Common Mistakes');
  }
  else if (text.includes('Quick Revision')) {
    $(el).text('⚡ Quick Revision');
  }
  else if (text.includes('Shortcut') || text.includes('True Length & Angles')) {
    $(el).text('🚀 Shortcut Tricks');
  }
  else if (text.includes('Formula') || text.includes('Matrices')) {
    $(el).text('⚡ Formula / Concept Zone');
  }
  else if (text.includes('Step-by-Step') || text.includes('Construction') || text.includes('Method') || text.includes('Development') || text.includes('Conversion') || text.includes('Cylinder') || text.includes('Cone') || text.includes('Prism')) {
    $(el).text('⚙️ Step-by-Step Learning');
  }
  else if (text.includes('Reference Planes') || text.includes('Essential') || text.includes('Workflow') || text.includes('Coordinate') || text.includes('Object Snap') || text.includes('3D in AutoCAD')) {
    $(el).text('📘 Core Concepts');
  }
  else {
    // Default matching for remaining ✏️ or ⚙️ items
    if (text.startsWith('✏️')) $(el).text('⚙️ Step-by-Step Learning');
    else if (text.startsWith('⚙️')) $(el).text('📘 Core Concepts');
  }
});

// Now let's inject missing sections at the end of each topic if they are not present:
$('.topic-content').each((i, el) => {
  const contentText = $(el).text();
  
  // Checking for Exam Focus
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
  }
});

fs.writeFileSync('engineering-graphics-lab.html', $.html());
console.log('Finished updating sections!');
