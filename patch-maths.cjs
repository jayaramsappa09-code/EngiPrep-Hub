const fs = require('fs');
const cheerio = require('cheerio');

let htmlPath = 'engineering-mathematics-unit-1.html';
if (!fs.existsSync(htmlPath)) htmlPath = 'maths-1.html';
if (!fs.existsSync(htmlPath)) process.exit(0);

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const mathVisual = `
<!-- ENGI PREP HUB MATH SIMULATOR -->
<div class="math-simulator" style="margin: 2rem 0; background: rgba(5,8,16,0.8); border: 1px solid rgba(0, 168, 255, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="background: rgba(255,255,255,0.03); padding: 12px 20px; border-bottom: 1px solid rgba(0, 168, 255, 0.2); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #00a8ff;"><span style="color:#94a3b8">∫</span> Interactive Equation Flow</span>
        <div style="display:flex; gap: 6px;">
            <div style="width:12px;height:12px;border-radius:50%;background:#ef4444;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#f59e0b;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#10b981;"></div>
        </div>
    </div>
    <div style="padding: 24px;">
        <h3 style="font-family: 'Syne', sans-serif; color: white; margin-bottom: 16px; text-align: center;">Matrix Transformation Intuition</h3>
        
        <div style="display:flex; flex-wrap: wrap; gap: 20px; justify-content: center; align-items: center;">
            <!-- Matrix Box -->
            <div style="background: rgba(0,0,0,0.5); padding: 16px; border-radius: 8px; border: 1px solid rgba(0,168,255,0.3); font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; color: white; text-align:center;">
                <div style="color: #64748b; font-size: 0.7rem; margin-bottom: 8px;">Transformation A</div>
                [ <span id="m1">1</span> <span id="m2">0</span> ]<br>
                [ <span id="m3">0</span> <span id="m4">1</span> ]
            </div>
            
            <div style="color: #00a8ff; font-size: 1.5rem;">×</div>
            
            <!-- Vector Box -->
            <div style="background: rgba(0,0,0,0.5); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,107,53,0.3); font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; color: white; text-align:center;">
                <div style="color: #64748b; font-size: 0.7rem; margin-bottom: 8px;">Vector v</div>
                [ 1 ]<br>
                [ 1 ]
            </div>
            
            <div style="color: #00a8ff; font-size: 1.5rem;">=</div>
            
            <!-- Result Box -->
            <div style="background: rgba(0,0,0,0.5); padding: 16px; border-radius: 8px; border: 1px solid #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; color: #10b981; text-align:center;">
                <div style="color: #64748b; font-size: 0.7rem; margin-bottom: 8px;">Result Av</div>
                [ <span id="r1">1</span> ]<br>
                [ <span id="r2">1</span> ]
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 24px;">
            <div style="margin-bottom: 12px; color: #9ab0cc; font-size: 0.85rem;">Modify the Transformation Matrix:</div>
            <button class="mathBtn" data-type="identity" style="margin: 0 4px; padding: 6px 12px; background: rgba(0, 168, 255, 0.1); color: #00a8ff; border: 1px solid #00a8ff; border-radius: 4px; cursor: pointer;">Identity</button>
            <button class="mathBtn" data-type="scale" style="margin: 0 4px; padding: 6px 12px; background: rgba(0, 168, 255, 0.1); color: #00a8ff; border: 1px solid #00a8ff; border-radius: 4px; cursor: pointer;">Scale (x2)</button>
            <button class="mathBtn" data-type="shear" style="margin: 0 4px; padding: 6px 12px; background: rgba(0, 168, 255, 0.1); color: #00a8ff; border: 1px solid #00a8ff; border-radius: 4px; cursor: pointer;">Shear (x)</button>
            <button class="mathBtn" data-type="eigen" style="margin: 0 4px; padding: 6px 12px; background: rgba(255, 107, 53, 0.1); color: #ff6b35; border: 1px solid #ff6b35; border-radius: 4px; cursor: pointer;">Show Eigen Behavior</button>
        </div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const btns = document.querySelectorAll('.mathBtn');
        if(!btns.length) return;
        const m1 = document.getElementById('m1');
        const m2 = document.getElementById('m2');
        const m3 = document.getElementById('m3');
        const m4 = document.getElementById('m4');
        const r1 = document.getElementById('r1');
        const r2 = document.getElementById('r2');
        
        const vx = 1, vy = 1;
        
        btns.forEach(btn => btn.addEventListener('click', (e) => {
            const type = e.target.getAttribute('data-type');
            let a = 1, b = 0, c = 0, d = 1;
            
            if(type === 'identity') {
                a=1; b=0; c=0; d=1;
            } else if(type === 'scale') {
                a=2; b=0; c=0; d=2;
            } else if(type === 'shear') {
                a=1; b=1; c=0; d=1;
            } else if(type === 'eigen') {
                a=3; b=0; c=0; d=3; 
                alert("Notice how the resulting vector is just a scaled version of the input vector. This makes [1,1] an Eigenvector of this transform!");
            }
            
            m1.textContent = a; m2.textContent = b;
            m3.textContent = c; m4.textContent = d;
            
            r1.textContent = (a * vx) + (b * vy);
            r2.textContent = (c * vx) + (d * vy);
            
            r1.style.animation = 'none';
            r2.style.animation = 'none';
            setTimeout(() => {
                r1.style.animation = 'pulse 0.5s';
                r2.style.animation = 'pulse 0.5s';
            }, 10);
        }));
    });
</script>
`;

if(!html.includes('math-simulator')) {
    const target = $('section').first();
    if (target.length) {
        target.after(mathVisual);
    } else {
        $('body').append(mathVisual);
    }
    fs.writeFileSync(htmlPath, $.html());
    console.log('Math simulator injected!');
}
