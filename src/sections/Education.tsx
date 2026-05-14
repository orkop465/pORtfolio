import { education } from '../data/portfolio';
import { SplitText } from '../components/SplitText';

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <div className="section-head">
        <div className="section-tag">
          <span className="num">05</span>
          <span className="dash" />
          <span>Education</span>
        </div>
        <h2 className="section-title" id="education-title">
          <span className="row"><SplitText text="School" /></span>
          <span className="row"><em><SplitText text="years." delayBase={210} /></em></span>
        </h2>
        <span aria-hidden="true" />
      </div>
      <div className="exp">
        {education.map((e) => (
          <article key={e.id} className="exp-entry">
            <div>
              <div className="exp-year">{e.date}</div>
              <div className="exp-loc">{e.location}</div>
            </div>
            <div>
              <h3 className="exp-co">{e.company}</h3>
              <div className="exp-role">{e.role}</div>
            </div>
            <p className="exp-summary">{e.blurb}</p>
            <div className="exp-tags">
              {(e.tags ?? []).map((t) => (
                <span key={t} className="exp-tag">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
