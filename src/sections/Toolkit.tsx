import { toolkit } from '../data/portfolio';
import { SectionReveal } from '../components/SectionReveal';

export function Toolkit() {
  return (
    <section className="section" id="toolkit" aria-labelledby="toolkit-title">
      <SectionReveal>
        <header className="section__head">
          <p className="eyebrow">// 03 · toolkit</p>
          <h2 className="serif-h2" id="toolkit-title">Toolkit.</h2>
          <p className="lede dim">What's on the workbench.</p>
        </header>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <div className="toolkit">
          {toolkit.map((cat) => (
            <article key={cat.label} className="toolkit-row">
              <span className="toolkit-row__label">{cat.label}</span>
              <ul className="toolkit-row__tags" role="list">
                {cat.tags.map((t) => (
                  <li key={t} className="toolkit-tag">{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
