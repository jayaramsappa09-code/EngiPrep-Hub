import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Play, RotateCcw, MonitorPlay, Code2, MousePointer2, Hammer, ZoomIn, Search, CheckCircle2 } from 'lucide-react';

type Step = {
  command: string;
  action: string;
  voice: string;
  elements: React.ReactNode; 
};

type Topic = {
  id: string;
  title: string;
  category: string;
  description: string;
  steps: Step[];
  commandsUsed: string[];
};

const SYLLABUS_TOPICS: Topic[] = [
  {
    id: "involute",
    title: "1. Involute of a Circle (Manual & CAD)",
    category: "Unit 1: Curves",
    description: "Path traced by the end of a taut string as it unwinds from a circular drum.",
    commandsUsed: ["CIRCLE (C)", "LINE (L)", "DIVIDE (DIV)", "TRIM (TR)"],
    steps: [
      {
        command: "CIRCLE",
        action: "Create the directing circle representing the drum.",
        voice: "Use the CIRCLE command to draw a circle with a 40 millimeter radius.",
        elements: (
          <motion.circle 
            cx="200" cy="200" r="40" 
            fill="none" stroke="#3b82f6" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )
      },
      {
        command: "LINE",
        action: "Draw the horizontal unwinding distance equal to circumference (2πR).",
        voice: "Use the LINE command starting from the bottom of the circle to represent the unwinding string.",
        elements: (
          <>
            <motion.circle cx="200" cy="200" r="40" fill="none" stroke="#3b82f6" strokeWidth="1" opacity={0.5} />
            <motion.line 
              x1="200" y1="240" x2="451" y2="240" 
              stroke="#10b981" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </>
        )
      },
      {
        command: "DIVIDE & LINE",
        action: "Generate 12 perpendicular tangent lines acting as string sections.",
        voice: "Divide the circle into 12 parts and draw perpendicular tangents from each point.",
        elements: (
          <>
            <circle cx="200" cy="200" r="40" fill="none" stroke="#3b82f6" strokeWidth="1" opacity={0.5} />
            <line x1="200" y1="240" x2="451" y2="240" stroke="#10b981" strokeWidth="1" opacity={0.5} />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 + 90) * (Math.PI / 180);
              const x1 = 200 + 40 * Math.cos(angle);
              const y1 = 200 + 40 * Math.sin(angle);
              const length = (i * (Math.PI * 80)) / 12;
              const x2 = x1 + length * Math.sin(angle);
              const y2 = y1 - length * Math.cos(angle);
              return (
                <motion.line 
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2} 
                  stroke="#fbbf24" strokeWidth="1"
                  strokeDasharray="4 2"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                />
              );
            })}
          </>
        )
      },
      {
        command: "SPLINE",
        action: "Connect the endpoints to form the final involute curve.",
        voice: "Finally, use the SPLINE command to connect all the endpoints, forming the final involute curve.",
        elements: (
          <>
            <circle cx="200" cy="200" r="40" fill="none" stroke="#3b82f6" strokeWidth="1" opacity={0.2} />
            <line x1="200" y1="240" x2="451" y2="240" stroke="#10b981" strokeWidth="1" opacity={0.2} />
            <motion.path 
              d="M 200 240 Q 250 240 280 200 Q 300 130 240 80 Q 150 40 80 120 Q 0 230 110 320 Q 250 440 400 320 Q 480 250 451 240"
              fill="none" stroke="#06b6d4" strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </>
        )
      }
    ]
  },
  {
    id: "ellipse",
    title: "2. Ellipse Constructor (General Focus-Directrix)",
    category: "Unit 1: Curves",
    description: "Constructing an ellipse where eccentricity is less than 1.",
    commandsUsed: ["LINE (L)", "OFFSET (O)", "ARC (A)", "ELLIPSE (EL)"],
    steps: [
      {
        command: "LINE",
        action: "Draw vertical Directrix and horizontal Axis lines.",
        voice: "Type L for line to initialize the primary reference construction markers.",
        elements: (
          <>
            <motion.line x1="100" y1="50" x2="100" y2="350" stroke="#3b82f6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.line x1="100" y1="200" x2="450" y2="200" stroke="#3b82f6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          </>
        )
      },
      {
        command: "OFFSET",
        action: "Offset Directrix to establish Focus (F) and Vertex (V).",
        voice: "Use the offset command at 50 units for the focus, and mark the vertex based on eccentricity.",
        elements: (
          <>
             <line x1="100" y1="50" x2="100" y2="350" stroke="#3b82f6" strokeWidth="1" opacity={0.5} />
             <line x1="100" y1="200" x2="450" y2="200" stroke="#3b82f6" strokeWidth="1" opacity={0.5} />
             <motion.circle cx="150" cy="200" r="3" fill="#10b981" initial={{ scale: 0 }} animate={{ scale: 1 }} />
             <motion.text x="145" y="215" fill="#10b981" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Focus F</motion.text>
             <motion.circle cx="130" cy="200" r="3" fill="#fbbf24" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
             <motion.text x="125" y="190" fill="#fbbf24" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Vertex V</motion.text>
          </>
        )
      },
      {
        command: "ELLIPSE",
        action: "Render the final elliptical geometry using eccentricity rules.",
        voice: "Execute the ellipse command to wrap the final true locus curve.",
        elements: (
          <>
             <line x1="100" y1="50" x2="100" y2="350" stroke="#3b82f6" strokeWidth="1" opacity={0.3} />
             <line x1="100" y1="200" x2="450" y2="200" stroke="#3b82f6" strokeWidth="1" opacity={0.3} />
             <motion.ellipse 
                cx="250" cy="200" rx="120" ry="80" 
                fill="none" stroke="#06b6d4" strokeWidth="3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
             />
          </>
        )
      }
    ]
  }
];

