'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SystemConnection } from '@/types';
import { CONNECTION_COLORS } from '@/lib/nodeConfig';

interface ConnectionLineProps {
  connection: SystemConnection;
  from: [number, number, number];
  to: [number, number, number];
  fromFailed: boolean;
  toFailed: boolean;
}

export function ConnectionLine({ connection, from, to, fromFailed, toFailed }: ConnectionLineProps) {
  const flowRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.Line>(null);
  const color = fromFailed || toFailed ? '#ef4444' : (CONNECTION_COLORS[connection.type] || '#00f5ef');
  const timeOffset = useRef(Math.random() * Math.PI * 2);

  const { points, curve } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      Math.max(start.y, end.y) + 3,
      (start.z + end.z) / 2
    );
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(60);
    return { points, curve };
  }, [from, to]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame((state) => {
    if (!flowRef.current || !connection.animated) return;
    const t = (state.clock.getElapsedTime() * 0.5 + timeOffset.current) % 1;
    const pos = curve.getPoint(t);
    flowRef.current.position.copy(pos);

    // Pulse opacity
    const mat = flowRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.4 + Math.sin(state.clock.getElapsedTime() * 3) * 0.3;
  });

  return (
    <group>
      {/* Base line */}
      <primitive object={new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({
          color: fromFailed || toFailed ? '#ef4444' : color,
          transparent: true,
          opacity: fromFailed || toFailed ? 0.8 : 0.3,
          linewidth: 1,
        })
      )} />

      {/* Animated flow particle */}
      {connection.animated && !fromFailed && !toFailed && (
        <mesh ref={flowRef}>
          <sphereGeometry args={[0.15, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Secondary flow particles with offset */}
      {connection.animated && !fromFailed && !toFailed && (
        <FlowParticle curve={curve} color={color} offset={0.4} />
      )}
    </group>
  );
}

function FlowParticle({ curve, color, offset }: { curve: THREE.QuadraticBezierCurve3; color: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.getElapsedTime() * 0.5 + offset) % 1;
    const pos = curve.getPoint(t);
    ref.current.position.copy(pos);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 4, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}
