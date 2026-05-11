import { resumeHref } from '../data/portfolio';
import { SectionReveal } from '../components/SectionReveal';

export function Resume() {
  return (
    <section className="section" id="resume" aria-labelledby="resume-title">
      <SectionReveal>
        <header className="section__head">
          <p className="eyebrow">// 04 · résumé</p>
          <h2 className="serif-h2" id="resume-title">Résumé.</h2>
          <p className="lede dim">
            One page, mono, opinionated. Download as PDF.
          </p>
        </header>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <div className="resume">
          <a className="resume__download" href={resumeHref} download>
            <span>download résumé</span>
            <span className="arrow" aria-hidden="true">↓</span>
          </a>
          <p className="mono dim resume__note">
            Replace <code>public/resume.pdf</code> with your file. Same path, same name.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
