import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { palette } from '../lib/palette';
import type { LogoKind } from './logos';

const TARGET_SIZE = 2.0;

/* ---------- helpers ---------- */

function normalizeObject(obj: THREE.Object3D, target = TARGET_SIZE): { center: THREE.Vector3; scale: number; size: THREE.Vector3 } {
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = target / maxDim;
  return { center, scale, size };
}

function makeFillMat(color: string = palette.ink2, opacity = 0.55): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
  });
}
function makeLineMat(color: string = palette.bone, opacity = 0.92): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity,
  });
}

type SpinDebug = { freeze?: boolean; rx?: number; ry?: number; rz?: number };
declare global {
  interface Window {
    __spinDebug?: SpinDebug;
  }
}

function useSpin(refs: {
  ry?: number;
  rx?: number;
  rz?: number;
  rxSway?: number;
  rySway?: number;
  rzSway?: number;
  initialY?: number;
  initialX?: number;
} = {}) {
  const {
    ry = 0,
    rx = 0,
    rz = 0,
    rxSway = 0,
    rySway = 0,
    rzSway = 0,
    initialY = 0,
    initialX = 0,
  } = refs;
  const ref = useRef<THREE.Group>(null);
  const setupRef = useRef(false);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const dbg = (typeof window !== 'undefined' ? window.__spinDebug : undefined) ?? {};
    if (dbg.freeze) {
      g.rotation.x = dbg.rx ?? initialX;
      g.rotation.y = dbg.ry ?? initialY;
      g.rotation.z = dbg.rz ?? 0;
      return;
    }
    if (!setupRef.current) {
      g.rotation.y = initialY;
      g.rotation.x = initialX;
      setupRef.current = true;
    }
    if (ry) g.rotation.y += dt * ry;
    if (rx) g.rotation.x += dt * rx;
    if (rz) g.rotation.z += dt * rz;
    if (rySway) g.rotation.y = initialY + Math.sin(performance.now() * 0.00045) * rySway;
    if (rxSway) g.rotation.x = initialX + Math.sin(performance.now() * 0.00035) * rxSway;
    if (rzSway) g.rotation.z = Math.sin(performance.now() * 0.0003) * rzSway;
  });
  return ref;
}

/* ---------- triangle-trim utility (used to remove the trademark ® on UB v1) ---------- */

type TrimRegion = { xMin?: number; xMax?: number; yMin?: number; yMax?: number };

/**
 * Drops triangles whose ALL THREE vertices lie inside `region` (coords given
 * in normalized [-1, 1] of the geometry's own bounding box). Using an
 * all-verts test (rather than centroid) preserves triangles that straddle the
 * region boundary, so neighboring geometry on the source mesh isn't damaged
 * when something like the trademark ® shares triangles with an adjacent
 * letter's baseline. Returns a fresh BufferGeometry; never mutates the input.
 */
function trimGeometry(src: THREE.BufferGeometry, region: TrimRegion): THREE.BufferGeometry {
  src.computeBoundingBox();
  const bb = src.boundingBox!;
  const size = new THREE.Vector3();
  bb.getSize(size);
  const cx = (bb.min.x + bb.max.x) / 2;
  const cy = (bb.min.y + bb.max.y) / 2;
  const hx = size.x / 2;
  const hy = size.y / 2;
  const xMin = (region.xMin ?? -Infinity) * hx + cx;
  const xMax = (region.xMax ??  Infinity) * hx + cx;
  const yMin = (region.yMin ?? -Infinity) * hy + cy;
  const yMax = (region.yMax ??  Infinity) * hy + cy;

  const pos = src.attributes.position as THREE.BufferAttribute;
  const inExclusion = (x: number, y: number) =>
    x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  const allIn = (a: number, b: number, c: number) =>
    inExclusion(pos.getX(a), pos.getY(a)) &&
    inExclusion(pos.getX(b), pos.getY(b)) &&
    inExclusion(pos.getX(c), pos.getY(c));

  if (src.index) {
    const idx = src.index.array as ArrayLike<number>;
    const kept: number[] = [];
    for (let t = 0; t < idx.length; t += 3) {
      const a = idx[t], b = idx[t + 1], c = idx[t + 2];
      if (!allIn(a, b, c)) kept.push(a, b, c);
    }
    const out = src.clone();
    out.setIndex(kept);
    out.computeVertexNormals();
    return out;
  }

  const triCount = pos.count / 3;
  const tmp: number[] = [];
  const attrNames = Object.keys(src.attributes);
  const buffers: Record<string, number[]> = {};
  for (const n of attrNames) buffers[n] = [];
  for (let t = 0; t < triCount; t++) {
    const a = t * 3, b = t * 3 + 1, c = t * 3 + 2;
    if (allIn(a, b, c)) continue;
    for (const n of attrNames) {
      const at = src.attributes[n] as THREE.BufferAttribute;
      const itemSize = at.itemSize;
      for (const vi of [a, b, c]) {
        for (let s = 0; s < itemSize; s++) {
          buffers[n].push(at.array[vi * itemSize + s] as number);
        }
      }
    }
    tmp.push(a, b, c);
  }
  const out = new THREE.BufferGeometry();
  for (const n of attrNames) {
    const at = src.attributes[n] as THREE.BufferAttribute;
    out.setAttribute(n, new THREE.BufferAttribute(new Float32Array(buffers[n]), at.itemSize));
  }
  out.computeVertexNormals();
  return out;
}

