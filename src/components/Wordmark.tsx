type Props = {
  href?: string;
  size?: 'sm' | 'lg';
};

export function Wordmark({ href = '#top', size = 'sm' }: Props) {
  const className = size === 'lg' ? 'wordmark wordmark--lg' : 'wordmark';
  return (
    <a href={href} className={className} aria-label="Top">
      or<span className="dot">.</span>kop
    </a>
  );
}
