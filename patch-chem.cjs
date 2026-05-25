const fs = require('fs');
const cheerio = require('cheerio');

let htmlPath = 'chemistry-unit-1.html';
if (!fs.existsSync(htmlPath)) htmlPath = 'chemistry-topper-notes.html';
if (!fs.existsSync(htmlPath)) process.exit(0);

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const chemVisual = `
<!-- ENGI PREP HUB CHEM SIMULATOR -->
<div class="chem-simulator" style="margin: 2rem 0; background: rgba(5,8,16,0.8); border: 1px solid rgba(0, 255, 168, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="background: rgba(255,255,255,0.03); padding: 12px 20px; border-bottom: 1px solid rgba(0, 255, 168, 0.2); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #00ffa8;"><span style="color:#94a3b8">⚛</span> Molecular Orbital Visualizer</span>
        <div style="display:flex; gap: 6px;">
            <div style="width:12px;height:12px;border-radius:50%;background:#ef4444;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#f59e0b;"></div>
            <div style="width:12px;height:12px;border-radius:50%;background:#10b981;"></div>
        </div>
    </div>
    <div style="padding: 24px;">
        <h3 style="font-family: 'Syne', sans-serif; color: white; margin-bottom: 16px; text-align: center;">Bonding vs Anti-Bonding Orbitals</h3>
        
        <div style="display:flex; flex-direction:column; align-items:center; gap: 20px;">
            <div style="display:flex; align-items:center; gap:30px;">
                <!-- Atom A -->
                <div style="text-align:center;">
                    <div style="width:60px; height:60px; border-radius:50%; background:radial-gradient(circle, rgba(0,168,255,0.8) 0%, rgba(0,168,255,0) 70%); border:1px dashed #00a8ff; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">1s</div>
                    <div style="color:#9ab0cc; font-size:0.75rem; margin-top:8px;">Atom A</div>
                </div>
                
                <div style="color:var(--text3); font-size:1.2rem;">+</div>
                
                <!-- Atom B -->
                <div style="text-align:center;">
                    <div style="width:60px; height:60px; border-radius:50%; background:radial-gradient(circle, rgba(0,168,255,0.8) 0%, rgba(0,168,255,0) 70%); border:1px dashed #00a8ff; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">1s</div>
                    <div style="color:#9ab0cc; font-size:0.75rem; margin-top:8px;">Atom B</div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 16px;">
                <div style="margin-bottom: 12px; color: #9ab0cc; font-size: 0.85rem;">Select Interference Type:</div>
                <button class="chemBtn" data-type="constructive" style="margin: 0 4px; padding: 6px 12px; background: rgba(0, 255, 168, 0.1); color: #00ffa8; border: 1px solid #00ffa8; border-radius: 4px; cursor: pointer;">Constructive Add (σ1s)</button>
                <button class="chemBtn" data-type="destructive" style="margin: 0 4px; padding: 6px 12px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; border-radius: 4px; cursor: pointer;">Destructive Sub (σ*1s)</button>
            </div>
            
            <!-- Result -->
            <div style="margin-top: 20px; padding: 20px; background: rgba(0,0,0,0.5); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); width:100%; max-width: 400px; text-align:center;">
                <div id="chemResult" style="height:80px; display:flex; align-items:center; justify-content:center; transition: all 0.5s;">
                    <span style="color:#64748b; font-style:italic;">Select an operation...</span>
                </div>
                <div id="chemDesc" style="color:white; font-family:'JetBrains Mono',monospace; font-size:0.8rem; margin-top:16px;"></div>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const btns = document.querySelectorAll('.chemBtn');
        if(!btns.length) return;
        const res = document.getElementById('chemResult');
        const desc = document.getElementById('chemDesc');
        
        btns.forEach(btn => btn.addEventListener('click', (e) => {
            const type = e.target.getAttribute('data-type');
            if(type === 'constructive') {
                res.innerHTML = '<div style="width:140px; height:70px; border-radius:100px; background:radial-gradient(ellipse, rgba(0,255,168,0.8) 0%, rgba(0,255,168,0) 70%); border:1px solid #00ffa8; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">σ1s</div>';
                desc.innerHTML = '<span style="color:#00ffa8;">Bonding Molecular Orbital</span><br/><span style="color:#9ab0cc; font-size:0.7rem;">Lower Energy, Stable State. Electron density is between the nuclei.</span>';
            } else {
                res.innerHTML = '<div style="display:flex; gap:10px;"><div style="width:60px; height:60px; border-radius:30px 10px 10px 30px; background:radial-gradient(ellipse, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0) 70%); border:1px solid #ef4444;"></div><div style="width:60px; height:60px; border-radius:10px 30px 30px 10px; background:radial-gradient(ellipse, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0) 70%); border:1px solid #ef4444;"></div></div>';
                desc.innerHTML = '<span style="color:#ef4444;">Anti-Bonding Molecular Orbital (σ*)</span><br/><span style="color:#9ab0cc; font-size:0.7rem;">Higher Energy, Unstable State. Node present between the nuclei.</span>';
            }
        }));
    });
</script>
`;

if(!html.includes('chem-simulator')) {
    const target = $('section').first();
    if (target.length) {
        target.after(chemVisual);
    } else {
        $('body').append(chemVisual);
    }
    fs.writeFileSync(htmlPath, $.html());
    console.log('Chem simulator injected!');
}
