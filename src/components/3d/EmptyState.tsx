'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function EmptyState() {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
    if (torusRef.current) torusRef.current.rotation.x = t * 0.5;
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.8;
      const s = 1 + Math.sin(t * 1.5) * 0.1;
      innerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Outer torus */}
      <mesh ref={torusRef}>
        <torusGeometry args={[5, 0.15, 8, 60]} />
        <meshStandardMaterial color="#00f5ef" emissive="#00f5ef" emissiveIntensity={0.5} />
      </mesh>

      {/* Inner sphere */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#00f5ef"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>

      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <OrbitingNode key={i} index={i} radius={5} />
      ))}

      <Text position={[0, 7, 0]} fontSize={0.8} color="#00f5ef" anchorX="center" fontWeight="bold">
        SYSARCH AI
      </Text>
      <Text position={[0, 5.8, 0]} fontSize={0.4} color="#64748b" anchorX="center">
        Describe your system below to generate architecture
      </Text>
    </group>
  );
}

function OrbitingNode({ index, radius }: { index: number; radius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const colors = ['#00f5ef', '#a855f7', '#f59e0b', '#10b981', '#ef4444'];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * 0.4 + (index * Math.PI * 2) / 5;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 1;
    ref.current.rotation.y = t;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color={colors[index]}
        emissive={colors[index]}
        emissiveIntensity={0.6}
        metalness={0.8}
      />
    </mesh>
  );
}
