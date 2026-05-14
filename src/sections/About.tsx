import { profile } from '../data/portfolio';
import { SplitText } from '../components/SplitText';

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="section-head">
        <div className="section-tag">
          <span className="num">01</span>
          <span className="dash" />
          <span>About</span>
        </div>
        <h2 className="section-title" id="about-title">
          <span className="row"><SplitText text="Quietly" /></span>
          <span className="row"><SplitText text="reliable." delayBase={245} /></span>
        </h2>
        <span aria-hidden="true" />
      </div>
      <div className="about">
        <p className="pull">"{profile.pullQuote}"</p>
        <div>
          <p>{profile.bio[0]}</p>
          <p>{profile.bio[1]}</p>
        </div>
        <div className="col-2">
          <p>{profile.bio[2]}</p>
        </div>
      </div>
    </section>
  );
}
