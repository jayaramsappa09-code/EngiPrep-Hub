import fs from 'fs';

const physicsMassive = `
            <div class="space-y-12 text-slate-800 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 1</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Wave Optics: Interference & Diffraction Theory</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1.1 Theoretical Foundation of Light Superposition</h3>
                    <p class="mb-4">Wave optics (or physical optics) is the critical branch of physics that studies properties like interference, diffraction, polarization, and other light propagation phenomena where the ray approximations of geometric optics fail. At its physical core, wave optics is grounded on the <strong>Principle of Superposition</strong>: when two or more wave fields occupy the same spatial coordinates at the same time, the resultant wave displacement at any specific coordinate point is the exact vector sum of the individual displacements of all overlapping waves.</p>
                    <p class="mb-4">To achieve a sustained, observable, and stable interference pattern, the incoming light fields must be strictly <strong>coherent</strong>. Two light sources are said to be coherent if they emit monochromatic light waves of the exact same frequency, wavelength, and maintain a constant, time-invariant phase relationship over time. Since standard physical light sources (such as incandescent light bulbs or typical LEDs) emit light waves via random, discrete, and thermal atomic transitions, they cannot maintain a constant phase relation. Coherence is typically achieved in laboratory layouts using one of two primary methods:</p>
                    <ul class="list-disc pl-6 space-y-2 mb-6">
                        <li><strong>Division of Wavefront:</strong> A single continuous wavefront is divided spatially into two or more secondary wavefronts, which are then brought together to interfere. Examples include Young's Double Slit Experiment, Fresnel's Biprisms, and Lloyd's Single Mirror.</li>
                        <li><strong>Division of Amplitude:</strong> The amplitude of a single incoming wave is divided into two or more parts by reflection or refraction, which follow different optical paths before superimposing. Examples include thin film interference, Newton's Rings, and the Michelson Interferometer.</li>
                    </ul>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.2 Quantitative Formulation of Newton's Rings</h3>
                    <p class="mb-4">Newton's Rings are circular interference fringes formed when a plano-convex lens of large radius of curvature (R) is placed on a flat glass plate. The wedge-shaped air film formed between the two glass surfaces increases in thickness from the center of contact outwards.</p>
                    <p class="mb-4">When monochromatic light of wavelength &lambda; is incident normally on the plano-convex lens, a portion of the light is reflected from the lower bounding surface of the lens (denser to rarer transition), and another portion is reflected from the upper surface of the flat glass plate (rarer to denser transition). Under Stokes' treatment, the light wave reflected from the rarer-to-denser path experiences an abrupt phase change of &pi; radians, equivalent to an optical path path difference of &lambda;/2.</p>
                    <p class="mb-4">The total net optical path difference between the two interfering rays can be written as:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &Delta; = 2&mu;t cos(r) + &lambda;/2
                    </div>
                    <p class="mb-4">For normal incidence, the angle of refraction r = 0, meaning cos(r) = 1. For an air film, the refractive index &mu; = 1. The path difference simplifies to:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &Delta; = 2t + &lambda;/2
                    </div>
                    <h4 class="text-md font-bold mt-4 mb-2">Conditions for Dark and Bright Rings:</h4>
                    <p class="mb-4"><strong>1. For Dark Rings (Destructive Interference):</strong> The path difference must be an odd multiple of half-wavelengths:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        2t + &lambda;/2 = (2n + 1)&lambda;/2 &rArr; 2t = n&lambda; (where n = 0, 1, 2, 3...)
                    </div>
                    <p class="mb-4"><strong>2. For Bright Rings (Constructive Interference):</strong> The path difference must be an even multiple of half-wavelengths (or integer multiples of &lambda;):</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        2t + &lambda;/2 = n&lambda; &rArr; 2t = (2n - 1)&lambda;/2
                    </div>

                    <h4 class="text-md font-bold mt-6 mb-2">Derivation of Ring Diameters:</h4>
                    <p class="mb-4">From the geometry of the plano-convex lens of radius of curvature R resting on the glass plate, at a distance 'r_n' from the point of contact where the air film thickness is 't_n', the Pythagorean relationship states:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        R^2 = r_n^2 + (R - t_n)^2 &rArr; R^2 = r_n^2 + R^2 + t_n^2 - 2R·t_n
                    </div>
                    <p class="mb-4">Since the film thickness 't_n' is extremely small compared to the physical lens radius R, the term t_n^2 can be safely neglected. This leaves:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        2R·t_n = r_n^2 &rArr; 2t_n = r_n^2 / R
                    </div>
                    <p class="mb-4">By replacing 2t with r_n^2 / R in the interference equations, we get:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-sm my-4">
                        <strong>Dark Ring Diameter:</strong><br>
                        r_n^2 / R = n&lambda; &rArr; r_n^2 = n&lambda;R<br>
                        Since Diameter D_n = 2·r_n, then D_n^2 = 4·r_n^2 &rArr; <strong>D_n^2 = 4n&lambda;R</strong>
                    </div>
                    <p class="mb-4">Since D_n is proportional to &radic;n, the spacing between consecutive dark rings decreases as the order n increases. The rings become increasingly crowded near the outer boundaries of the lens.</p>

                    <h4 class="text-md font-bold mt-6 mb-2">Experiment Application: Measuring Refractive Index of a Liquid</h4>
                    <p class="mb-4">To measure the refractive index (&mu;_liquid) of a transparent liquid, the liquid is introduced between the plano-convex lens and the glass plate. The optical path difference changes, modifying the dark ring diameter equation to: <strong>D_n^2 = 4n&lambda;R / &mu;</strong>. By measuring the ring diameters in both air (reference) and liquid medium, the refractive index can be determined as:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &mu;_liquid = (D_n_air^2) / (D_n_liquid^2)
                    </div>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 2</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Quantum Mechanics & Particle-in-a-Box Derivations</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">2.1 Transition from Classical to Quantum Systems</h3>
                    <p class="mb-4">Classical mechanisms fail to explain physical phenomena on atomic scales, such as blackbody radiation spectrum distributions, the photoelectric effect, and the stability of atomic structures. Max Planck initiated quantum theory by proposing that energy is exchangeable only in discrete, integer packets called <strong>Quanta</strong>, with energy <strong>E = h&nu;</strong>.</p>
                    <p class="mb-4">Louis de Broglie expanded this by suggesting that all moving matter (including electrons, protons, and macroscopic bodies) possesses a dual wave-particle nature. The de Broglie wavelength (&lambda;) of a particle of mass m moving with velocity v is given by:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &lambda; = h / p = h / (m·v)
                    </div>
                    <p class="mb-4">For an electron accelerated through an electric potential of V volts, the kinetic energy earned is E = eV = p^2 / 2m. Therefore, de Broglie's particle wavelength accelerates to:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &lambda;_electron = h / &radic;(2m_e·e·V) &asymp; 12.27 / &radic;V &Aring;
                    </div>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">2.2 Derivation of Schrödinger's Time-Independent Wave Equation</h3>
                    <p class="mb-4">To model matter waves mathematically, consider a particle moving continuously in the positive x-direction. The wave displacement can be represented by a wave function &psi;(x, t):</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &psi;(x, t) = &psi;_0·e^(-i&omega;(t - x/v))
                    </div>
                    <p class="mb-4">Differentiating with respect to x twice and substituting de Broglie properties, the general 1D state can be isolated. Alternatively, start from the classical 1D wave equation:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        d^2&psi;/dx^2 + k^2&psi; = 0
                    </div>
                    <p class="mb-4">Since wave number <strong>k = 2&pi;/&lambda;</strong>, substituting &lambda; = h/p yields:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        d^2&psi;/dx^2 + (4&pi;^2 / &lambda;^2)&psi; = 0 &rArr; d^2&psi;/dx^2 + (4&pi;^2·p^2 / h^2)&psi; = 0
                    </div>
                    <p class="mb-4">The total energy E of the particle is the sum of its kinetic energy (p^2 / 2m) and potential energy V(x):</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        E = p^2 / 2m + V &rArr; p^2 = 2m(E - V)
                    </div>
                    <p class="mb-4">Substituting the momentum term back into the differential wave equation gives the <strong>Time-Independent Schrödinger Equation (1D)</strong>:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4 font-bold text-blue-600 dark:text-blue-400 text-lg">
                        d^2&psi;/dx^2 + (8&pi;^2·m / h^2) (E - V) &psi; = 0
                    </div>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">2.3 Particle in a 1D Infinite Potential Box (Infinite Well)</h3>
                    <p class="mb-4">Consider a free particle of mass m locked inside an impenetrable 1-dimensional box of width L. The potential energy profile of this system is defined as:</p>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Inside the box (0 &lt; x &lt; L):</strong> Potential energy V(x) = 0.</li>
                        <li><strong>Outside the box (x &le; 0 and x &ge; L):</strong> Potential energy V(x) = &infin;.</li>
                    </ul>
                    <p class="mb-4">Since the potential energy outside is infinite, the probability of finding the particle there is zero, meaning the wave function &psi;(x) = 0 at the boundaries x &le; 0 and x &ge; L.</p>
                    <p class="mb-4">Inside the box (where V = 0), the Schrödinger equation simplifies to:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        d^2&psi;/dx^2 + (8&pi;^2·m·E / h^2)&psi; = 0 &rArr; d^2&psi;/dx^2 + k^2&psi; = 0
                    </div>
                    <p class="mb-4">Where <strong>k^2 = 8&pi;^2·m·E / h^2</strong>. The general solution for this second-order differential equation is:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &psi;(x) = A cos(kx) + B sin(kx)
                    </div>
                    <h4 class="text-md font-bold mt-4 mb-2">Applying Boundary Conditions:</h4>
                    <p class="mb-4"><strong>Boundary Condition 1:</strong> At x = 0, &psi;(0) = 0.</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl my-2">
                        &psi;(0) = A cos(0) + B sin(0) = 0 &rArr; A(1) + B(0) = 0 &rArr; <strong>A = 0</strong>
                    </div>
                    <p class="mb-4">This simplifies the wave function to: <strong>&psi;(x) = B sin(kx)</strong>.</p>
                    <p class="mb-4"><strong>Boundary Condition 2:</strong> At x = L, &psi;(L) = 0.</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl my-2">
                        &psi;(L) = B sin(kL) = 0
                    </div>
                    <p class="mb-4">Since B cannot be zero (otherwise the wave function would be zero everywhere, meaning no particle exists in the box), we must have:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        sin(kL) = 0 &rArr; kL = n&pi; &rArr; <strong>k = n&pi; / L</strong> (where n = 1, 2, 3...)
                    </div>
                    <p class="mb-4">This demonstrates that the wave vector k is **quantized**. We can write the expressions for quantized energy E_n and normalized wave functions &psi;_n(x):</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl space-y-4 my-6">
                        <p class="font-semibold text-blue-600 dark:text-blue-400">1. Quantized Energy Levels (E_n):</p>
                        <div class="font-mono text-center">
                            E_n = h^2·k^2 / (8&pi;^2·m) = n^2·h^2 / (8m·L^2)
                        </div>
                        <p class="text-sm">This shows that a particle confined in a box cannot have zero energy. The class minimum energy state (ground state, n = 1) is non-zero, given by: E_1 = h^2 / (8m·L^2).</p>
                        
                        <p class="font-semibold text-blue-600 dark:text-blue-400">2. Normalizing the Wave Function (&psi;_n):</p>
                        <div class="font-sans text-sm">
                            Under probability normalization, the integral of absolute &psi;^2 over the box must equal 1:<br>
                            &int; (from 0 to L) B^2 sin^2(n&pi;x / L) dx = 1 &rArr; B^2 * (L/2) = 1 &rArr; <strong>B = &radic;(2/L)</strong>
                        </div>
                        <p class="font-semibold text-blue-600 dark:text-blue-400">Final Wave Function Equation:</p>
                        <div class="font-mono text-center text-lg">
                            &psi;_n(x) = &radic;(2/L) * sin(n&pi;x / L)
                        </div>
                    </div>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 3</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Semiconductor Physics & Hall Coordinate Systems</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">3.1 Charge Transport and Fermi Energy Distributions</h3>
                    <p class="mb-4">In solid-state physics, the electrical properties of semiconductors are governed by carrier concentration profiles. The classification of materials relies on the energy bandgap (E_g) separating the valence and conduction bands. The probability of an electron occupying an energy state E at temperature T is defined by the <strong>Fermi-Dirac Distribution Function</strong>:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        f(E) = 1 / [1 + e^((E - E_F) / k·T)]
                    </div>
                    <p class="mb-4">Where E_F is the Fermi Energy level. At absolute zero (T = 0 K):</p>
                    <ul class="list-disc pl-6 mb-4">
                        <li>For states with E &lt; E_F: f(E) = 1. This means all lower states are fully occupied.</li>
                        <li>For states with E &gt; E_F: f(E) = 0. This means all higher states are empty.</li>
                    </ul>
                    <p class="mb-4">In an intrinsic semiconductor, the Fermi level E_F lies exactly in the middle of the bandgap: <strong>E_F = (E_c + E_v) / 2</strong>. In n-type semiconductors, donor impurities shift the Fermi level upwards closer to E_c, while in p-type semiconductors, acceptor impurities pull it downwards closer to E_v.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">3.2 Complete Derivation of the Hall Effect</h3>
                    <p class="mb-4">The Hall Effect is the generation of a transverse electric field in a current-carrying semiconductor when placed within a perpendicular magnetic field. This allows engineers to determine the carrier type (n-type vs p-type) and calculate carrier concentration and mobility.</p>
                    <p class="mb-4">Consider a rectangular semiconductor slab of width w and thickness d. Let a current I flow along the positive x-axis, and an external magnetic field B be applied perpendicular along the positive z-axis.</p>
                    <p class="mb-4">Mobile charge carriers (electrons or holes) moving along the current path experience a magnetic deflection force perpendicular to both the current and magnetic field directions, as defined by the **Lorentz Force**: <strong>F_magnetic = q(v_d &times; B)</strong>, where v_d is the drift velocity of the carriers.</p>
                    <p class="mb-4">For electrons (charge q = -e) moving with drift velocity v_d along the negative x-direction, the magnetic force acts along the negative y-axis:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4 font-semibold">
                        F_y = -e·v_d·B_z
                    </div>
                    <p class="mb-4">This Lorentz force deflects electrons toward the lower surface, causing a negative charge accumulation there and leaving a positive charge accumulation on the upper surface. This separation of charge sets up a transverse electric field (Hall Field, E_H) along the y-axis, which exerts an opposing electrostatic force on the moving electrons:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        F_electrostatic = -e·E_H
                    </div>
                    <p class="mb-4">Under steady-state equilibrium, the transverse electric force balances the magnetic deflection force:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        -e·E_H = -e·v_d·B_z &rArr; <strong>E_H = v_d·B_z</strong>
                    </div>
                    <p class="mb-4">The current density J_x through the semiconductor is given by: <strong>J_x = n·e·v_d</strong> (where n is the carrier concentration). Expressing drift velocity as v_d = J_x / (n·e), we can substitute this into the electric field equation to get:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        E_H = J_x·B_z / (n·e)
                    </div>
                    <p class="mb-4">Setting the **Hall Coefficient** <strong>R_H = 1 / (n·e)</strong>, the equation for the Hall field becomes:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        E_H = R_H·J_x·B_z
                    </div>
                    <p class="mb-4">By measuring the transverse Hall Voltage (V_H) across the sample width w, where V_H = E_H·w, we can express the current density J_x as I_x / (w·d). Substituting these values yields the **Hall Voltage equation**:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl font-mono text-center text-lg text-blue-600 dark:text-blue-400">
                        V_H = R_H·I_x·B_z / d
                    </div>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 4</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Lasers & Acceptance Angle Derivations in Fibers</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">4.1 Quantum Emission dynamics & Einstein Coefficients</h3>
                    <p class="mb-4">The interaction of radiation with matter is governed by three quantum processes: Induced Absorption, Spontaneous Emission, and Stimulated Emission. Albert Einstein established the mathematical relationships between these transitions using probability coefficients.</p>
                    <p class="mb-4">Let N_1 and N_2 be the population densities of the ground state E_1 and excited state E_2. At thermal equilibrium, the ratio of spontaneous to stimulated emission is expressed via the Einstein transition coefficients A_21 and B_21:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        A_21 / B_21 = 8&pi;·h·&nu;^3 / c^3
                    </div>
                    <p class="mb-4">To achieve laser action, we must establish a state of <strong>Population Inversion</strong>, where the population of the upper excited level N_2 is greater than the lower level N_1. Since thermal distributions naturally favor the ground state (N_1 &gt;&gt; N_2), external energy (pumping) is required to shift the population distribution and achieve coherent light amplification.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">4.2 Optical Fiber Acceptance Angle & Numerical Aperture</h3>
                    <p class="mb-4">An optical fiber consists of a high refractive index core (n_1) surrounded by a lower index cladding (n_2). Light is guided through the fiber core using the principle of <strong>Total Internal Reflection (TIR)</strong>.</p>
                    <p class="mb-4">Let us derive the maximum angle at which a light ray can enter the fiber core from air (refractive index n_0 = 1) and remain guided. This maximum angle is called the **Acceptance Angle (&alpha;_max)**.</p>
                    <p class="mb-4">Let a light ray be incident at an angle &alpha; to the fiber axis at the core entry face. The ray refracts into the core at an angle &theta;_r. The ray travels through the core and strikes the core-cladding interface at an angle &phi; relative to the normal.</p>
                    <p class="mb-4 font-bold">Mathematical Core Proof (Acceptance Angle Limit):</p>
                    <p class="mb-4">For total internal reflection to occur at the core-cladding interface, the angle of incidence &phi; must be greater than or equal to the critical angle &phi;_c, where:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        sin(&phi;_c) = n_2 / n_1
                    </div>
                    <p class="mb-4">From the right-angled triangle formed inside the core by the ray path, the angles are related by: <strong>&theta;_r = 90&deg; - &phi;</strong>. Taking the sine of both sides:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        sin(&theta;_r) = sin(90&deg; - &phi;) = cos(&phi;) = &radic;(1 - sin^2(&phi;))
                    </div>
                    <p class="mb-4">For the limiting case where &phi; is exactly equal to the critical angle &phi;_c:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4 font-semibold">
                        sin(&theta;_r) = &radic;(1 - (n_2 / n_1)^2) = &radic;(n_1^2 - n_2^2) / n_1
                    </div>
                    <p class="mb-4">Applying Snell's Law at the core entry face (air-to-core transition):</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        n_0·sin(&alpha;_max) = n_1·sin(&theta;_r)
                    </div>
                    <p class="mb-4">Substituting the expression for sin(&theta;_r) into Snell's Law (with n_0 = 1 for air) gives:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4 font-bold text-blue-600 dark:text-blue-400">
                        sin(&alpha;_max) = n_1·[&radic;(n_1^2 - n_2^2) / n_1] = &radic;(n_1^2 - n_2^2)
                    </div>
                    <p class="mb-4">The term **&radic;(n_1^2 - n_2^2)** defines the **Numerical Aperture (NA)** of the fiber, representing its light-gathering efficiency:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4 font-bold text-lg">
                        Numerical Aperture (NA) = &radic;(n_1^2 - n_2^2)<br>
                        Acceptance Angle (&alpha;_max) = sin^-1(NA)
                    </div>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 5</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Polarization & Superconductivity</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">5.1 Wave Polarizations & Calcite Retardations</h3>
                    <p class="mb-4">Light is a transverse electromagnetic wave where the electric field vector vibrates in all planes perpendicular to the direction of propagation. In **linearly polarized** light, the electric field oscillations are restricted to a single plane.</p>
                    <p class="mb-4">Polarization can be achieved through double refraction in anisotropic crystals like calcite. These crystals split an unpolarized incident ray into two linearly polarized rays with perpendicular polarization directions:</p>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Ordinary Ray (O-ray):</strong> Follows standard refraction laws, maintaining a constant refractive index n_o in all directions inside the crystal.</li>
                        <li><strong>Extraordinary Ray (E-ray):</strong> Refractive index n_e varies with propagation direction. It does not follow Snell's Law.</li>
                    </ul>
                    <p class="mb-4">Quarter-wave and half-wave phase retarder sheets are constructed from double-refraction materials by cutting them parallel to the optic axis. The path difference introduced between the E-ray and O-ray over sheet thickness d is given by:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &Delta; = (n_o - n_e)·d (for positive crystals, where n_o &gt; n_e)
                    </div>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Quarter Wave Plate (QWP):</strong> Introduces a path difference of &lambda;/4 (or phase shift of &pi;/2). The required thickness is: <strong>d = &lambda; / [4(n_o - n_e)]</strong>.</li>
                        <li><strong>Half Wave Plate (HWP):</strong> Introduces a path difference of &lambda;/2 (or phase shift of &pi;). The required thickness is: <strong>d = &lambda; / [2(n_o - n_e)]</strong>.</li>
                    </ul>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-105 mt-8 mb-3">5.2 Solid State Superconductivity & Cryogenic Fields</h3>
                    <p class="mb-4">Superconductivity is a state of zero electrical resistance and complete magnetic field expulsion observed in specific materials when cooled below a characteristic critical temperature T_c. This phenomenon is distinct from a simple ideal conductor with zero resistivity.</p>
                    <p class="mb-4">Superconductors exhibit the **Meissner Effect**: when cooled below T_c in an external magnetic field, they actively expel the magnetic flux lines so that the internal magnetic field B = 0. This is achieved by generating surface screening currents that create an opposing magnetic field of equal strength inside the material.</p>
                    <p class="mb-4">Superconductors are categorized into two types based on how they transition in an increasing external magnetic field:</p>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Type-I Superconductors (Soft):</strong> Exhibit a sudden loss of superconductivity at a single critical magnetic field H_c. They display perfect diamagnetism up to this threshold.</li>
                        <li><strong>Type-II Superconductors (Hard):</strong> Exhibit a gradual transition over two critical magnetic fields, H_c1 and H_c2. Between these values, the material enters a **mixed state** (or vortex state) where magnetic flux partially penetrates the bulk volume through quantized flux tubes.</li>
                    </ul>

                    <h4 class="text-md font-bold mt-6 mb-2">Exemplary Review Questions & Quick Prep Answers:</h4>
                    <div class="space-y-4">
                        <div class="border-l-4 border-blue-600 pl-4 py-1 bg-slate-50 dark:bg-slate-900 rounded-r-lg">
                            <p class="font-bold">Q1. Why is the center of Newton's Rings dark in reflected light?</p>
                            <p class="text-sm">At the central point of contact, the air film thickness t = 0. The optical path difference simplifies to &lambda;/2 due to Stokes' phase shift from the lower glass plate reflection, resulting in destructive interference and a dark central spot.</p>
                        </div>
                        <div class="border-l-4 border-blue-600 pl-4 py-1 bg-slate-50 dark:bg-slate-900 rounded-r-lg">
                            <p class="font-bold">Q2. What is the significance of the Kronig-Penney periodic potential model?</p>
                            <p class="text-sm">It solves Schrödinger's equation for a periodic potential to explain electron behavior in crystal lattices, demonstrating that electrons are restricted to allowed energy bands separated by forbidden gaps.</p>
                        </div>
                    </div>
                </section>
            </div>
`;

