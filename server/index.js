import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(express.json({ limit: '20kb' }));

const CONTACT_LIMITS = { name: 100, email: 254, message: 5000 };

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    if (
      name.length > CONTACT_LIMITS.name ||
      email.length > CONTACT_LIMITS.email ||
      message.length > CONTACT_LIMITS.message
    ) {
      return res.status(400).json({ message: 'One or more fields exceed the allowed length.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.GOOGLE_CLOUD_PROJECT; // fallback for demo

    if (apiKey && toEmail) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio <onboarding@resend.dev>',
          to: [toEmail],
          reply_to: email,
          subject: `Portfolio contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        const err = await resendRes.json().catch(() => ({}));
        console.error('Resend error:', err);
        return res.status(502).json({ message: 'Failed to send email.' });
      }
    } else {
      console.log('[Contact form]', { name, email, message: message.slice(0, 100) + '...' });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// Health for Cloud Run
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Serve static frontend when dist exists (e.g. production)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(path.join(distPath, 'index.html'))) {
  app.use(express.static(distPath));
  app.get(/^\/(?!api).*$/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) res.status(404).send('Not found');
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
