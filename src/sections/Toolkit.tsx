import { toolkit } from '../data/portfolio';
import { SplitText } from '../components/SplitText';

export function Toolkit() {
  return (
    <section className="section" id="toolkit" aria-labelledby="toolkit-title">
      <div className="section-head">
        <div className="section-tag">
          <span className="num">04</span>
          <span className="dash" />
          <span>Toolkit</span>
        </div>
        <h2 className="section-title" id="toolkit-title">
          <span className="row"><SplitText text="The" /></span>
          <span className="row"><em><SplitText text="stack." delayBase={140} /></em></span>
        </h2>
        <span aria-hidden="true" />
      </div>
      <div className="skills">
        {toolkit.map((cat) => (
          <div key={cat.label} className="skill-col">
            <h4>{cat.label}</h4>
            <ul>
              {cat.tags.map((s) => (
                <li key={s}><span>{s}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
