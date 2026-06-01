'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulatorStore } from '@/store/simulatorStore';
import { NODE_CONFIG } from '@/lib/nodeConfig';

export function NodePanel() {
  const {
    selectedNode, setSelectedNode, showPanel,
    architecture, mode, toggleFailedNode, failedNodes,
    nodeExplanation, setNodeExplanation, isExplaining, setIsExplaining
  } = useSimulatorStore();

  useEffect(() => {
    if (selectedNode && architecture) {
      fetchExplanation();
    }
  }, [selectedNode?.id]);

  const fetchExplanation = async () => {
    if (!selectedNode || !architecture) return;
    setIsExplaining(true);
    setNodeExplanation(null);
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ node: selectedNode, systemContext: architecture.title }),
      });
      const data = await res.json();
      setNodeExplanation(data.explanation || '');
    } catch {
      setNodeExplanation('Unable to load explanation.');
    } finally {
      setIsExplaining(false);
    }
  };

  if (!selectedNode) return null;
  const config = NODE_CONFIG[selectedNode.type];
  const isFailed = failedNodes.includes(selectedNode.id);

  return (
    <AnimatePresence>
      {showPanel && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-80 max-h-[80vh] overflow-y-auto"
        >
          <div className="glass-strong rounded-xl border border-cyan-400/20 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-700/50" style={{ borderLeftColor: config.color, borderLeftWidth: 3 }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{config.icon}</span>
                    <span className="font-display text-sm font-bold text-white">{selectedNode.label}</span>
                  </div>
                  <div className="font-mono text-xs capitalize" style={{ color: config.color }}>
                    {selectedNode.type.replace('_', ' ')}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-500 hover:text-white transition-colors text-lg leading-none"
                >×</button>
              </div>
              <p className="mt-2 text-xs text-slate-400 font-mono">{selectedNode.description}</p>
            </div>

            {/* AI Explanation */}
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-display text-xs text-cyan-400">AI INSIGHT</span>
              </div>
              {isExplaining ? (
                <div className="space-y-2">
                  {[80, 100, 70].map((w, i) => (
                    <div key={i} className="h-3 rounded shimmer" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-300 leading-relaxed font-mono">{nodeExplanation}</p>
              )}
            </div>

            {/* Details */}
            {selectedNode.details && (
              <div className="p-4 space-y-4">
                <Section title="WHY IT EXISTS" color={config.color}>
                  <p className="text-xs text-slate-300">{selectedNode.details.why}</p>
                </Section>

                <Section title="RESPONSIBILITY" color={config.color}>
                  <p className="text-xs text-slate-300">{selectedNode.details.responsibility}</p>
                </Section>

                <Section title="SCALING STRATEGY" color={config.color}>
                  <p className="text-xs text-slate-300">{selectedNode.details.scalingStrategy}</p>
                </Section>

                {selectedNode.details.techStack?.length > 0 && (
                  <Section title="TECH STACK" color={config.color}>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.details.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded font-mono text-[10px] border"
                          style={{ borderColor: `${config.color}40`, color: config.color, background: `${config.color}10` }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Section>
                )}

                {selectedNode.details.interviewQuestions?.length > 0 && (
                  <Section title="INTERVIEW QUESTIONS" color="#f59e0b">
                    <ul className="space-y-1.5">
                      {selectedNode.details.interviewQuestions.map((q, i) => (
                        <li key={i} className="text-xs text-slate-300 flex gap-2">
                          <span className="text-amber-400 shrink-0">Q{i + 1}.</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                {selectedNode.details.realWorldExamples?.length > 0 && (
                  <Section title="REAL-WORLD EXAMPLES" color="#10b981">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.details.realWorldExamples.map((ex) => (
                        <span key={ex} className="px-2 py-0.5 rounded font-mono text-[10px] bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </Section>
                )}

                {selectedNode.details.metrics && (
                  <Section title="KEY METRICS" color="#6366f1">
                    <p className="text-xs text-slate-300">{selectedNode.details.metrics}</p>
                  </Section>
                )}

                {/* Failure mode toggle */}
                {mode === 'failure' && (
                  <button
                    onClick={() => toggleFailedNode(selectedNode.id)}
                    className={`w-full py-2 rounded-lg font-display text-xs transition-all ${
                      isFailed
                        ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                        : 'bg-slate-800 border border-slate-600 text-slate-400 hover:border-red-400/50 hover:text-red-400'
                    }`}
                  >
                    {isFailed ? '✓ COMPONENT FAILED' : 'SIMULATE FAILURE'}
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-display text-[10px] mb-1.5 tracking-widest" style={{ color }}>{title}</div>
      {children}
    </div>
  );
}