export default function AutoCADTutor() {
  const [activeTopic, setActiveTopic] = useState<Topic>(SYLLABUS_TOPICS[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStep < activeTopic.steps.length - 1) {
          setCurrentStep(c => c + 1);
        } else {
          setIsPlaying(false);
        }
      }, 4000); 
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, activeTopic]);

  const stepData = activeTopic.steps[currentStep];

  return (
    <div className="w-full bg-[#03030b] border border-cyan-900/50 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-300">
      
      {/* Header Panel */}
      <div className="bg-slate-950 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-900/30 relative">
         <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
         <div className="flex-1 relative z-10">
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
               <span className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                 <Terminal className="w-6 h-6" />
               </span>
               EngiPrep AutoCAD Engine
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-2 font-mono">Real-time Visualization Learning Workspace</p>
         </div>
         
         <div className="relative z-10 w-full md:w-64">
            <label className="text-[9px] font-black uppercase text-cyan-500 tracking-wider mb-1.5 block">Select Curriculum Topic:</label>
            <select 
               className="w-full bg-black border border-cyan-900 text-sm font-bold text-slate-300 p-2.5 rounded-xl cursor-pointer focus:border-cyan-500 transition-colors"
               value={activeTopic.id}
               onChange={(e) => {
                 const topic = SYLLABUS_TOPICS.find(t => t.id === e.target.value);
                 if (topic) {
                   setActiveTopic(topic);
                   setCurrentStep(0);
                   setIsPlaying(false);
                 }
               }}
            >
               {SYLLABUS_TOPICS.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
               ))}
            </select>
         </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex flex-col lg:flex-row h-[700px]">
         
         {/* Left Panel: Workflow & Commands */}
         <div className="w-full lg:w-80 bg-slate-950/80 border-r border-slate-900 flex flex-col relative z-20">
            
            {/* Topic Info */}
            <div className="p-5 border-b border-slate-900 text-sm">
               <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{activeTopic.category}</span>
               <p className="text-slate-400 leading-relaxed mt-1">{activeTopic.description}</p>
            </div>

            {/* Stepper Logic */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Construction Process</h3>
               {activeTopic.steps.map((step, idx) => {
                  const isActive = currentStep === idx;
                  const isPast = currentStep > idx;
                  return (
                    <button 
                       key={idx}
                       onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
                       className={`w-full text-left p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group 
                          ${isActive ? 'bg-cyan-900/20 border-cyan-500/50 shadow-inner' : 'bg-black border-slate-800 hover:border-slate-600'}`}
                    >
                       <div className="flex items-start gap-3 relative z-10">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 
                             ${isActive ? 'bg-cyan-500 text-white' : isPast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-600'}`}>
                             {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : (idx + 1)}
                          </div>
                          <div className="space-y-1">
                             <div className={`text-[11px] font-black uppercase tracking-wider font-mono 
                                ${isActive ? 'text-cyan-400' : isPast ? 'text-slate-400' : 'text-slate-600'}`}>
                                {step.command}
                             </div>
                             <div className={`text-xs leading-snug ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                                {step.action}
                             </div>
                          </div>
                       </div>
                    </button>
                  );
               })}
            </div>

            {/* Commander Summary */}
            <div className="p-4 bg-black border-t border-slate-900">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> Required CAD Commands</div>
               <div className="flex flex-wrap gap-1.5">
                  {activeTopic.commandsUsed.map(cmd => (
                     <span key={cmd} className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[9px] font-bold rounded">{cmd}</span>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Panel: Canvas & Execution */}
         <div className="flex-1 flex flex-col bg-[#050510] relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-10 drop-shadow-md"></div>
            
            {/* Top Toolbar */}
            <div className="h-12 border-b border-slate-900 flex items-center justify-between px-4 bg-black/50 z-20">
               <div className="flex gap-2">
                  <button onClick={() => {setCurrentStep(0); setIsPlaying(false)}} className="p-1.5 text-slate-500 hover:text-cyan-400 transition-colors bg-slate-900 rounded border border-slate-800"><RotateCcw className="w-4 h-4" /></button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all text-xs font-black uppercase tracking-widest ${isPlaying ? 'bg-rose-500/10 border-rose-500/50 text-rose-500' : 'bg-cyan-500 text-white border-cyan-400 hover:bg-cyan-400'}`}>
                     {isPlaying ? 'Pause Simulator' : <><Play className="w-3.5 h-3.5 fill-current" /> Auto-Play</>}
                  </button>
               </div>
               <div className="flex items-center gap-3">
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded flex items-center gap-1.5 text-slate-400 text-[9px] font-black uppercase tracking-widest"><Search className="w-3 h-3" /> SNAP ON</div>
                  <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded flex items-center gap-1.5 text-slate-400 text-[9px] font-black uppercase tracking-widest"><ZoomIn className="w-3 h-3" /> GRID ON</div>
               </div>
            </div>

            {/* Canvas Viewport */}
            <div className="flex-1 relative flex items-center justify-center p-8 z-10">
               <svg 
                 viewBox="0 0 600 450" 
                 preserveAspectRatio="xMidYMid meet"
                 className="w-full h-full max-w-3xl drop-shadow-2xl"
               >
                 <defs>
                   <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                     <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(6, 182, 212, 0.05)" strokeWidth="1" />
                   </pattern>
                 </defs>
                 <rect width="100%" height="100%" fill="url(#cadGrid)" />
                 
                 {/* The Interactive Drawing Elements */}
                 <AnimatePresence mode="wait">
                    <motion.g 
                       key={currentStep}
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                       transition={{ duration: 0.3 }}
                    >
                       {stepData.elements}
                    </motion.g>
                 </AnimatePresence>
               </svg>

               {/* Overlaid Guide / AI Output */}
               <motion.div 
                 key={"desc-" + currentStep}
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-2xl flex items-start gap-4 shadow-2xl"
               >
                 <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 shrink-0">
                    <MonitorPlay className="w-5 h-5" />
                 </div>
                 <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] font-mono">Terminal Voice Guide</h5>
                    <p className="text-sm font-medium text-slate-300 italic">"{stepData.voice}"</p>
                 </div>
               </motion.div>
            </div>

         </div>
      </div>
    </div>
  );
}
