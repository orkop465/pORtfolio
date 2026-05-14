import { useEffect, useRef, useState } from 'react';
import { profile, nowCardRows } from '../data/portfolio';
import { SplitText } from '../components/SplitText';

function HeroName() {
  const ref = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = el.querySelectorAll('.ch');
    if (reduced) {
      chars.forEach((c) => c.classList.add('in'));
      return;
    }
    const timers: number[] = [];
    chars.forEach((c, i) => {
      const t = window.setTimeout(() => c.classList.add('in'), 200 + i * 60);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <h1 ref={ref} className="hero-name" aria-label="Or Kop.">
      <span className="row">
        <SplitText text="Or" delayStep={0} />
      </span>
      <span className="row">
        <SplitText text="Kop." delayStep={0} />
      </span>
    </h1>
  );
}

function Rotator({ phrases, interval = 2800 }: { phrases: string[]; interval?: number }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (phrases.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(id);
  }, [phrases.length, interval]);
  return (
    <span className="rotator" aria-live="polite">
      {phrases.map((p, i) => (
        <span
          key={i}
          className={`rotator-phrase${i === idx ? ' is-active' : ''}`}
          aria-hidden={i !== idx}
        >
          {p}.
        </span>
      ))}
    </span>
  );
}

function NowCard() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const upd = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: profile.timezone,
        }),
      );
    };
    upd();
    const id = window.setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="now-card">
      <div className="now-head">
        <span className="now-title">
          <span className="dot" />
          Now
        </span>
        <span className="now-time">
          {time} · {profile.location}
        </span>
      </div>
      <div className="now-list">
        {nowCardRows.map((r) => (
          <div key={r.k} className="now-row">
            <span className="k">{r.k}</span>
            <span className="v">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <HeroName />

      <div className="hero-bottom">
        <p className="hero-tagline">
          I'm Or — a {profile.role.toLowerCase()} at {profile.company}.
          I spend most days on <Rotator phrases={profile.phrases} />
          <br />
          This portfolio is one of the more visible things I've made.
        </p>
        <NowCard />
      </div>
    </section>
  );
}
