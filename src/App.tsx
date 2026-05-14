import { SkipLink } from './components/SkipLink';
import { Cursor } from './components/Cursor';
import { Topbar } from './components/Topbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { About } from './sections/About';
import { Marquee } from './sections/Marquee';
import { WorkExperience } from './sections/WorkExperience';
import { Projects } from './sections/Projects';
import { Toolkit } from './sections/Toolkit';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { marqueeItems } from './data/portfolio';
import { useReveal } from './hooks/useReveal';

export function App() {
  useReveal();
  return (
    <>
      <SkipLink />
      <Cursor />
      <Topbar />
      <main id="content">
        <Hero />
        <Stats />
        <About />
        <Marquee items={marqueeItems} speed={32} />
        <WorkExperience />
        <Projects />
        <Toolkit />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
