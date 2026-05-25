const fs = require('fs');
const cheerio = require('cheerio');

let htmlPath = 'c-programming-unit-1.html';
if (!fs.existsSync(htmlPath)) process.exit(0);

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const memoryVisual = `
<!-- ENGI PREP HUB MEMORY SIMULATOR -->
<div class="memory-simulator" style="margin: 2rem 0; background: rgba(5,8,16,0.9); border: 1px solid rgba(199, 125, 255, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="background: rgba(255,255,255,0.03); padding: 12px 20px; border-bottom: 1px solid rgba(199, 125, 255, 0.2); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #c77dff;"><span style="color:#94a3b8">C:\\></span> Interactive Memory Debugger</span>
        <div style="display:flex; gap: 6px;">
            <div style="width:12px;height:12px;border-radius:50%;background:#ef4444;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#f59e0b;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#10b981;"></div>
        </div>
    </div>
    <div style="padding: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="background: rgba(0,0,0,0.5); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #a8c7fa;">
            <div style="color: #64748b; margin-bottom: 8px;">// source.c</div>
            <div id="cLine1">int <span style="color:#f59e0b">x</span> = 10;</div>
            <div id="cLine2">int <span style="color:#38bdf8">y</span> = 20;</div>
            <div id="cLine3">int <span style="color:#10b981">z</span> = x + y;</div>
            <button id="stepBtn" style="margin-top: 16px; padding: 6px 16px; background: rgba(199, 125, 255, 0.2); color: #c77dff; border: 1px solid #c77dff; border-radius: 4px; cursor: pointer;">Step Over (F10)</button>
        </div>
        <div style="background: rgba(255,255,255,0.02); padding: 16px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <div style="color: #c77dff; margin-bottom: 12px; font-weight: bold;">RAM Layout</div>
            <!-- Stack Cells -->
            <div style="display:flex; flex-direction: column; gap: 6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    <span style="color:#64748b">0x7FF0</span>
                    <span style="color:#f59e0b">x</span>
                    <span id="memX" style="color:white; font-weight:bold;">???</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    <span style="color:#64748b">0x7FF4</span>
                    <span style="color:#38bdf8">y</span>
                    <span id="memY" style="color:white; font-weight:bold;">???</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    <span style="color:#64748b">0x7FF8</span>
                    <span style="color:#10b981">z</span>
                    <span id="memZ" style="color:white; font-weight:bold;">???</span>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const stepBtn = document.getElementById('stepBtn');
        if(!stepBtn) return;
        const line1 = document.getElementById('cLine1');
        const line2 = document.getElementById('cLine2');
        const line3 = document.getElementById('cLine3');
        const memX = document.getElementById('memX');
        const memY = document.getElementById('memY');
        const memZ = document.getElementById('memZ');
        
        let step = 0;
        const activeStyle = 'background: rgba(199, 125, 255, 0.2); padding: 2px 4px; border-radius: 4px; outline: 1px solid #c77dff;';
        
        stepBtn.addEventListener('click', () => {
            step++;
            line1.style.cssText = '';
            line2.style.cssText = '';
            line3.style.cssText = '';
            
            if (step === 1) {
                line1.style.cssText = activeStyle;
                memX.textContent = '10';
                memX.style.color = '#f59e0b';
            } else if (step === 2) {
                line2.style.cssText = activeStyle;
                memY.textContent = '20';
                memY.style.color = '#38bdf8';
            } else if (step === 3) {
                line3.style.cssText = activeStyle;
                memZ.textContent = '30';
                memZ.style.color = '#10b981';
                stepBtn.textContent = 'Reset Debugger';
            } else {
                step = 0;
                memX.textContent = '???';
                memY.textContent = '???';
                memZ.textContent = '???';
                memX.style.color = 'white';
                memY.style.color = 'white';
                memZ.style.color = 'white';
                stepBtn.textContent = 'Step Over (F10)';
            }
        });
    });
</script>
`;

if(!html.includes('memory-simulator')) {
    const target = $('section').first();
    if (target.length) {
        target.after(memoryVisual);
    } else {
        $('body').append(memoryVisual);
    }
    fs.writeFileSync(htmlPath, $.html());
    console.log('Memory simulator injected in programming!');
}