/* ---------- GLB-backed: render the loaded scene as wireframe-over-fill ---------- */

function GlbWireframe({
  url,
  rotationX = 0,
  rotationY = 0,
  yOffset = 0,
  scaleBoost = 1,
  accent = false,
  fillColor,
  fillOpacity,
  trim,
}: {
  url: string;
  rotationX?: number;
  rotationY?: number;
  yOffset?: number;
  scaleBoost?: number;
  accent?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  trim?: TrimRegion;
}) {
  const gltf = useLoader(GLTFLoader, url) as GLTF;

  const { node, scale, center } = useMemo(() => {
    // Clone so re-mounts don't mutate the cached scene
    const node = gltf.scene.clone(true);
    // Apply consistent material to all meshes; optionally trim triangles
    const resolvedColor = fillColor ?? (accent ? palette.copper : palette.ink2);
    const resolvedOpacity = fillOpacity ?? (accent ? 0.75 : 0.55);
    const fill = makeFillMat(resolvedColor, resolvedOpacity);
    node.traverse((c) => {
      if ((c as THREE.Mesh).isMesh) {
        const m = c as THREE.Mesh;
        if (trim) {
          const trimmed = trimGeometry(m.geometry as THREE.BufferGeometry, trim);
          (m.geometry as THREE.BufferGeometry).dispose();
          m.geometry = trimmed;
        }
        m.material = fill;
        m.frustumCulled = false;
      }
    });
    const { center, scale } = normalizeObject(node);
    return { node, scale: scale * scaleBoost, center };
  }, [gltf, accent, scaleBoost, trim, fillColor, fillOpacity]);

  // Edge lines built from all child mesh geometries
  const edges = useMemo(() => {
    const group = new THREE.Group();
    const mat = makeLineMat();
    node.traverse((c) => {
      if ((c as THREE.Mesh).isMesh) {
        const m = c as THREE.Mesh;
        const eg = new THREE.EdgesGeometry(m.geometry as THREE.BufferGeometry, 24);
        const ls = new THREE.LineSegments(eg, mat);
        ls.applyMatrix4(m.matrixWorld);
        group.add(ls);
      }
    });
    return group;
  }, [node]);

  return (
    <group rotation={[rotationX, rotationY, 0]} position={[0, yOffset, 0]}>
      <group scale={scale} position={[-center.x * scale, -center.y * scale, -center.z * scale]}>
        <primitive object={node} />
        <primitive object={edges} />
      </group>
    </group>
  );
}

/* ---------- variants ---------- */

function AmazonLogo() {
  // Smile-only, centered. The 2.6 MB wordmark GLB was the slow asset; the
  // 541 KB smile renders fast and reads as "Amazon" on its own.
  const ref = useSpin({ ry: 0.55, initialY: Math.PI });
  return (
    <group ref={ref}>
      <GlbWireframe url="/models/amazon_2.glb" accent scaleBoost={1.15} />
    </group>
  );
}

