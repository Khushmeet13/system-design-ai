export type NodeType =
  | 'load_balancer' | 'api_gateway' | 'app_server' | 'microservice'
  | 'database' | 'cache' | 'message_queue' | 'cdn' | 'object_storage'
  | 'auth_service' | 'search_service';

export interface SystemNode {
  id: string;
  type: NodeType;
  label: string;
  description: string;
  position: [number, number, number];
  color: string;
  icon: string;
  details?: NodeDetails;
  isActive?: boolean;
  isHighlighted?: boolean;
  scale?: number;
  instances?: number;
}

export interface NodeDetails {
  why: string;
  responsibility: string;
  scalingStrategy: string;
  interviewQuestions: string[];
  realWorldExamples: string[];
  techStack: string[];
  metrics?: string;
}

export interface SystemConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  type: 'http' | 'tcp' | 'pubsub' | 'cache' | 'db' | 'cdn';
  animated?: boolean;
  color?: string;
}

export interface ArchitectureData {
  title: string;
  description: string;
  nodes: SystemNode[];
  connections: SystemConnection[];
  scalingNotes: string;
  estimatedRPS?: string;
  dataFlowDescription?: string;
}

export type SimulatorMode = 'design' | 'learning' | 'failure' | 'scaling';
export type ViewMode = 'high-level' | 'detailed';
