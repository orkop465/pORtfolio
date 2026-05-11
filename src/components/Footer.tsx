import { profile } from '../data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <span>© {year} — <span className="mark">{profile.name}</span></span>
      <span>made with type & one rotating wireframe.</span>
    </footer>
  );
}
