import { nowItems } from '../data/portfolio';
import { SectionReveal } from '../components/SectionReveal';

export function Now() {
  return (
    <section className="section" id="now" aria-labelledby="now-title">
      <SectionReveal>
        <header className="section__head">
          <p className="eyebrow">// 04 · now</p>
          <h2 className="serif-h2" id="now-title">Now.</h2>
          <p className="lede dim">
            In the spirit of <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="link">/now</a>. What I'm doing this week, this quarter.
          </p>
        </header>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <div className="now">
          {nowItems.map((n, i) => (
            <article key={i} className="now-row">
              <time>{n.date}</time>
              <div className="now-row__body">
                <p>{n.body}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