function HatalLogo() {
  // 3D coin: short cylinder with the Hatal texture on BOTH flat caps (front
  // and back), flush with the rim edges. Copper rim for thickness.
  // Match Amazon's effective starting angle (~2.053 rad). Amazon arrives there
  // via initialY = Math.PI composed with its GLB's baked Y of -1.0884 rad.
  // The coin is procedural with no baked rotation, so set initialY directly.
  const ref = useSpin({ ry: 0.5, initialY: 2.053 });
  const tex = useLoader(THREE.TextureLoader, '/models/Hatal.png');
  const RADIUS = 1.15;
  const THICKNESS = 0.22;
  const EPS = 0.001; // sit just outside the rim plane to avoid z-fighting

  const frontMat = useMemo(() => {
    const t = tex.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.FrontSide });
  }, [tex]);

  // Back face: mirror the texture on X so the logo still reads correctly when
  // the coin has rotated 180°.
  const backMat = useMemo(() => {
    const t = tex.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.x = -1;
    t.offset.x = 1;
    t.needsUpdate = true;
    return new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.FrontSide });
  }, [tex]);

  const rimMat = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.copper),
      metalness: 0.55,
      roughness: 0.35,
    })
  ), []);

  return (
    <group ref={ref}>
      {/* Front cap — flush with the front rim edge, normal +Z */}
      <mesh material={frontMat} position={[0, 0, THICKNESS / 2 + EPS]}>
        <circleGeometry args={[RADIUS, 64]} />
      </mesh>
      {/* Back cap — flush with the back rim edge, normal -Z (rotated 180° on Y) */}
      <mesh material={backMat} position={[0, 0, -THICKNESS / 2 - EPS]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[RADIUS, 64]} />
      </mesh>
      {/* Copper rim — open cylinder around the disc, axis along Z (so flat ends face camera) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={rimMat}>
        <cylinderGeometry args={[RADIUS, RADIUS, THICKNESS, 64, 1, true]} />
      </mesh>
      {/* Hairline edges on both rims */}
      <lineSegments position={[0, 0, THICKNESS / 2]}>
        <edgesGeometry args={[new THREE.RingGeometry(RADIUS, RADIUS + 0.005, 64)]} />
        <lineBasicMaterial color={palette.bone} transparent opacity={0.4} />
      </lineSegments>
      <lineSegments position={[0, 0, -THICKNESS / 2]}>
        <edgesGeometry args={[new THREE.RingGeometry(RADIUS, RADIUS + 0.005, 64)]} />
        <lineBasicMaterial color={palette.bone} transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

function UbV1Logo() {
  // UB GLB has baked Y of +2.020 rad. To match Amazon's effective start
  // angle (~2.053 rad), initialY should be ~0.033 — i.e. essentially zero.
  const ref = useSpin({ ry: 0.55, initialY: 0 });
  return (
    <group ref={ref}>
      {/* Trim the trademark ® at the visible bottom-right. The model's local Y
          axis is inverted relative to screen (its +Y points down), so the ®
          lives at high model-Y, high model-X. */}
      {/* Trim region tightened to the ® only. The ® sits at model X >= ~93
          (normalized 0.91+) in the [-101, 101] bbox; pure X-cut keeps every
          letter triangle untouched. Pairs with trimGeometry's all-verts
          test, which preserves triangles spanning the cut boundary. */}
      <GlbWireframe
        url="/models/ub1.glb"
        fillColor={palette.ubBlue}
        fillOpacity={0.78}
        trim={{ xMin: 0.88 }}
      />
    </group>
  );
}

function UbV2Logo() {
  // Same baked rotation as ub1.glb — initialY = 0 matches Amazon's effective
  // start angle (~2.053 rad).
  const ref = useSpin({ ry: 0.55, initialY: 0 });
  return (
    <group ref={ref}>
      <GlbWireframe url="/models/ub2.glb" fillColor={palette.ubBlue} fillOpacity={0.78} />
    </group>
  );
}

function GenericLogo() {
  const ref = useSpin({ rx: 0.4, ry: 0.55 });
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 18), [geo]);
  const fillMat = useMemo(() => makeFillMat(), []);
  const lineMat = useMemo(() => makeLineMat(), []);
  return (
    <group ref={ref}>
      <mesh geometry={geo} material={fillMat} />
      <lineSegments geometry={edges} material={lineMat} />
    </group>
  );
}

/* ---------- entry ---------- */

export function Logo({ kind }: { kind: LogoKind }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={0.5} />
      <Suspense fallback={null}>
        {kind === 'amazon' && <AmazonLogo />}
        {kind === 'idf-hatal' && <HatalLogo />}
        {kind === 'ub-v1' && <UbV1Logo />}
        {kind === 'ub-v2' && <UbV2Logo />}
        {kind === 'generic' && <GenericLogo />}
      </Suspense>
    </Canvas>
  );
}