const chemistryMassive = `
            <div class="space-y-12 text-slate-800 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 dark:bg-slate-900 px-3 py-1 rounded">Module 1</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Quantum Chemistry, MOT & CFT Bonding Postulates</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1.1 Molecular Orbital Theory (MOT) and LCAO Approximations</h3>
                    <p class="mb-4">Molecular Orbital Theory (MOT) provides a comprehensive quantum mechanical explanation of chemical bonding, describing how atomic orbitals overlap to form molecular orbitals distributed over the entire molecule. Unlike valence bond theory, which assumes localized electron pairs between adjacent atoms, MOT treats electron states as delocalized wave fields spanning multiple atomic nuclei. This is modeled using the <strong>Linear Combination of Atomic Orbitals (LCAO)</strong> approximation.</p>
                    <p class="mb-4">Consider two identical atoms A and B, described by wave functions &psi;_A and &psi;_B. When they combine, their wave functions can superimpose constructively or destructively:</p>
                    <ul class="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Bonding Molecular Orbital (&psi;_b):</strong> Formed by constructive superposition, which increases electron density between the nuclei. It is lower in energy than the individual atomic orbitals: <strong>&psi;_b = &psi;_A + &psi;_B</strong>. The energy is stabilized due to strong electrostatic attraction of both nuclei to the accumulated electron density.</li>
                        <li><strong>Antibonding Molecular Orbital (&psi;_a):</strong> Formed by destructive superposition, creating a node of zero electron density between the nuclei. It is higher in energy than the individual atomic orbitals: <strong>&psi;_a = &psi;_A - &psi;_B</strong>. The localized electrostatic repulsion between mutually uncovered positive nuclei drives destabilization.</li>
                    </ul>
                    <p class="mb-4">The **Bond Order** is a measure of bond strength, calculated from the electron configuration of the molecule:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        Bond Order = 0.5 &times; (Number of bonding electrons (N_b) - Number of antibonding electrons (N_a))
                    </div>
                    <p class="mb-4">A positive, non-zero bond order represents a thermodynamically stable molecule, with higher numbers indicating stronger bonds and shorter inter-atomic distances.</p>

                    <h4 class="text-md font-bold mt-4 mb-2">Molecular Orbital Configuration & Splitting for Diatomic Elements:</h4>
                    <p class="mb-4">For light homonuclear diatomic molecules (Z &le; 7, e.g., B_2, C_2, N_2), the s-p orbital mixing shifts the relative energy of the &sigma;_2p_z orbital above the &pi;_2p_x and &pi;_2p_y orbitals. For heavier molecules (Z &gt; 7, e.g., O_2, F_2), s-p mixing is negligible, and the energy level sequence is:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono text-xs my-4 overflow-x-auto">
                        &sigma;_1s &lt; &sigma;*_1s &lt; &sigma;_2s &lt; &sigma;*_2s &lt; &sigma;_2p_z &lt; (&pi;_2p_x = &pi;_2p_y) &lt; (&pi;*_2p_x = &pi;*_2p_y) &lt; &sigma;*_2p_z
                    </div>
                    <p class="mb-4">Applying this configuration to the **Oxygen Molecule (O_2)** with 16 electrons shows that the two highest-energy electrons occupy the degenerate &pi;*_2p_x and &pi;*_2p_y antibonding orbitals singly with parallel spins, explaining the paramagnetic behavior of oxygen.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.2 Crystal Field Theory (CFT) in d-Metal Complexes</h3>
                    <p class="mb-4">Crystal Field Theory (CFT) models transition metal complexes by treating the interactions between metal d-orbitals and incoming ligands as purely electrostatic. Ligands are treated as negative point charges that create an electric field around the metal ion, lifting the degeneracy of its five d-orbitals.</p>
                    <p class="mb-4">When ligands approach a metal ion to form an **Octahedral Complex**, the d-orbitals lying directly along the coordinate axes (d_x^2-y^2 and d_z^2, called the <strong>e_g group</strong>) experience stronger electrostatic repulsion than the orbitals lying between the axes (d_xy, d_yz, d_zx, called the <strong>t_2g group</strong>).</p>
                    <p class="mb-4">This splits the d-orbitals into two distinct energy levels separated by the **Crystal Field Splitting Energy (10 Dq or &Delta;_o)**:</p>
                    <ul class="list-disc pl-6 mb-4 space-y-2">
                        <li>The three lower-energy **t_2g** orbitals are stabilized by -0.4&Delta;_o (-4 Dq) relative to the barycenter.</li>
                        <li>The two higher-energy **e_g** orbitals are destabilized by +0.6&Delta;_o (+6 Dq) relative to the barycenter.</li>
                    </ul>
                    <p class="mb-4">The magnitude of &Delta;_o determines whether the complex will be high-spin or low-spin. It depends on ligand strength as defined by the **Spectrochemical Series**:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono text-sm my-4 overflow-x-auto">
                        I- &lt; Br- &lt; S^2- &lt; Cl- &lt; F- &lt; OH- &lt; H_2O &lt; NH_3 &lt; en &lt; CN- &lt; CO (Increasing &Delta;_o)
                    </div>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 dark:bg-slate-900 px-3 py-1 rounded">Module 2</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Polymers, Elastomers & Modern Engineering Materials</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">2.1 Polymer Classification and Plastics Engineering</h3>
                    <p class="mb-4">Polymers are high-molecular-weight macromolecular compounds formed by linking repeating monomer units through covalent bonds. For industrial and structural engineering applications, plastics are categorized by their thermal mechanical behavior under temperature variations:</p>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><strong>Thermoplastics:</strong> Linear or branched polymers that soften on heating and harden on cooling. This process is fully reversible because the chains are held together by weak intermolecular Van der Waals forces that can be disrupted by thermal energy. Examples include PVC, polyethylene, polystyrene, and Teflon (Polytetrafluoroethylene).</li>
                        <li><strong>Thermosetting Plastics:</strong> Highly cross-linked 3-dimensional network polymers that undergo permanent chemical cross-linking upon heating. They cannot be re-softened or molded because heating forms strong covalent cross-links that cannot be broken without decomposing the material. Examples include Bakelite, urea-formaldehyde, and epoxy resins.</li>
                    </ul>
                    <p class="mb-4"><strong>Bakelite Synthesis:</strong> Bakelite (phenol-formaldehyde resin) is produced through condensation polymerization of phenol with formaldehyde in the presence of an acid or base catalyst. The reaction initially forms a linear polymer (Novolac), which cross-links under heat and pressure with hexamethylene-tetramine (hexamine) to yield the hard, high-strength Bakelite network.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">2.2 Nanotechnology Synthesis Methods</h3>
                    <p class="mb-4">Nanotechnology is the manipulation of matter on atomic and molecular scales (usually 1-100 nm). At this scale, materials exhibit unique quantum confinement effects and high surface-to-volume ratios. Key synthesis routes include:</p>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><strong>Sol-Gel Process:</strong> A wet-chemical synthesis that transitions a colloidal suspension (sol) into an integrated network (gel) via hydrolysis and condensation polymerization of metal alkoxides, producing high-purity metal oxides.</li>
                        <li><strong>Chemical Vapor Deposition (CVD):</strong> A process where volatile precursor molecules react or decompose on a heated substrate surface to produce high-performance carbon nanotubes (CNTs) or thin films.</li>
                        <li><strong>Analysis Tools:</strong> The internal structural morphology of synthesised nanomaterials is validated using scanning electron microscopy (SEM) and transmission electron microscopy (TEM).</li>
                    </ul>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 dark:bg-slate-900 px-3 py-1 rounded">Module 3</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Electrochemistry, Corrosion Theories & Batteries</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">3.1 Thermodynamic Derivation of the Nernst Equation</h3>
                    <p class="mb-4">The relationship between electrical energy produced in a reversible cell and the free energy change of its chemical reactions is expressed as: <strong>&Delta;G = -nF·E_cell</strong>. Under standard state conditions: <strong>&Delta;G&deg; = -nF·E&deg;_cell</strong>.</p>
                    <p class="mb-4">From chemical thermodynamics, the free energy change &Delta;G for a general reaction: <strong>aA + bB &harr; cC + dD</strong> is related to the reaction quotient Q by:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        &Delta;G = &Delta;G&deg; + R·T ln(Q) = &Delta;G&deg; + R·T ln([C]^c [D]^d / [A]^a [B]^b)
                    </div>
                    <p class="mb-4">Substituting the free energy change in terms of cell potentials (-nFE_cell) into the thermodynamic relationship gives:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        -nF·E_cell = -nF·E&deg;_cell + R·T ln(Q) &rArr; E_cell = E&deg;_cell - (R·T / nF)·ln(Q)
                    </div>
                    <p class="mb-4">Converting the natural logarithm to base-10 and evaluating constants at standard temperature (T = 298.15 K, where R = 8.314 J·mol^-1·K^-1 and F = 96485 C·mol^-1) yields the **Nernst Equation**:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4 font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                        E_cell = E&deg;_cell - (0.0591 / n) &times; log10([C]^c [D]^d / [A]^a [B]^b)
                    </div>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">3.2 Corrosion Chemistry & Cathodic Protection</h3>
                    <p class="mb-4">Corrosion is the decay of a metal object due to chemical or electrochemical reactions with its surrounding environment.</p>
                    <p class="mb-4">Under **Wet (Electrochemical) Corrosion**, oxidation reactions occur at localized anodic areas on the metal surface, releasing electrons: <strong>Fe &rarr; Fe^2+ + 2e-</strong>. These electrons flow through the metal to cathodic areas, where they are consumed by oxygen reduction or hydrogen evolution reactions:</p>
                    <ul class="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Oxygen Reduction (Neutral or Alkaline Medium):</strong> O_2 + 2H_2O + 4e- &rarr; 4OH-. This is the most common process in neutral water or damp soils.</li>
                        <li><strong>Hydrogen Evolution (Acidic Medium):</strong> 2H+ + 2e- &rarr; H_2 &uarr;. This occurs in acidic industrial effluents or environments.</li>
                    </ul>
                    <p class="mb-4">Methods to mitigate corrosion include **Cathodic Protection**, which shifts the entire metal structure from an anode to a cathode:</p>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><strong>Sacrificial Anode Method:</strong> The metal structure is connected to a more active, highly electropositive sacrificial metal (like Zinc or Magnesium), which corrodes preferentially to protect the structural metal.</li>
                        <li><strong>Impressed Current Cathodic Protection:</strong> A direct current (DC) from an external power supply is applied to oppose the internal corrosion current, keeping the target metal cathodic.</li>
                    </ul>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 dark:bg-slate-900 px-3 py-1 rounded">Module 4</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Water Chemistry, Scale Remediation & Titrations</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">4.1 Boiler Operations & Industrial Problems</h3>
                    <p class="mb-4">Using hard water in industrial boilers leads to scale and sludge formation, reducing heat transfer efficiency and potentially causing equipment damage. Boiler troubles include:</p>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><strong>Caustic Embrittlement:</strong> A type of stress corrosion cracking that occurs when scale-forming sodium carbonate hydrolyzes in the boiler water to form sodium hydroxide: Na_2CO_3 + H_2O &rarr; 2NaOH + CO_2. Highly alkaline NaOH concentrates in boiler joints and cracks, reacting with the steel components to cause micro-cracking and brittleness.</li>
                        <li><strong>Priming & Foaming:</strong> Priming is the carryover of liquid water droplets along with steam into the output lines, caused by high water levels or rapid boiling. Foaming is the formation of persistent bubbles on the boiling water surface, caused by suspended organic matter or high salt concentrations.</li>
                        <li><strong>Scale & Sludge:</strong> Sludge is a loose, soft, slimy precipitate formed in colder parts of the boiler, which can be removed by blow-down operations. Scale is a hard, sticky coating formed on the inner heating surfaces, which is difficult to remove and causes localized overheating.</li>
                    </ul>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">4.2 EDTA Titration Theory & Math Checklist</h3>
                    <p class="mb-4">EDTA titration is used to measure total water hardness (calcium and magnesium ions). The hexadentate ligand EDTA forms stable octahedral complexes with Ca^2+ and Mg^2+ ions.</p>
                    <p class="mb-4">A standard titration is carried out at pH 10 using an ammonium chloride-ammonium hydroxide buffer and Eriochrome Black T (EBT) as indicator. EBT initially forms wine-red complexes with Ca^2+ and Mg^2+. As EDTA is added, it displaces EBT from the metal ions, turning the solution dark blue at the endpoint.</p>
                    <p class="mb-4">Hardness is calculated using the relationship: <strong>1 mL of 0.01M EDTA &equiv; 1 mg of CaCO_3 equivalent hardness</strong>. Demineralization methods include <strong>Ion Exchange Resins</strong> (which exchange cation/anion impurities for H+/OH- ions) and <strong>Reverse Osmosis</strong> (which uses semi-permeable membranes to filter dissolved salts under high pressure).</p>
                </section>

                <section class="pb-4">
                    <span class="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 dark:bg-slate-900 px-3 py-1 rounded">Module 5</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Instrumental Analysis and Green Chemistry Principles</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">5.1 Spectrochemical Characterizations</h3>
                    <p class="mb-4">Advanced chemical analysis uses modern spectroscopic instruments: **UV-Visible Spectroscopy** studies electronic transitions in molecular structures based on the Beer-Lambert Law, **FTIR Spectroscopy** identifies functional groups by measuring molecular vibrations, and **Chromatography** (HPLC, GC) separates complex chemical mixtures based on differential partitioning between mobile and stationary phases.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">5.2 Green Chemistry and Atom Economy</h3>
                    <p class="mb-4">Green Chemistry seeks to design chemical processes that minimize waste, conserve energy, and avoid toxic substances. A key metric is **Atom Economy**, which measures chemical efficiency by calculating the raw percentage of starting atoms incorporated into the final desired product:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        % Atom Economy = (Formula Weight of Desired Product / Total Formula Weight of All Reactants) &times; 100
                    </div>
                    <p class="mb-4">A reaction with 100% Atom Economy incorporates all reactant atoms into the final desired product, eliminating waste at the source and aligning with sustainable chemistry standards.</p>
                </section>
            </div>
`;

