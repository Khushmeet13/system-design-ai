'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const mat = gridRef.current.material as THREE.Material;
    (mat as any).opacity = 0.08 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02;
  });

  return (
    <>
      <gridHelper
        ref={gridRef}
        args={[100, 40, '#00f5ef', '#0a2040']}
        position={[0, -8, 0]}
        rotation={[0, 0, 0]}
      />
      {/* Second grid slightly above */}
      <gridHelper
        args={[80, 20, '#a855f720', '#0a204010']}
        position={[0, -7.8, 0]}
      />
      {/* Fog plane */}
      <mesh position={[0, -8.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="#010810" transparent opacity={0.8} />
      </mesh>
    </>
  );
}
