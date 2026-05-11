import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SkipLink } from './components/SkipLink';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { WorkExperience } from './sections/WorkExperience';
import { Projects } from './sections/Projects';
import { Toolkit } from './sections/Toolkit';
import { Resume } from './sections/Resume';
import { Now } from './sections/Now';
import { Contact } from './sections/Contact';

// Preload GLBs into R3F's loader cache so the first hover doesn't wait on a
// fresh fetch + parse. Small GLBs warm immediately (cheap, hover may come
// fast). The 16 MB UB v2 model waits for requestIdleCallback so it doesn't
// compete with critical above-the-fold assets for bandwidth.
THREE.Cache.enabled = true;
if (typeof window !== 'undefined') {
  for (const url of ['/models/amazon_2.glb', '/models/ub1.glb']) {
    useLoader.preload(GLTFLoader, url);
  }
  const idle = (cb: () => void) => {
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === 'function') w.requestIdleCallback(cb);
    else window.setTimeout(cb, 1500);
  };
  idle(() => useLoader.preload(GLTFLoader, '/models/ub2.glb'));
}

export function App() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="content">
        <Hero />
        <WorkExperience />
        <Projects />
        <Toolkit />
        <Resume />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
