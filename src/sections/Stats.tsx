import { CountUp } from '../components/CountUp';
import { stats } from '../data/portfolio';

export function Stats() {
  return (
    <div className="stats" aria-label="Stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <span className="stat-v">
            {s.value === '∞' ? (
              <em>∞</em>
            ) : (
              <CountUp to={s.value} suffix={s.suffix} />
            )}
          </span>
          <span className="stat-l">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
