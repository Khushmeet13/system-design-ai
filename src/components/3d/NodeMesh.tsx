'use client';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SystemNode } from '@/types';
import { NODE_CONFIG } from '@/lib/nodeConfig';
import { useSimulatorStore } from '@/store/simulatorStore';

interface NodeMeshProps {
  node: SystemNode;
  isFailed: boolean;
  isHovered: boolean;
}

export function NodeMesh({ node, isFailed, isHovered }: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [localHovered, setLocalHovered] = useState(false);
  const { setSelectedNode, setHoveredNode, mode } = useSimulatorStore();
  const config = NODE_CONFIG[node.type];

  const color = isFailed ? '#ef4444' : config.color;
  const glowColor = isFailed ? '#ff0000' : config.glowColor;
  const isActive = localHovered || isHovered;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Float animation
    meshRef.current.position.y = node.position[1] + Math.sin(t * 0.8 + node.position[0]) * 0.3;
    
    // Rotation for active nodes
    if (isActive) {
      meshRef.current.rotation.y += 0.02;
    } else {
      meshRef.current.rotation.y += 0.003;
    }

    // Failure shake
    if (isFailed) {
      meshRef.current.position.x = node.position[0] + Math.sin(t * 20) * 0.1;
    } else {
      meshRef.current.position.x = node.position[0];
    }

    // Glow pulse
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.15;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  const handleClick = () => {
    setSelectedNode(node);
  };

  const getGeometry = () => {
    const shape = config.shape;
    const s = isActive ? 1.3 : 1.0;
    
    switch (shape) {
      case 'cylinder': return <cylinderGeometry args={[0.8 * s, 1 * s, 1.5 * s, 8]} />;
      case 'sphere': return <sphereGeometry args={[0.9 * s, 16, 16]} />;
      case 'octahedron': return <octahedronGeometry args={[1.0 * s]} />;
      case 'cone': return <coneGeometry args={[0.8 * s, 1.6 * s, 8]} />;
      case 'torus': return <torusGeometry args={[0.8 * s, 0.3 * s, 8, 20]} />;
      default: return <boxGeometry args={[1.4 * s, 1.4 * s, 1.4 * s]} />;
    }
  };

  return (
    <group position={[node.position[0], node.position[1], node.position[2]]}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.8, 8, 8]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={isActive ? 0.12 : 0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main mesh */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={(e) => { e.stopPropagation(); setLocalHovered(true); setHoveredNode(node.id); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setLocalHovered(false); setHoveredNode(null); document.body.style.cursor = 'default'; }}
        castShadow
      >
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isFailed ? 0.8 : isActive ? 0.6 : 0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe={mode === 'failure' && !isFailed}
        />
      </mesh>

      {/* Instance count indicator */}
      {node.instances && node.instances > 1 && (
        <>
          {Array.from({ length: Math.min(node.instances - 1, 2) }).map((_, i) => (
            <mesh key={i} position={[(i + 1) * 0.4, (i + 1) * 0.2, -(i + 1) * 0.3]} scale={0.5}>
              {getGeometry()}
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} metalness={0.8} roughness={0.3} transparent opacity={0.5} />
            </mesh>
          ))}
        </>
      )}

      {/* Label */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.45}
          color={isActive ? '#ffffff' : '#94a3b8'}
          anchorX="center"
          anchorY="middle"
        >
          {node.label}
        </Text>
        {isActive && (
          <Text
            position={[0, 1.7, 0]}
            fontSize={0.28}
            color={color}
            anchorX="center"
            anchorY="middle"
          >
            {node.description.substring(0, 40)}
          </Text>
        )}
      </Billboard>

      {/* Failed indicator */}
      {isFailed && (
        <Billboard>
          <Text position={[0, 3.0, 0]} fontSize={0.6} color="#ff0000" anchorX="center">
            ⚠️ FAILED
          </Text>
        </Billboard>
      )}
    </group>
  );
}