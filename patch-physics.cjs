const fs = require('fs');
const cheerio = require('cheerio');

let htmlPath = 'engineering-physics-unit-1.html';
if (!fs.existsSync(htmlPath)) htmlPath = 'physics-notes.html';
if (!fs.existsSync(htmlPath)) process.exit(0);

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const waveVisual = `
<!-- ENGI PREP HUB PHYSICS QUANTUM/WAVE SIMULATOR -->
<div class="physics-simulator" style="margin: 2rem 0; background: rgba(5,8,16,0.8); border: 1px solid var(--border, rgba(0, 168, 255, 0.2)); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="background: rgba(255,255,255,0.03); padding: 12px 20px; border-bottom: 1px solid var(--border, rgba(0, 168, 255, 0.2)); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #38bdf8;"><span style="color:#94a3b8">#</span> Interactive Wave Interference</span>
        <div style="display:flex; gap: 6px;">
            <div style="width:12px;height:12px;border-radius:50%;background:#ef4444;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#f59e0b;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#10b981;"></div>
        </div>
    </div>
    <div style="padding: 24px; text-align: center;">
        <h3 style="font-family: 'Syne', sans-serif; color: white; margin-bottom: 16px;">Superposition of Waves</h3>
        <div style="display:flex; justify-content:center; gap: 16px; margin-bottom: 16px; color: #9ab0cc; font-family: 'Inter', sans-serif; font-size: 0.85rem;">
            <span>Phase Diff (ΔΦ): <strong id="phaseVal" style="color:white;">0°</strong></span>
        </div>
        <input type="range" id="waveSlider" min="0" max="360" value="0" style="width: 80%; cursor: pointer; accent-color: #38bdf8;">
        
        <div style="position: relative; width: 100%; height: 160px; margin: 24px auto; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;">
            <svg viewBox="0 0 400 100" style="width: 100%; height: 100%; overflow: visible;" preserveAspectRatio="none">
                <path id="wave1" fill="none" stroke="rgba(239, 68, 68, 0.5)" stroke-width="2" />
                <path id="wave2" fill="none" stroke="rgba(56, 189, 248, 0.5)" stroke-width="2" />
                <path id="waveResult" fill="none" stroke="#10b981" stroke-width="3" />
            </svg>
        </div>
        <div id="interferenceType" style="margin-top: 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 8px; border-radius: 6px; display:inline-block;">Constructive Interference</div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const slider = document.getElementById('waveSlider');
        if(!slider) return;
        const phaseVal = document.getElementById('phaseVal');
        const wave1 = document.getElementById('wave1');
        const wave2 = document.getElementById('wave2');
        const waveResult = document.getElementById('waveResult');
        const interferenceType = document.getElementById('interferenceType');
        
        function drawWaves(phaseShiftDeg) {
            const phaseShift = phaseShiftDeg * (Math.PI / 180);
            let d1 = "M 0 50 ", d2 = "M 0 50 ", dRes = "M 0 50 ";
            let maxAmp = 0;
            
            for(let x=0; x<=400; x+=5) {
                const px = x * 0.05;
                const y1 = Math.sin(px) * 20;
                const y2 = Math.sin(px + phaseShift) * 20;
                const yr = y1 + y2;
                
                d1 += \`L \${x} \${50 - y1} \`;
                d2 += \`L \${x} \${50 - y2} \`;
                dRes += \`L \${x} \${50 - yr} \`;
                if (Math.abs(yr) > maxAmp) maxAmp = Math.abs(yr);
            }
            
            wave1.setAttribute('d', d1);
            wave2.setAttribute('d', d2);
            waveResult.setAttribute('d', dRes);
            
            phaseVal.textContent = phaseShiftDeg + '°';
            
            if(Math.abs(phaseShiftDeg - 0) < 10 || Math.abs(phaseShiftDeg - 360) < 10) {
                interferenceType.textContent = 'Constructive Interference (Bright)';
                interferenceType.style.color = '#10b981';
                interferenceType.style.background = 'rgba(16, 185, 129, 0.1)';
            } else if (Math.abs(phaseShiftDeg - 180) < 10) {
                interferenceType.textContent = 'Destructive Interference (Dark)';
                interferenceType.style.color = '#ef4444';
                interferenceType.style.background = 'rgba(239, 68, 68, 0.1)';
            } else {
                interferenceType.textContent = 'Partial Interference';
                interferenceType.style.color = '#f59e0b';
                interferenceType.style.background = 'rgba(245, 158, 11, 0.1)';
            }
        }
        
        drawWaves(0);
        slider.addEventListener('input', (e) => drawWaves(e.target.value));
    });
</script>
`;

if(!html.includes('physics-simulator')) {
    const target = $('section').first();
    if (target.length) {
        target.after(waveVisual);
    } else {
        $('body').append(waveVisual);
    }
    fs.writeFileSync(htmlPath, $.html());
    console.log('Wave simulator injected in physics!');
}
