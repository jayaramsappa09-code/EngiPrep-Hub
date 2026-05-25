import fs from "fs";

let html = fs.readFileSync("maths-1.html", "utf8");

html = html.split('<title>Maths I Top Notes – JNTUK R23 | EngiPrep Hub</title>').join('<title>Maths II Top Notes – JNTUK R23 | EngiPrep Hub</title>');
html = html.split('content="Topper-level Q&A for JNTUK R23 Engineering Mathematics I. Matrices, Eigenvalues, Calculus, and Integrals."').join('content="Topper-level Q&A for JNTUK R23 Engineering Mathematics II. Differential Equations, Vector Calculus, and Vector Integration."');
html = html.split('"name": "Maths I Top Notes – JNTUK R23 | EngiPrep Hub"').join('"name": "Maths II Top Notes – JNTUK R23 | EngiPrep Hub"');

html = html.split('/maths-1').join('/engineering-mathematics-2.html');

html = html.split('Mathematics I').join('Mathematics II');
html = html.split('Maths I').join('Maths II');
html = html.split('Advanced <br><span class="text-primary italic">Matrix & Calculus</span>').join('Advanced <br><span class="text-primary italic">Differential Equations & Vectors</span>');
html = html.split('Higher engineering math simplifies for JNTUK R23 beginners. Master the logic, not just the formulas.').join('Differential systems and multivariable fields mapped cleanly for JNTUK R23 students. Master changes, vectors, and boundaries.');

html = html.split('U1: Matrices & Eigen').join('U1: First Order DE');
html = html.split('U2: Mean Calculus').join('U2: Higher Order DE');
html = html.split('U3: Jacobians Min').join('U3: Partial DE');
html = html.split('U4: Polar Integrals').join('U4: Vector Diff');
html = html.split('U5: Special Beta').join('U5: Vector Int');


