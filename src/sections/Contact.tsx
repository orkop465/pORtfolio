import { useState, type FormEvent } from 'react';
import { sendContact } from '../lib/api';
import { socials, resumeHref } from '../data/portfolio';
import { SplitText } from '../components/SplitText';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'ok' }
  | { kind: 'err'; msg: string };

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 5000;

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ kind: 'err', msg: 'fill every field.' });
      return;
    }
    setStatus({ kind: 'sending' });
    const res = await sendContact({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    if (res.ok) {
      setStatus({ kind: 'ok' });
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus({ kind: 'err', msg: res.error });
    }
  }

  const sending = status.kind === 'sending';
  const statusClass =
    status.kind === 'ok'
      ? 'contact-status is-ok'
      : status.kind === 'err'
        ? 'contact-status is-err'
        : 'contact-status';

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-head">
        <div className="section-tag">
          <span className="num">06</span>
          <span className="dash" />
          <span>Contact</span>
        </div>
        <h2 className="section-title contact-title" id="contact-title">
          <span className="row"><SplitText text="Let's" /></span>
          <span className="row"><em><SplitText text="talk." delayBase={175} /></em></span>
        </h2>
        <span aria-hidden="true" />
      </div>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="contact-field">
            <label htmlFor="c-name">— Name</label>
            <input
              id="c-name"
              name="name"
              autoComplete="name"
              maxLength={NAME_MAX}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-cursor="type"
            />
          </div>
          <div className="contact-field">
            <label htmlFor="c-email">— Email</label>
            <input
              id="c-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={EMAIL_MAX}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-cursor="type"
            />
          </div>
          <div className="contact-field">
            <label htmlFor="c-msg">— Message</label>
            <textarea
              id="c-msg"
              name="message"
              rows={5}
              maxLength={MESSAGE_MAX}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              data-cursor="type"
            />
            <span className="contact-count" aria-live="polite">
              {message.length} / {MESSAGE_MAX}
            </span>
          </div>
          <div className="contact-actions">
            <p className={statusClass} aria-live="polite">
              {status.kind === 'ok' && '> message received. expect a reply.'}
              {status.kind === 'err' && `> ${status.msg}`}
              {status.kind === 'sending' && '> transmitting…'}
              {status.kind === 'idle' && ' '}
            </p>
            <button
              type="submit"
              className="btn"
              disabled={sending}
              data-cursor={sending ? 'wait' : 'send'}
            >
              <span>{sending ? 'sending…' : 'send message'}</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </form>

        <aside className="contact-aside">
          <h3>
            Mail, work, or a <em>kind word</em>.
          </h3>
          <p>
            Drop a note. I read everything. Or grab my résumé if you'd rather see the structured version.
          </p>
          <div className="aside-links">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="aside-link"
                data-cursor={s.label}
              >
                <span>{s.label}</span>
                <span className="arrow" aria-hidden="true">↗</span>
              </a>
            ))}
            <a href={resumeHref} download className="aside-link" data-cursor="cv">
              <span>résumé · pdf</span>
              <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
