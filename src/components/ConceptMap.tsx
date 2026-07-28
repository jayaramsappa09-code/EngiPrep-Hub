import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, BookOpen, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export interface ConceptNode {
  id: string;
  title: string;
  type: 'prerequisite' | 'current' | 'dependent' | 'concept';
  status: 'completed' | 'in-progress' | 'locked' | 'recommended';
  description?: string;
  unitNumber?: number | string;
  slug?: string;
}

export interface ConceptLink {
  source: string;
  target: string;
  label?: string;
}

export interface ConceptMapProps {
  subject?: string;
  currentTopicTitle?: string;
  prerequisites?: ConceptNode[];
  dependents?: ConceptNode[];
  subConcepts?: ConceptNode[];
  onNodeClick?: (node: ConceptNode) => void;
}

export const ConceptMap: React.FC<ConceptMapProps> = ({
  subject = "Engineering Subject",
  currentTopicTitle = "Current Topic",
  prerequisites = [],
  dependents = [],
  subConcepts = [],
  onNodeClick
}) => {
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [layoutMode, setLayoutMode] = useState<'hierarchy' | 'network'>('hierarchy');

  // Generate fallback nodes if none provided
  const prereqNodes: ConceptNode[] = prerequisites.length > 0 ? prerequisites : [
    {
      id: 'p1',
      title: 'Class 12 Foundations / Pre-calculus',
      type: 'prerequisite',
      status: 'completed',
      description: 'Essential algebra, trigonometry, and basic differential concepts.',
      unitNumber: 'Prerequisite 1'
    },
    {
      id: 'p2',
      title: 'Unit 1: Fundamental Principles',
      type: 'prerequisite',
      status: 'completed',
      description: 'Core concepts, baseline definitions, and matrix transformations.',
      unitNumber: 'Unit 1'
    }
  ];

  const currentTopicNode: ConceptNode = {
    id: 'current',
    title: currentTopicTitle,
    type: 'current',
    status: 'in-progress',
    description: 'Current active study module in EngiPrepHub.',
    unitNumber: 'Active Unit'
  };

  const nextNodes: ConceptNode[] = dependents.length > 0 ? dependents : [
    {
      id: 'd1',
      title: 'Unit 3: Multivariable Applications',
      type: 'dependent',
      status: 'recommended',
      description: 'Partial derivatives, Jacobians, and optimization techniques.',
      unitNumber: 'Unit 3'
    },
    {
      id: 'd2',
      title: 'Unit 4: Engineering System Modeling',
      type: 'dependent',
      status: 'locked',
      description: 'Real-world physical transformations and differential modeling.',
      unitNumber: 'Unit 4'
    }
  ];

  const subNodes: ConceptNode[] = subConcepts.length > 0 ? subConcepts : [
    {
      id: 's1',
      title: 'Key Theorem & Derivation',
      type: 'concept',
      status: 'completed',
      description: 'Step-by-step mathematical expansion and proof.'
    },
    {
      id: 's2',
      title: 'Exam Trap & Solved PYQs',
      type: 'concept',
      status: 'in-progress',
      description: '5-year JNTUK paper analysis and common student blunders.'
    }
  ];

  const handleNodeClick = (node: ConceptNode) => {
    setSelectedNode(node);
    if (onNodeClick) onNodeClick(node);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden my-8">
      {/* Background glow effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black tracking-tight text-white">{subject} Prerequisite Concept Map</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] font-bold border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> SVG Relationship Visualizer
              </span>
            </div>
            <p className="text-xs text-slate-400">Node-link mapping connecting foundational prerequisites to current study modules</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLayoutMode(layoutMode === 'hierarchy' ? 'network' : 'hierarchy')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all border border-slate-700/60 flex items-center gap-1.5 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Layout: {layoutMode === 'hierarchy' ? 'Flow Hierarchy' : 'Radial Network'}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-x-auto rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 min-h-[380px] flex justify-center items-center">
        <svg viewBox="0 0 900 380" className="w-full h-auto min-w-[750px] select-none font-sans">
          <defs>
            {/* Gradients */}
            <linearGradient id="prereqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="currentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="nextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="linkPrereq" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="linkNext" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>

            {/* Markers */}
            <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Links / Connections */}
          {layoutMode === 'hierarchy' ? (
            <g id="svg-links">
              {/* Prereqs to Current */}
              {prereqNodes.map((_, i) => {
                const py = 70 + i * 110;
                return (
                  <path
                    key={`p-link-${i}`}
                    d={`M 230 ${py} C 330 ${py}, 350 190, 450 190`}
                    stroke="url(#linkPrereq)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="6 3"
                    markerEnd="url(#arrowGreen)"
                  >
                    <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.5s" repeatCount="indefinite" />
                  </path>
                );
              })}

              {/* Current to Next */}
              {nextNodes.map((_, i) => {
                const ny = 70 + i * 110;
                return (
                  <path
                    key={`n-link-${i}`}
                    d={`M 450 190 C 550 190, 570 ${ny}, 670 ${ny}`}
                    stroke="url(#linkNext)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="6 3"
                    markerEnd="url(#arrowBlue)"
                  >
                    <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.5s" repeatCount="indefinite" />
                  </path>
                );
              })}

              {/* Current to Sub-concepts */}
              {subNodes.map((_, i) => {
                const sx = 360 + i * 180;
                return (
                  <path
                    key={`s-link-${i}`}
                    d={`M 450 190 L ${sx} 320`}
                    stroke="#475569"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                );
              })}
            </g>
          ) : (
            <g id="svg-network-links">
              {/* Radial Links from Center (450, 190) */}
              {prereqNodes.map((_, i) => (
                <line key={`r-p-${i}`} x1="450" y1="190" x2="200" y2={90 + i * 180} stroke="url(#linkPrereq)" strokeWidth="2.5" />
              ))}
              {nextNodes.map((_, i) => (
                <line key={`r-n-${i}`} x1="450" y1="190" x2="700" y2={90 + i * 180} stroke="url(#linkNext)" strokeWidth="2.5" />
              ))}
              {subNodes.map((_, i) => (
                <line key={`r-s-${i}`} x1="450" y1="190" x2={350 + i * 200} y2="330" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
              ))}
            </g>
          )}

          {/* Prerequisite Column */}
          <g id="prereq-column">
            <text x="130" y="25" textAnchor="middle" fill="#10b981" fontWeight="800" fontSize="12" letterSpacing="1">
              PREREQUISITE KNOWLEDGE
            </text>
            {prereqNodes.map((p, i) => {
              const py = 70 + i * 110;
              const isSelected = selectedNode?.id === p.id;
              return (
                <g
                  key={p.id}
                  onClick={() => handleNodeClick(p)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="30"
                    y={py - 30}
                    width="200"
                    height="60"
                    rx="18"
                    fill="#064e3b"
                    fillOpacity="0.4"
                    stroke={isSelected ? "#34d399" : "#10b981"}
                    strokeWidth={isSelected ? "3" : "1.5"}
                    className="transition-all duration-300 group-hover:fill-emerald-950/80 group-hover:scale-105"
                  />
                  <circle cx="55" cy={py} r="12" fill="#10b981" />
                  <text x="55" y={py + 4} textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="10">✓</text>
                  <text x="78" y={py - 6} fill="#ecfdf5" fontWeight="700" fontSize="12">
                    {p.title.length > 20 ? p.title.substring(0, 18) + '...' : p.title}
                  </text>
                  <text x="78" y={py + 12} fill="#a7f3d0" fontWeight="500" fontSize="10">
                    {p.unitNumber || 'Prerequisite'}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Center Active Current Topic Node */}
          <g id="current-node" onClick={() => handleNodeClick(currentTopicNode)} className="cursor-pointer group">
            {/* Pulsing ring */}
            <rect
              x="310"
              y="140"
              width="280"
              height="100"
              rx="28"
              fill="url(#currentGrad)"
              stroke="#60a5fa"
              strokeWidth="3"
              className="drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <rect
              x="305"
              y="135"
              width="290"
              height="110"
              rx="32"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.5"
            >
              <animate attributeName="transform" type="scale" values="1; 1.02; 1" dur="2s" repeatCount="indefinite" />
            </rect>

            <circle cx="350" cy="190" r="18" fill="#ffffff" />
            <text x="350" y={350 + 5} textAnchor="middle" fill="#2563eb" fontWeight="900" fontSize="14">⚡</text>

            <text x="380" y="175" fill="#ffffff" fontWeight="900" fontSize="14">
              {currentTopicTitle.length > 24 ? currentTopicTitle.substring(0, 22) + '...' : currentTopicTitle}
            </text>
            <text x="380" y="196" fill="#bfdbfe" fontWeight="700" fontSize="11">
              CURRENT STUDY TARGET
            </text>
            <text x="380" y="215" fill="#93c5fd" fontWeight="500" fontSize="10">
              EngiPrepHub Core Module • JNTUK R23
            </text>
          </g>

          {/* Dependent / Next Column */}
          <g id="next-column">
            <text x="770" y="25" textAnchor="middle" fill="#38bdf8" fontWeight="800" fontSize="12" letterSpacing="1">
              NEXT DEPENDENT MODULES
            </text>
            {nextNodes.map((n, i) => {
              const ny = 70 + i * 110;
              const isSelected = selectedNode?.id === n.id;
              return (
                <g
                  key={n.id}
                  onClick={() => handleNodeClick(n)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="670"
                    y={ny - 30}
                    width="200"
                    height="60"
                    rx="18"
                    fill="#0c4a6e"
                    fillOpacity="0.4"
                    stroke={isSelected ? "#7dd3fc" : "#0284c7"}
                    strokeWidth={isSelected ? "3" : "1.5"}
                    className="transition-all duration-300 group-hover:fill-sky-950/80 group-hover:scale-105"
                  />
                  <circle cx="695" cy={ny} r="12" fill="#0284c7" />
                  <text x="695" y={ny + 4} textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="11">→</text>
                  <text x="718" y={ny - 6} fill="#f0f9ff" fontWeight="700" fontSize="12">
                    {n.title.length > 20 ? n.title.substring(0, 18) + '...' : n.title}
                  </text>
                  <text x="718" y={ny + 12} fill="#bae6fd" fontWeight="500" fontSize="10">
                    {n.unitNumber || 'Next Topic'}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Sub-concepts Bottom Row */}
          <g id="sub-row">
            {subNodes.map((s, i) => {
              const sx = 360 + i * 180;
              return (
                <g key={s.id} onClick={() => handleNodeClick(s)} className="cursor-pointer group">
                  <rect
                    x={sx - 75}
                    y="310"
                    width="150"
                    height="40"
                    rx="12"
                    fill="#0f172a"
                    stroke="#475569"
                    strokeWidth="1"
                    className="transition-all group-hover:stroke-cyan-400 group-hover:fill-slate-800"
                  />
                  <text x={sx} y="334" textAnchor="middle" fill="#cbd5e1" fontWeight="600" fontSize="11">
                    {s.title}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex flex-wrap items-center justify-between gap-3 animate-fade-in relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{selectedNode.title}</h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-700 text-slate-300 uppercase">
                  {selectedNode.type}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{selectedNode.description}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Close
          </button>
        </div>
      )}

      {/* Footer Legend */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Prerequisite Mastered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span> Active Target Module
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span> Next Sequential Unit
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          Click any node to inspect syllabus details
        </span>
      </div>
    </div>
  );
};
