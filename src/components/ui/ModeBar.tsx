'use client';
import { motion } from 'framer-motion';
import { useSimulatorStore } from '@/store/simulatorStore';
import { SimulatorMode, ViewMode } from '@/types';

const MODES: { id: SimulatorMode; label: string; icon: string; color: string }[] = [
  { id: 'design', label: 'DESIGN', icon: '🏗️', color: '#00f5ef' },
  { id: 'learning', label: 'LEARN', icon: '📚', color: '#a855f7' },
  { id: 'failure', label: 'FAILURE', icon: '💥', color: '#ef4444' },
  { id: 'scaling', label: 'SCALING', icon: '📈', color: '#10b981' },
];

export function ModeBar() {
  const { mode, setMode, viewMode, setViewMode, architecture, failedNodes, clearFailedNodes } = useSimulatorStore();

  if (!architecture) return null;

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-1"
    >
      <div className='grid grid-cols-2 space-x-1'>
      {/* Mode selector */}
      <div className="glass-strong rounded-xl border border-cyan-400/15 p-3">
        <div className="font-display text-[10px] text-slate-500 mb-2 tracking-widest">MODE</div>
        <div className="space-y-1.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                if (m.id !== 'failure') clearFailedNodes();
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                mode === m.id
                  ? 'border'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              style={mode === m.id ? {
                background: `${m.color}15`,
                borderColor: `${m.color}40`,
                color: m.color,
              } : {}}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
              {mode === m.id && (
                <motion.div
                  layoutId="mode-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: m.color }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* View mode */}
      <div className="glass-strong rounded-xl border border-cyan-400/15 p-3">
        <div className="font-display text-[10px] text-slate-500 mb-2 tracking-widest">VIEW</div>
        <div className="flex gap-1.5">
          {(['high-level', 'detailed'] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              className={`flex-1 py-1.5 rounded font-mono text-[10px] transition-all ${
                viewMode === v
                  ? 'bg-cyan-400/15 border border-cyan-400/40 text-cyan-400'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              {v === 'high-level' ? 'HIGH' : 'DETAIL'}
            </button>
          ))}
        </div>
      </div>

      </div>

      {/* Failure mode info */}
      {mode === 'failure' && (
        <div className="glass-strong rounded-xl border border-red-500/20 p-3">
          <div className="font-display text-[10px] text-red-400 mb-1.5 tracking-widest">FAILURE SIM</div>
          <p className="font-mono text-[10px] text-slate-400 mb-2">Click nodes to simulate failures</p>
          {failedNodes.length > 0 && (
            <>
              <div className="font-mono text-xs text-red-400 mb-1.5">{failedNodes.length} failed</div>
              <button
                onClick={clearFailedNodes}
                className="w-full py-1.5 rounded font-mono text-[10px] bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
              >
                RESTORE ALL
              </button>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
