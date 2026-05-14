import { Fragment } from 'react';

type Props = {
  text: string;
  delayBase?: number;
  delayStep?: number;
};

export function SplitText({ text, delayBase = 0, delayStep = 35 }: Props) {
  let idx = 0;
  return (
    <>
      {text.split('').map((c) => {
        const i = idx++;
        const style = { transitionDelay: `${delayBase + i * delayStep}ms` };
        if (c === ' ') {
          return (
            <span key={i} className="ch" style={{ ...style, width: '0.3em' }}>
              {' '}
            </span>
          );
        }
        return (
          <span key={i} className="ch" style={style}>
            {c}
          </span>
        );
      })}
    </>
  );
}

export function SplitLines({ lines, delayBase = 0 }: { lines: { text: string; em?: boolean }[]; delayBase?: number }) {
  let charsBefore = 0;
  return (
    <>
      {lines.map((line, i) => {
        const startDelay = delayBase + charsBefore * 35;
        charsBefore += line.text.length;
        const inner = <SplitText text={line.text} delayBase={startDelay} />;
        return (
          <Fragment key={i}>
            <span className="row">
              {line.em ? <em>{inner}</em> : inner}
            </span>
          </Fragment>
        );
      })}
    </>
  );
}
