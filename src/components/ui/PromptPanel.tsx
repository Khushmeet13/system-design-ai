'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulatorStore } from '@/store/simulatorStore';
import { PRESET_SYSTEMS } from '@/lib/nodeConfig';

export function PromptPanel() {
  const {
    userPrompt, setUserPrompt,
    setArchitecture, isGenerating, setIsGenerating,
    setGenerationProgress, generationProgress,
    setSelectedNode
  } = useSimulatorStore();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const generate = async (prompt: string) => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setSelectedNode(null);

    const steps = [
      'Analyzing requirements...',
      'Identifying components...',
      'Designing data flows...',
      'Optimizing architecture...',
      'Building 3D model...',
    ];

    let stepIdx = 0;
    setGenerationProgress(steps[0]);
    const interval = setInterval(() => {
      stepIdx = Math.min(stepIdx + 1, steps.length - 1);
      setGenerationProgress(steps[stepIdx]);
    }, 800);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.architecture) {
        setArchitecture(data.architecture);
      }
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  return (
    <div className="w-full px-4 pb-4">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Preset buttons */}
        <div className="flex gap-2 mb-3 flex-wrap justify-center">
          {PRESET_SYSTEMS.map((sys) => (
            <button
              key={sys.name}
              onClick={() => { setUserPrompt(sys.prompt); generate(sys.prompt); }}
              disabled={isGenerating}
              className="px-3 py-1.5 glass cyber-border rounded font-mono text-xs text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all disabled:opacity-40"
            >
              {sys.emoji} {sys.name}
            </button>
          ))}
        </div>

        {/* Main input */}
        <div className={`glass-strong rounded-xl border transition-all ${focused ? 'border-cyan-400/50 shadow-[0_0_30px_rgba(0,245,239,0.1)]' : 'border-cyan-400/15'}`}>
          <div className="flex items-center px-4 py-3 gap-3">
            <div className="text-cyan-400 font-mono text-sm shrink-0">{'>'}</div>
            <input
              ref={inputRef}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && generate(userPrompt)}
              placeholder="Describe your system... e.g. 'Build Uber with real-time tracking and surge pricing'"
              disabled={isGenerating}
              className="flex-1 bg-transparent outline-none font-mono text-sm text-slate-200 placeholder-slate-600 disabled:opacity-50"
            />
            <button
              onClick={() => generate(userPrompt)}
              disabled={isGenerating || !userPrompt.trim()}
              className="px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-lg font-display text-xs text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {isGenerating ? '◌ GENERATING' : '⚡ GENERATE'}
            </button>
          </div>

          {/* Progress bar */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-cyan-400/10 px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      animate={{ width: ['0%', '90%'] }}
                      transition={{ duration: 4, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="font-mono text-xs text-cyan-400/70 whitespace-nowrap shrink-0">{generationProgress}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-2 font-mono text-[10px] text-slate-600">
          CLICK NODES TO INSPECT • SCROLL TO ZOOM • DRAG TO ROTATE • SHIFT+DRAG TO PAN
        </div>
      </motion.div>
    </div>
  );
}
