import { create } from 'zustand';
import { ArchitectureData, SystemNode, SimulatorMode, ViewMode } from '@/types';

interface SimulatorState {
  // Architecture
  architecture: ArchitectureData | null;
  setArchitecture: (arch: ArchitectureData) => void;

  // UI State
  selectedNode: SystemNode | null;
  setSelectedNode: (node: SystemNode | null) => void;

  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;

  // Mode
  mode: SimulatorMode;
  setMode: (mode: SimulatorMode) => void;

  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Loading
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;

  generationProgress: string;
  setGenerationProgress: (v: string) => void;

  // Animation
  activeFlows: string[];
  setActiveFlows: (flows: string[]) => void;

  failedNodes: string[];
  toggleFailedNode: (id: string) => void;
  clearFailedNodes: () => void;

  // Input
  userPrompt: string;
  setUserPrompt: (v: string) => void;

  // Camera
  cameraPosition: [number, number, number];
  setCameraPosition: (pos: [number, number, number]) => void;

  // Panel
  showPanel: boolean;
  setShowPanel: (v: boolean) => void;

  // Node explanation
  nodeExplanation: string | null;
  setNodeExplanation: (v: string | null) => void;
  isExplaining: boolean;
  setIsExplaining: (v: boolean) => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  architecture: null,
  setArchitecture: (arch) => set({ architecture: arch }),

  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node, showPanel: node !== null }),

  hoveredNode: null,
  setHoveredNode: (id) => set({ hoveredNode: id }),

  mode: 'design',
  setMode: (mode) => set({ mode }),

  viewMode: 'high-level',
  setViewMode: (viewMode) => set({ viewMode }),

  isGenerating: false,
  setIsGenerating: (v) => set({ isGenerating: v }),

  generationProgress: '',
  setGenerationProgress: (v) => set({ generationProgress: v }),

  activeFlows: [],
  setActiveFlows: (flows) => set({ activeFlows: flows }),

  failedNodes: [],
  toggleFailedNode: (id) => set((s) => ({
    failedNodes: s.failedNodes.includes(id)
      ? s.failedNodes.filter(n => n !== id)
      : [...s.failedNodes, id]
  })),
  clearFailedNodes: () => set({ failedNodes: [] }),

  userPrompt: '',
  setUserPrompt: (v) => set({ userPrompt: v }),

  cameraPosition: [0, 20, 40],
  setCameraPosition: (pos) => set({ cameraPosition: pos }),

  showPanel: false,
  setShowPanel: (v) => set({ showPanel: v }),

  nodeExplanation: null,
  setNodeExplanation: (v) => set({ nodeExplanation: v }),

  isExplaining: false,
  setIsExplaining: (v) => set({ isExplaining: v }),
}));