const cProgrammingMassive = `
            <div class="space-y-12 text-slate-800 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 1</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">C Programming Fundamentals & Core Compilation Slices</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1.1 Computer Architecture and C Language Origin</h3>
                    <p class="mb-4">C is a highly versatile, procedurally-structured, middle-level programming language originally developed in 1972 by Dennis Ritchie at Bell Laboratories. Its position as a middle-level language allows it to combine the hardware-level control of low-level assembly languages with the abstraction of high-level languages.</p>
                    <p class="mb-4">A C program's source code undergoes a multi-stage compilation pipeline before executing on hardware:</p>
                    <ol class="list-decimal pl-6 space-y-2 mb-6 text-sm sm:text-base">
                        <li><strong>Preprocessing (Pre-processor):</strong> Handles lines starting with <code>#</code>. It expands header files (e.g., <code>#include</code>), replaces macro definitions (e.g., <code>#define</code>), and processes conditional directives (e.g., <code>#ifdef</code>). The output is a preprocessed source code file (usually with a <code>.i</code> extension).</li>
                        <li><strong>Compilation (Compiler):</strong> Translates the preprocessed source code into hardware-specific assembly language instructions. The output is an assembly file (usually with a <code>.s</code> extension).</li>
                        <li><strong>Assembly (Assembler):</strong> Translates assembly instructions into relocatable machine-code instructions called object code. The output is an object file containing machine code (usually with a <code>.o</code> or <code>.obj</code> extension).</li>
                        <li><strong>Linking (Linker):</strong> Combines the object code with pre-compiled system library files (like <code>printf</code> implementation from <code>stdio</code>) to resolve external references and generate the final executable file (usually under <code>.exe</code> or <code>.out</code> names).</li>
                    </ol>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.2 Basic Core Elements of a C Program</h3>
                    <p class="mb-4">C program execution always begins at the <code>main()</code> function. Programs use fundamental elements such as:</p>
                    <ul class="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Tokens:</strong> The smallest individual units in a program, classified into keywords, identifiers, constants, strings, operators, and special symbols.</li>
                        <li><strong>Data Types:</strong> Primaries like <code>char</code> (1 byte), <code>int</code> (typically 4 bytes on modern architectures), <code>float</code> (4 bytes), and <code>double</code> (8 bytes).</li>
                        <li><strong>Escape Sequences:</strong> Non-printing character representations like <code>\\n</code> for newline and <code>\\t</code> for tab alignments.</li>
                    </ul>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 2</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Logical Operators, Branching & Program Iterations</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">2.1 Branching Control Structures</h3>
                    <p class="mb-4">Control structures direct the program's execution path based on conditional logic. Branching structures include:</p>
                    <ul class="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Simple and Nested if-else:</strong> Evaluates boolean expressions. If true, the matching block runs, otherwise the else block executes.</li>
                        <li><strong>Switch-Case:</strong> Offloads complex if-else-if ladders to a multi-branch table. Cases require a <code>break</code> statement to prevent falling through into subsequent cases unexpectedly.</li>
                    </ul>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">2.2 Iteration Loops & Logic Controls</h3>
                    <p class="mb-4">Loops execute a block of code repeatedly as long as a specified condition is met:</p>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><strong>while Loop:</strong> An entry-controlled loop that evaluates the condition before executing the loop body.</li>
                        <li><strong>do-while Loop:</strong> An exit-controlled loop that executes the loop body once before evaluating the condition, guaranteeing at least one execution.</li>
                        <li><strong>for Loop:</strong> An entry-controlled loop that groups initialisation, condition checking, and increment/decrement expressions into a single line.</li>
                    </ul>
                    <p class="mb-4">Loop execution can be modified using statements like <code>break</code> (which immediately exits the loop) and <code>continue</code> (which skips the current iteration and jumps to the next loop evaluation step).</p>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 3</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Functions, Arrays & Memory Storage Classes</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">3.1 Arrays and Memory Layouts</h3>
                    <p class="mb-4">Arrays are contiguous blocks of memory allocated for elements of uniform data types. The memory address of the element at index <em>i</em> is given by:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        Address(A[i]) = Base_Address + i &times; sizeof(Data_Type)
                    </div>
                    <p class="mb-4">This contiguous layout explains why indexing starts at <code>0</code>, as the base address represents index <code>0</code> offset from the beginning of the block.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">3.2 Variable Storage Classes</h3>
                    <p class="mb-4">Storage classes specify the scope, visibility, and lifetime of a variable inside memory structures:</p>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><strong>auto:</strong> Default local variables. Stored on the stack. Default value is garbage.</li>
                        <li><strong>register:</strong> Stored in CPU registers for fast access. Limited in size and cannot take address operator pointers using <code>&amp;</code>.</li>
                        <li><strong>static:</strong> Retains its value even after exiting its local scope. Initialized only once.</li>
                        <li><strong>extern:</strong> Global scope, referenceable across multiple compilation units.</li>
                    </ul>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 4</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Direct Memory Management: Pointer Calculations & Heap Allocations</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">4.1 Pointer Arithmetic and Operations</h3>
                    <p class="mb-4">A pointer is a variable that stores the memory address of another variable. The address-of operator (<code>&amp;</code>) extracts pointers, and the dereference operator (<code>*</code>) accesses values at pointer targets. Pointer arithmetic is scaled based on the size of the underlying data type:</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        ptr + 1 = ptr + 1 &times; sizeof(*ptr)
                    </div>
                    <p class="mb-4">Double pointers (<code>char **argv</code>) store the address of another pointer, which is essential for managing dynamic arrays or pointer tables.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">4.2 Dynamic Memory Allocation (DMA)</h3>
                    <p class="mb-4">Heap memory can be allocated at runtime using these standard functions from <code>&lt;stdlib.h&gt;</code>:</p>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><code>malloc(size)</code>: Allocates raw contiguous blocks. Leaves memory uninitialized with garbage data.</li>
                        <li><code>calloc(num, size)</code>: Allocates memory and sets all bytes to <code>0</code>, protecting against uninitialized pointer bugs.</li>
                        <li><code>realloc(ptr, new_size)</code>: Resizes previously allocated heap memory blocks.</li>
                        <li><code>free(ptr)</code>: Returns heap space back to the system, preventing memory leaks and improving program stability.</li>
                    </ul>
                </section>

                <section class="pb-4">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 5</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Structures, Unions & File Streams</h2>
                    
                    <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">5.1 Structures vs Unions</h2>
                    <ul class="list-disc pl-6 space-y-3 mb-6">
                        <li><strong>Structure (struct):</strong> Members are allocated separate memory slices. Total structure size is on or above the sum of the byte alignments of all elements due to padding.</li>
                        <li><strong>Union (union):</strong> All members share the exact same starting memory location. The total size matches only the largest member. Altering one member overwrites other members.</li>
                    </ul>

                    <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">5.2 File System Stream Operations</h2>
                    <p class="mb-4">Persistent storage uses stream operations via standard library file IO functions. The <code>FILE *</code> structure tracks active file systems on disk, with key operations including <code>fopen()</code>, <code>fgetc()</code>, <code>fputc()</code>, <code>fprintf()</code>, <code>fscanf()</code>, <code>fread()</code>, <code>fwrite()</code>, and <code>fclose()</code>.</p>
                </section>
            </div>
`;

