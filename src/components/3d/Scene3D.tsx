'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { useSimulatorStore } from '@/store/simulatorStore';
import { NodeMesh } from './NodeMesh';
import { ConnectionLine } from './ConnectionLine';
import { FloatingGrid } from './FloatingGrid';
import { EmptyState } from './EmptyState';

export default function Scene3D() {
  const { architecture, failedNodes, hoveredNode } = useSimulatorStore();

  return (
    <Canvas
      camera={{ position: [0, 20, 45], fov: 60, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 30, 0]} intensity={1} color="#00f5ef" />
        <pointLight position={[-20, 10, -20]} intensity={0.5} color="#a855f7" />
        <pointLight position={[20, 10, 20]} intensity={0.5} color="#3b82f6" />
        <directionalLight position={[0, 50, 0]} intensity={0.3} />

        {/* Stars background */}
        <Stars radius={200} depth={100} count={3000} factor={4} saturation={0} fade speed={0.3} />

        {/* Ground grid */}
        <FloatingGrid />

        {/* Architecture nodes */}
        {architecture ? (
          <>
            {architecture.nodes.map((node) => (
              <NodeMesh
                key={node.id}
                node={node}
                isFailed={failedNodes.includes(node.id)}
                isHovered={hoveredNode === node.id}
              />
            ))}
            {architecture.connections.map((conn) => {
              const fromNode = architecture.nodes.find(n => n.id === conn.from);
              const toNode = architecture.nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;
              return (
                <ConnectionLine
                  key={conn.id}
                  connection={conn}
                  from={fromNode.position}
                  to={toNode.position}
                  fromFailed={failedNodes.includes(conn.from)}
                  toFailed={failedNodes.includes(conn.to)}
                />
              );
            })}
          </>
        ) : (
          <EmptyState />
        )}

        {/* Camera controls */}
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={5}
          maxDistance={120}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          autoRotate={!architecture}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping
        />
      </Suspense>
    </Canvas>
  );
}
