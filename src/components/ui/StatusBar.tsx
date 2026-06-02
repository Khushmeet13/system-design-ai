'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulatorStore } from '@/store/simulatorStore';
import { NODE_CONFIG } from '@/lib/nodeConfig';

export function StatusBar() {
  const { architecture, mode, failedNodes } = useSimulatorStore();

  if (!architecture) return null;

  const nodeTypeCounts = architecture.nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      {/* Architecture info */}
      <div className="glass-strong rounded-xl border border-cyan-400/15 p-3 max-w-[300px]">
        <div className="font-display text-xs text-cyan-400 mb-2">{architecture.title.toUpperCase()}</div>
        <p className="font-mono text-[10px] text-slate-400 mb-3 leading-relaxed">{architecture.description}</p>

        {/* Node type breakdown */}
        <div className="space-y-1">
          {Object.entries(nodeTypeCounts).map(([type, count]) => {
            const cfg = NODE_CONFIG[type as keyof typeof NODE_CONFIG];
            if (!cfg) return null;
            return (
              <div key={type} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                <span className="font-mono text-[10px] text-slate-500 flex-1 capitalize">
                  {type.replace('_', ' ')}
                </span>
                <span className="font-mono text-[10px]" style={{ color: cfg.color }}>×{count}</span>
              </div>
            );
          })}
        </div>

        {architecture.scalingNotes && (
          <div className="mt-3 pt-3 border-t border-slate-700/50">
            <div className="font-display text-[10px] text-slate-500 mb-1">SCALING NOTES</div>
            <p className="font-mono text-[10px] text-slate-400 leading-relaxed">{architecture.scalingNotes}</p>
          </div>
        )}
      </div>

      {/* Failure alert */}
      <AnimatePresence>
        {failedNodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-lg border border-red-500/40 bg-red-500/10 p-2.5"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] text-red-400">
                {failedNodes.length} COMPONENT{failedNodes.length > 1 ? 'S' : ''} FAILED
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