const math2_formulas = `const VAULT_FORMULAS_DB = [
  {
    unit: 1,
    title: "Linear First Order DE Integrating Factor",
    equation: "I.F. = e^(∫P dx)",
    description: "Multiplies the standard equation dy/dx + P(x)y = Q(x) to make it exactly integrable on the LHS.",
    derivationName: "Exact Form Transformation",
    formulaText: "IF = e^(∫P dx)",
    algorithmicMetric: "Complexity: Standard integral scaling limit."
  },
  {
    unit: 1,
    title: "General Solution to First Order Linear DE",
    equation: "y*(I.F.) = ∫ Q(x)*(I.F.) dx + c",
    description: "The complete algebraic solution solving the first-order differential system directly.",
    derivationName: "Product Rule Reverse Integration",
    formulaText: "y*IF = ∫ Q*IF dx + c",
    algorithmicMetric: "Transforms an algorithmic loop into direct algebraic extraction."
  },
  {
    unit: 1,
    title: "Newton's Law of Cooling",
    equation: "T(t) = Ts + (T_0 - Ts)e^(-kt)",
    description: "Demonstrates how temperature T changes over time t in surroundings Ts based on cooling constant k.",
    derivationName: "Isothermal Decay Constant",
    formulaText: "T(t) = Ts + (T0 - Ts)e^(-kt)",
    algorithmicMetric: "Defines continuous exponential temperature normalization."
  },
  {
    unit: 2,
    title: "General Solution for Auxiliary Equation",
    equation: "y = CF + PI",
    description: "Higher order linear ODE solution broken down into a transient (Complementary Function) and forced (Particular Integral) response.",
    derivationName: "Superposition Principal State",
    formulaText: "y = CF + PI",
    algorithmicMetric: "Decouples free state matrices from forced state responses."
  },
  {
    unit: 2,
    title: "Exponential Shift Rule for Particular Integrals",
    equation: "PI = [1/f(D)] e^(ax)V(x) = e^(ax) [1/f(D+a)] V(x)",
    description: "Used when the forcing function is a product of an exponential and another polynomial/trigonometric function.",
    derivationName: "Operational Coefficient Shift",
    formulaText: "PI = e^(ax) [1/f(D+a)] V(x)",
    algorithmicMetric: "Eliminates complex differentiation blocks rapidly."
  },
  {
    unit: 3,
    title: "Lagrange's Method for Quasi-Linear PDEs",
    equation: "dx/P = dy/Q = dz/R",
    description: "Converts the PDE Pp + Qq = R into a set of simultaneous ordinary differential equations to locate integral multiplier surfaces.",
    derivationName: "Orthogonal Trajectory Form",
    formulaText: "dx/P = dy/Q = dz/R",
    algorithmicMetric: "Transforms partial variable systems into isolated 2D variable flows."
  },
  {
    unit: 4,
    title: "Gradient (Max. Rate & Unit Normal)",
    equation: "∇φ = i(∂φ/∂x) + j(∂φ/∂y) + k(∂φ/∂z)",
    description: "Computes the maximum directional change vector and is used to compute the perpendicular surface normal vector n.",
    derivationName: "Orthogonal Surface Plane Metric",
    formulaText: "∇φ = i(∂φ/∂x) + j(∂φ/∂y) + k(∂φ/∂z)",
    algorithmicMetric: "Transforms scalar fields to precise surface-normal orientation vectors."
  },
  {
    unit: 4,
    title: "Divergence Vector Field Theorem",
    equation: "∇·F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z",
    description: "Calculates the total outward flux source or sink at a point. If ∇·F = 0, the field is purely solenoidal (incompressible).",
    derivationName: "Solenoidal Sink Scalar Extractor",
    formulaText: "∇·F = div(F)",
    algorithmicMetric: "Evaluates zero-divergent scalar sinks continuously."
  },
  {
    unit: 4,
    title: "Curl (Rotational Vorticity Field)",
    equation: "∇×F = Det| i, j, k ; ∂x, ∂y, ∂z ; F1, F2, F3 |",
    description: "Calculates rotation. If ∇×F = 0, the field is conservative and irrotational, implying F = ∇φ for some scalar potential.",
    derivationName: "Vector Vorticity Field Generator",
    formulaText: "∇×F = Det|i,j,k; ∂x,∂y,∂z; F1,F2,F3|",
    algorithmicMetric: "Crucial for identifying magnetic & fluid rotational bounds."
  },
  {
    unit: 5,
    title: "Green's Theorem in 2D Plane",
    equation: "∮_C (M dx + N dy) = ∬_R (∂N/∂x - ∂M/∂y) dx dy",
    description: "Converts a difficult peripheral line integral along a closed path C to a double area integral computationally bounding the 2D plane.",
    derivationName: "Double Area Boundary Conversion",
    formulaText: "∮ (Mdx+Ndy) = ∬(Nx - My) dx dy",
    algorithmicMetric: "Circa 90% optimization for geometric path calculations."
  },
  {
    unit: 5,
    title: "Stokes's Theorem (Line to 3D Surface)",
    equation: "∮_C F·dr = ∬_S (∇×F)·n dS",
    description: "Validates that the circulation around a 3D closed contour identically matches the surface integral of its cross-rotational curl.",
    derivationName: "Vortex Circulation Curl Transform",
    formulaText: "∮ F·dr = ∬ (∇×F)·n dS",
    algorithmicMetric: "Core baseline mapping boundary loops into bounded surface topologies."
  },
  {
    unit: 5,
    title: "Gauss Divergence (Surface to Volume)",
    equation: "∬_S F·n dS = ∭_V (∇·F) dV",
    description: "Translates the vector flux bursting through a volumetric sphere surface directly into a density divergence integral spanning the 3D volume.",
    derivationName: "Omnidirectional Output Flux Volumetric",
    formulaText: "∬ F·n dS = ∭ (∇·F) dV",
    algorithmicMetric: "Solves high-complexity 3D bounds by collapsing flux boundaries."
  }
];`;

const startIdxDB = html.indexOf('const VAULT_FORMULAS_DB = [');
const endIdxDB = html.indexOf('];', startIdxDB) + 2;


let newHtml = html.substring(0, startIdxDB) + math2_formulas + html.substring(endIdxDB);

const simWorkstationReplaceIdxStart = newHtml.indexOf('function injectSimWorkstation() {');
const simWorkstationReplaceIdxEnd = newHtml.indexOf('injectSimWorkstation();', simWorkstationReplaceIdxStart);

