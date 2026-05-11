import { projects } from '../data/portfolio';
import { SectionReveal } from '../components/SectionReveal';
import { ArtefactHover } from '../wow/ArtefactHover';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Projects() {
  const reduced = useReducedMotion();

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <SectionReveal>
        <header className="section__head">
          <p className="eyebrow">// 02 · projects</p>
          <h2 className="serif-h2" id="projects-title">Selected work.</h2>
          <p className="lede dim">Hover a row. The artefact comes to meet you.</p>
        </header>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <ul className="work-list" role="list">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className="work-row"
              data-artefact-row=""
              data-idx={String(i)}
              tabIndex={0}
            >
              <span className="work-row__copper-dot" aria-hidden="true" />
              <span className="work-row__ix">{String(i + 1).padStart(2, '0')}</span>
              <a href={p.href ?? '#'} className="work-row__name">
                <span>{p.name}</span>
                <span className="work-row__arrow" aria-hidden="true">→</span>
              </a>
              <span className="work-row__role">{p.role}</span>
              <span className="work-row__year">{p.year}</span>
            </li>
          ))}
        </ul>
      </SectionReveal>

      <ArtefactHover enabled={!reduced} />
    </section>
  );
}
