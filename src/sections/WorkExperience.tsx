import { experience } from '../data/portfolio';
import { SectionReveal } from '../components/SectionReveal';
import { ExperienceHover } from '../wow/ExperienceHover';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function WorkExperience() {
  const reduced = useReducedMotion();

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <SectionReveal>
        <header className="section__head">
          <p className="eyebrow">// 01 · experience</p>
          <h2 className="serif-h2" id="experience-title">Work.</h2>
          <p className="lede dim">Hover a row. The mark spins up next to it.</p>
        </header>
      </SectionReveal>

      <SectionReveal delay={0.08} className="experience-list">
        {experience.map((e) => (
          <article
            key={e.id}
            className="exp-row"
            data-exp-row=""
            data-logo={e.logo ?? 'generic'}
            tabIndex={0}
          >
            <span className="exp-row__date">{e.date}</span>
            <div className="exp-row__body">
              <h3 className="serif-h3">
                {e.role}<span className="exp-row__company"> · {e.company}</span>
              </h3>
              <p className="mono dim exp-row__blurb">{e.blurb}</p>
            </div>
          </article>
        ))}
      </SectionReveal>

      <ExperienceHover enabled={!reduced} />
    </section>
  );
}