const graphicsMassive = `
            <div class="space-y-12 text-slate-800 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 1</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Conics, Eccentricity, Cycloids and Scaled Layouts</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1.1 Introduction to Engineering Graphics</h3>
                    <p class="mb-4">Engineering graphics is the universal language of engineering design, used to visualize, specify, and detail physical parts. Conic sections—including ellipses, parabolas, and hyperbolas—are defined geometrically by slices of a double cone or the locus of a point whose distance from a focus bears a constant ratio (eccentricity) to its distance from a directrix.</p>
                    <p class="mb-4">The **Eccentricity (e)** determines the type of conic section formed:</p>
                    <ul class="list-disc pl-6 space-y-2 mb-6">
                        <li><strong>Ellipse:</strong> Eccentricity <em>e &lt; 1</em> (typically 2/3 or 3/4).</li>
                        <li><strong>Parabola:</strong> Eccentricity <em>e = 1</em>.</li>
                        <li><strong>Hyperbola:</strong> Eccentricity <em>e &gt; 1</em> (typically 3/2 or 5/3).</li>
                    </ul>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.2 Cycloidal Curves & Involutes</h3>
                    <p class="mb-4">A <strong>Cycloid</strong> is the path traced by a point on the circumference of a circle as it rolls along a flat surface without slipping. An <strong>Involute</strong> is the curve traced by the end of a taut string as it is unwound from around a cylinder surface.</p>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 2</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">First-Angle projections, Points, Lines, Planes & Projections of Auxiliaries</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">2.1 First-Angle Projection System</h3>
                    <p class="mb-4">In First-Angle projection, the object is placed in the first quadrant, between the observer and the projection plane. This places Front Views (elevations) above the XY axis line, and Top Views (plans) below it.</p>

                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">2.2 Projection of Lines Inclined to Both Planes (HP & VP)</h3>
                    <p class="mb-4">When lines are inclined to both projection planes, their true lengths are not visible in plan or elevation views. Students must determine the true length and angles (&theta; and &phi;) using projection rotation methods.</p>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 3</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Sectioning and Projection of Solids</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">3.1 Solids Axially Inclined</h3>
                    <p class="mb-4">Projecting solids like prisms, cylinders, pyramids, and cones under axial inclinations requires systematically rotating the 2D orthographic perspectives in multiple projection stages.</p>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 4</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Isometric Drawings</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">4.1 Designing 3D Perspectives</h3>
                    <p class="mb-4">An isometric view represents 3D objects with three axes inclined equally at 120-degree angles. Measured distances are scaled down using the isometric ratio (0.815) to maintain accurate proportions under perspective.</p>
                    <div class="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center font-mono my-4">
                        Isometric Length = True Length &times; cos(45&deg;) / cos(30&deg;) = True Length &times; 0.815
                    </div>
                </section>

                <section class="pb-4">
                    <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 5</span>
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">AutoCAD Standard Command Matrices</h2>
                    
                    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">5.1 Laboratory Examination Commands</h3>
                    <p class="mb-4">Laboratory examinations require students to write exact command-line entries in AutoCAD. Reference entries include: <code>LIMITS</code>, <code>LINE</code>, <code>ELLIPSE</code>, and <code>LAYER</code> syntax configurations.</p>
                </section>
            </div>
`;

