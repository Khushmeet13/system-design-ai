'use client';
import dynamic from 'next/dynamic';
import { TopBar } from '@/components/ui/TopBar';
import { PromptPanel } from '@/components/ui/PromptPanel';
import { NodePanel } from '@/components/ui/NodePanel';
import { ModeBar } from '@/components/ui/ModeBar';
import { StatusBar } from '@/components/ui/StatusBar';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#020409]">
      <div className="text-center">
        <div className="font-display text-2xl text-cyan-400 mb-4 animate-pulse">INITIALIZING</div>
        <div className="text-slate-500 font-mono text-sm">Loading 3D Engine...</div>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden relative bg-[#020409] grid-bg">
      <ParticleBackground />
      
      {/* 3D Viewport */}
      <div className="absolute inset-0">
        <Scene3D />
      </div>

      {/* UI Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <TopBar />
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
          <PromptPanel />
        </div>

        <div className="absolute top-20 right-4 pointer-events-auto">
          <NodePanel />
        </div>

        <div className="absolute top-20 left-4 pointer-events-auto">
          <ModeBar />
        </div>

        <div className="absolute bottom-10 left-4 pointer-events-auto">
          <StatusBar />
        </div>
      </div>
    </main>
  );
}
