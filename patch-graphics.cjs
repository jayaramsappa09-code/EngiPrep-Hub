const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('engineering-graphics-lab.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const draftingVisual = `
<!-- ENGI PREP HUB DRAFTING SIMULATOR -->
<div class="drafting-simulator" style="margin: 2rem 0; background: rgba(5,8,16,0.8); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="background: rgba(255,255,255,0.03); padding: 12px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--accent);"><span style="color:var(--text3)">$</span> Interactive Drafting Matrix</span>
        <div style="display:flex; gap: 6px;">
            <div style="width:12px;height:12px;border-radius:50%;background:#ef4444;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#f59e0b;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#10b981;"></div>
        </div>
    </div>
    <div style="padding: 24px; text-align: center;">
        <h3 style="font-family: 'Syne', sans-serif; color: white; margin-bottom: 16px;">Pentagon Construction Visualizer</h3>
        <input type="range" id="draftSlider" min="0" max="4" value="0" style="width: 80%; cursor: pointer; accent-color: var(--accent);">
        <div id="draftFeedback" style="margin-top: 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: var(--accent2); background: rgba(0,255,168,0.1); padding: 8px; border-radius: 6px; display:inline-block;">Step 0: Start</div>
        
        <div style="position: relative; width: 300px; height: 300px; margin: 24px auto; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;">
            <svg id="draftCanvas" viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible; stroke-linecap: round; stroke-linejoin: round;">
                <!-- Base Line -->
                <line id="s1" x1="30" y1="80" x2="70" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
                <!-- Perpendicular -->
                <line id="s2" x1="50" y1="80" x2="50" y2="20" stroke="rgba(255,255,255,0)" stroke-width="1.5" stroke-dasharray="4" />
                <!-- Circle -->
                <circle id="s3" cx="50" cy="50" r="30" fill="none" stroke="rgba(0,168,255,0)" stroke-width="1.5" stroke-dasharray="4" />
                <!-- Pentagon -->
                <polygon id="s4" points="50,20 78,41 67,73 33,73 22,41" fill="none" stroke="rgba(0,255,168,0)" stroke-width="2.5" />
            </svg>
        </div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const slider = document.getElementById('draftSlider');
        if(!slider) return;
        const feedback = document.getElementById('draftFeedback');
        const s1 = document.getElementById('s1');
        const s2 = document.getElementById('s2');
        const s3 = document.getElementById('s3');
        const s4 = document.getElementById('s4');
        
        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            // Reset
            s1.style.stroke = 'rgba(255,255,255,0.1)';
            s2.style.stroke = 'rgba(255,255,255,0)';
            s3.style.stroke = 'rgba(0,168,255,0)';
            s4.style.stroke = 'rgba(0,255,168,0)';
            s4.style.fill = 'none';

            if(val === 0) {
                feedback.textContent = 'Step 0: Ready';
            } else if(val === 1) {
                s1.style.stroke = 'var(--text)';
                feedback.textContent = 'Step 1: Draw Base AB';
            } else if(val === 2) {
                s1.style.stroke = 'var(--text)';
                s2.style.stroke = 'var(--text)';
                feedback.textContent = 'Step 2: Erect Perpendicular Bisector';
            } else if(val === 3) {
                s1.style.stroke = 'var(--text)';
                s2.style.stroke = 'var(--text)';
                s3.style.stroke = 'rgba(0,168,255,0.6)';
                feedback.textContent = 'Step 3: Locate Center & Circumcircle';
            } else if(val === 4) {
                s1.style.stroke = 'var(--text)';
                s2.style.stroke = 'rgba(255,255,255,0.3)';
                s3.style.stroke = 'rgba(0,168,255,0.3)';
                s4.style.stroke = 'var(--accent2)';
                s4.style.fill = 'rgba(0,255,168,0.1)';
                feedback.textContent = 'Step 4: Complete Pentagon';
                if(typeof triggerXP === 'function') triggerXP(50, 'Mastered Construction');
            }
        });
    });
</script>
`;

// Insert the drafting simulator before the steps in geom
if(!html.includes('drafting-simulator')) {
    $('#geom .steps-container').before(draftingVisual);
    // Also inject some autocad sequence in the AutoCAD section
    const autocadCode = `
<div class="cmd-block" style="background: rgba(13,17,23,0.9); border: 1px solid var(--accent); position: relative; padding: 20px;">
    <div style="font-family:'Syne',sans-serif; color:var(--accent); margin-bottom:8px;">[THE AUTOCAD TERMINAL MATRIX]</div>
    <pre style="color:#a8c7fa; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; overflow-x:auto;">
Command: LINE
Specify first point: 0,0
Specify next point or [Undo]: 100,0
Specify next point or [Undo]: @100&lt;72
Specify next point or [Close/Undo]: @100&lt;144
...
Command: LAYER
Current layer: "Hidden"
Command: LTSCALE
Enter new linetype scale factor &lt;1.0000&gt;: 0.5
    </pre>
</div>
`;
    $('#autocad .topic-content').append(autocadCode);
} 

fs.writeFileSync('engineering-graphics-lab.html', $.html());
console.log('Drafting simulator injected');