const regulationsMassive = `
            <div class="space-y-12 text-slate-800 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mb-6 font-['Space_Grotesk']">Choice Based Credit System (CBCS) & Regulations Reference Guide</h2>
                    <p class="mb-4">Under JNTUK R23 academic regulations, student progress is assessed continuously through internal midterms and final external examinations. The curriculum uses a credit structure aligned with AICTE models, requiring a minimum of 160 credits over four years for graduation.</p>
                    <p class="mb-4">Course types are distributed across basic sciences, humanities, basic engineering, professional core coursework, open electives, and mandatory non-credit courses.</p>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">GPA Calculations, Attendance Thresholds and Academic Standards</h3>
                    <p class="mb-4">The Semester Grade Point Average (SGPA) is computed by dividing the sum of credits earned multiplied by grade points by the total credits attempted. Attendance of at least 75% is required in each course, with medical condonation possible down to 65% for verified reasons.</p>
                    <p class="mb-4">A student is detained if their overall attendance falls below 65%. They are not permitted to write examinations and must repeat the semester with the subsequent batch.</p>
                </section>
            </div>
`;

const roadmapMassive = `
            <div class="space-y-12 text-slate-800 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mb-6 font-['Space_Grotesk']">JNTUK B.Tech First Year Study Planner & Success Roadmap</h2>
                    <p class="mb-4">Transitioning to college academic expectations requires systematic study habits. This roadmap is organized by engineering toppers and academic mentors to structure preparation for courses including Mathematics, Coding, Applied Sciences, and Engineering Mechanics.</p>
                    <p class="mb-4">A structured study plan helps build a strong foundation for both academic performance and career preparation.</p>
                </section>

                <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                    <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Active Study Cycles & Exam Preparation Tactics</h3>
                    <p class="mb-4">Study strategies recommend dividing topics into weekly sprints, practicing active recall, maintaining dedicated formula logs for math and physics courses, and completing practice quizzes post-reading to reinforce retention.</p>
                    <p class="mb-4">Reviewing resolved previous year questions (PYQs) is key to identifying high-yield topics and understanding grading criteria.</p>
                </section>
            </div>
`;

// Replacements logic
function replace(filePath, targetProse) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  const proseRegex = /<div class="prose prose-slate dark:prose-invert max-w-none space-y-8 leading-loose text-sm sm:text-base">([\s\S]*?)<\/div>/i;
  
  if (proseRegex.test(content)) {
    const updated = content.replace(proseRegex, `<div class="prose prose-slate dark:prose-invert max-w-none space-y-8 leading-loose text-sm sm:text-base">${targetProse}</div>`);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`MASSIVE EXPANSION: ${filePath} successfully updated!`);
  }
}

replace('complete-physics-guide.html', physicsMassive);
replace('complete-chemistry-guide.html', chemistryMassive);
replace('complete-c-programming-guide.html', cProgrammingMassive);
replace('complete-engineering-graphics-guide.html', graphicsMassive);
replace('ultimate-jntuk-r23-guide.html', regulationsMassive);
replace('complete-first-year-roadmap.html', roadmapMassive);