const m2_str = 'function injectSimWorkstation() {\\n' +
'    if (currentVaultTab === 1) {\\n' +
'        simContainer.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" id="sim-u1-workspace"><div><h5 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-2 font-mono">Newton\\'s Law of Cooling Engine</h5><p class="text-slate-400 text-xs font-semibold leading-relaxed mb-6">Given an initial temperature $T_0=100$, environmental temperature $T_s=25$, and cooling rate $k=0.05$. Adjust the time parameter $t$ to observe the exponential temperature decay curve in real-time.</p><div class="space-y-4 mb-6"><div><div class="flex justify-between text-[10px] text-slate-500 font-mono mb-1"><span>Time Passed (mins)</span><span class="text-white font-bold" id="slider-t-val">10</span></div><input type="range" id="slider-t" min="0" max="60" value="10" class="w-full bg-slate-900 accent-blue-500 h-1.5 rounded-lg cursor-pointer"></div></div></div><div class="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between h-full"><div class="space-y-4 font-mono text-xs"><div class="flex justify-between"><span class="text-slate-500 font-bold">Initial Temp (T₀):</span><span class="text-slate-300 font-semibold">100°C</span></div><div class="flex justify-between"><span class="text-slate-500 font-bold">Surrounding (Ts):</span><span class="text-slate-300 font-semibold">25°C</span></div><div class="flex justify-between border-t border-slate-900 pt-3"><span class="text-blue-400 font-bold">Final Temp T(t):</span><span id="out-temp-val" class="text-emerald-400 font-black text-lg">70.49°C</span></div><div class="text-[10px] text-slate-500 mt-2 font-sans font-semibold leading-relaxed border-t border-slate-900 pt-3"><b class="text-emerald-300">✓ Exponential Decay Computed:</b> T(t) = 25 + (100 - 25)e^(-0.05 * <span id="str-t-val">10</span>). The system is normalizing to room temperature optimally.</div></div></div></div>`;\\n' +
'        const tSlider = document.getElementById("slider-t");\\n' +
'        const updateCooling = () => {\\n' +
'            const t = parseFloat(tSlider.value);\\n' +
'            document.getElementById("slider-t-val").innerText = t;\\n' +
'            const Tf = 25 + (75 * Math.exp(-0.05 * t));\\n' +
'            document.getElementById("out-temp-val").innerText = Tf.toFixed(2) + "°C";\\n' +
'            document.getElementById("str-t-val").innerText = t;\\n' +
'        };\\n' +
'        tSlider.addEventListener("input", updateCooling);\\n' +
'        tSlider.addEventListener("change", () => { triggerXPClaim(15, `Simulated cooling for t=${tSlider.value} mins`); });\\n' +
'        updateCooling();\\n' +
'    } else if (currentVaultTab === 4) {\\n' +
'        simContainer.innerHTML = `<div class="p-8 text-center bg-slate-950/20 border border-slate-800 rounded-3xl"><span class="text-4xl block mb-4">🧭</span><h4 class="text-slate-200 font-black text-sm uppercase tracking-widest mb-2">Vector Divergence Analyzer</h4><p class="text-slate-400 text-xs font-semibold leading-relaxed mb-6">Calculates the fluid source sink properties in a multivariable plane.</p><div class="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl font-mono text-xs">Module initializing in cloud instance...</div></div>`;\\n' +
'    } else {\\n' +
'        simContainer.innerHTML = `<div class="p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl"><span class="text-4xl block mb-4">⚡</span><h4 class="text-slate-200 font-black text-sm uppercase tracking-widest mb-2">Interactive Processor Booting...</h4><p class="text-slate-400 text-xs font-semibold leading-relaxed">This unit\\'s interactive processor is downloading algorithmic limits. Please refer to the formula vault above in the meantime.</p></div>`;\\n' +
'    }\\n' +
'}\\n';

newHtml = newHtml.substring(0, simWorkstationReplaceIdxStart) + m2_str + newHtml.substring(simWorkstationReplaceIdxEnd);

fs.writeFileSync("engineering-mathematics-2.html", newHtml);
console.log("SUCCESS!");
