import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { palette } from '../lib/palette';
import type { ArtefactShape } from './shapes';
export type { ArtefactShape } from './shapes';

function buildBase(shape: ArtefactShape): THREE.BufferGeometry {
  switch (shape) {
    case 'octa':       return new THREE.OctahedronGeometry(1, 0);
    case 'icosa':      return new THREE.IcosahedronGeometry(1, 0);
    case 'torus-knot': return new THREE.TorusKnotGeometry(0.7, 0.22, 64, 6);
    case 'cube-stack': return new THREE.BoxGeometry(1.4, 1.4, 1.4, 1, 1, 1);
    case 'fan':        return new THREE.ConeGeometry(0.9, 1.4, 6, 1);
    case 'ribbon':     return new THREE.TorusGeometry(0.8, 0.18, 8, 24);
  }
}

function WireMesh({ shape }: { shape: ArtefactShape }) {
  const ref = useRef<THREE.LineSegments>(null);

  const { line, fill } = useMemo(() => {
    const base = buildBase(shape);
    const edges = new THREE.EdgesGeometry(base, 18);
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(palette.bone),
      transparent: true,
      opacity: 0.92,
    });
    const fillMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.ink2),
      transparent: true,
      opacity: 0.6,
    });
    return { line: { geo: edges, mat: lineMat }, fill: { geo: base, mat: fillMat } };
  }, [shape]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.4;
    ref.current.rotation.y += dt * 0.55;
  });

  return (
    <group ref={ref as unknown as React.RefObject<THREE.Group>}>
      <mesh geometry={fill.geo} material={fill.mat} />
      <lineSegments geometry={line.geo} material={line.mat} />
    </group>
  );
}

export function Artefact({ shape }: { shape: ArtefactShape }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={0.5} />
      <WireMesh shape={shape} />
    </Canvas>
  );
}

