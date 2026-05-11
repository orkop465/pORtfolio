import { useState, type FormEvent } from 'react';
import { sendContact } from '../lib/api';
import { socials } from '../data/portfolio';
import { SectionReveal } from '../components/SectionReveal';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'err'; msg: string };

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ kind: 'err', msg: 'Fill every field.' });
      return;
    }
    setStatus({ kind: 'sending' });
    const res = await sendContact({ name: name.trim(), email: email.trim(), message: message.trim() });
    if (res.ok) {
      setStatus({ kind: 'ok' });
      setName(''); setEmail(''); setMessage('');
    } else {
      setStatus({ kind: 'err', msg: res.error });
    }
  }

  const sending = status.kind === 'sending';
  const statusClass =
    status.kind === 'ok' ? 'contact__status is-ok'
    : status.kind === 'err' ? 'contact__status is-err'
    : 'contact__status';

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <SectionReveal>
        <header className="section__head">
          <p className="eyebrow">// 05 · contact</p>
          <h2 className="serif-h2" id="contact-title">Say something.</h2>
          <p className="lede dim">Mail, work, or a kind word. Replies in mono.</p>
        </header>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <form className="contact" onSubmit={onSubmit} noValidate>
          <div className="contact__field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="name" autoComplete="name"
              value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="contact__field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" name="email" type="email" autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="contact__field">
            <label htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" rows={5}
              value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
          <button type="submit" className="contact__submit" disabled={sending}>
            <span>{sending ? 'sending…' : 'send'}</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </button>
          <p className={statusClass} aria-live="polite">
            {status.kind === 'ok' && '> message received. expect a reply.'}
            {status.kind === 'err' && `> ${status.msg}`}
            {status.kind === 'sending' && '> transmitting…'}
            {status.kind === 'idle' && ' '}
          </p>
        </form>

        <div className="contact__links">
          {socials.map((s) => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="link"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
