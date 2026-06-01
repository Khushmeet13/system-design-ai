'use client';
import { useSimulatorStore } from '@/store/simulatorStore';
import { NODE_CONFIG } from '@/lib/nodeConfig';

export function TopBar() {
  const { architecture, isGenerating } = useSimulatorStore();

  return (
    <div className="w-full flex items-center justify-between px-6 py-3 glass border-b border-cyan-400/10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-cyan-400 rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-400 rotate-0" />
          </div>
          <div className="absolute inset-0 w-8 h-8 border border-cyan-400/30 rotate-45 animate-spin-slow" />
        </div>
        <div>
          <div className="font-display text-sm font-bold text-cyan-400 tracking-widest">SYSARCH AI</div>
          <div className="font-mono text-[10px] text-slate-500 tracking-wider">3D SYSTEM DESIGN SIMULATOR</div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-6">
        {architecture && (
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-slate-400">
              <span className="text-cyan-400">{architecture.nodes.length}</span> NODES
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="font-mono text-xs text-slate-400">
              <span className="text-purple-400">{architecture.connections.length}</span> CONNECTIONS
            </div>
            {architecture.estimatedRPS && (
              <>
                <div className="w-px h-4 bg-slate-700" />
                <div className="font-mono text-xs text-slate-400">
                  <span className="text-amber-400">{architecture.estimatedRPS}</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span className="font-mono text-xs text-slate-400">
            {isGenerating ? 'GENERATING' : 'READY'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="hidden xl:flex items-center gap-3">
        {(Object.entries(NODE_CONFIG) as any[]).slice(0, 6).map(([type, cfg]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
            <span className="font-mono text-[10px] text-slate-500 capitalize">
              {type.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
