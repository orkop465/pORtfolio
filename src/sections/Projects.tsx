import { projects } from '../data/portfolio';
import { SplitText } from '../components/SplitText';

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-head">
        <div className="section-tag">
          <span className="num">03</span>
          <span className="dash" />
          <span>Projects</span>
        </div>
        <h2 className="section-title" id="projects-title">
          <span className="row"><SplitText text="Selected" /></span>
          <span className="row"><em><SplitText text="work." delayBase={280} /></em></span>
        </h2>
        <span aria-hidden="true" />
      </div>
      <div className="proj-grid">
        {projects.map((p, i) => {
          const isLink = !!p.href && p.href !== '#';
          const Tag = isLink ? 'a' : 'div';
          const linkProps = isLink
            ? {
                href: p.href,
                target: p.href!.startsWith('http') ? '_blank' : undefined,
                rel: 'noreferrer',
              }
            : {};
          return (
            <Tag
              key={p.slug}
              className="proj"
              data-cursor={isLink ? 'open' : 'soon'}
              {...linkProps}
            >
              <div className="proj-row">
                <span className="proj-n">№ {String(i + 1).padStart(2, '0')} · {p.year}</span>
                <span className="proj-tag">{p.tag}</span>
              </div>
              <h3 className="proj-name">
                {p.name}
                <em>.</em>
              </h3>
              <p className="proj-blurb">{p.blurb}</p>
              <div className="proj-foot">
                <div className="proj-stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <span className="proj-cta">
                  {isLink ? 'Read more' : 'Coming soon'} <span className="arrow">→</span>
                </span>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
