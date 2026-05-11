# Or Kop — Portfolio

Personal portfolio site: React, TypeScript, Three.js, hosted on **GCP Cloud Run**.

- Single long page: About, Skills, Projects, Experience, Contact
- Interactive 3D background (toggle on/off; respects reduced motion)
- System-based theme (light/dark) with purple/blue palette
- Contact form with backend on Cloud Run (optional [Resend](https://resend.com) for email)

## Run locally

```bash
npm install
npm run dev          # Vite dev server (port 5173)
```

To test the contact form locally, run the API in another terminal:

```bash
npm run dev:api      # Server on port 8080; Vite proxies /api to it
```

## Build and run production-like

```bash
npm run build
npm start            # Serves dist/ + /api on port 8080
```

## Deploy to Cloud Run

1. **Docker**

   ```bash
   docker build -t portfolio .
   docker run -p 8080:8080 portfolio
   ```

2. **GitHub Actions (on push to `main`)**

   - Create a GCP project and enable Cloud Run and Artifact Registry.
   - Create a service account with roles: Cloud Run Admin, Storage Admin, Artifact Registry Writer (or use a preset for Cloud Run deploy).
   - Add GitHub secrets:
     - `GCP_PROJECT_ID`: your GCP project ID
     - `GCP_SA_KEY`: full JSON key of the service account (paste as-is or base64-encode if your workflow expects it)
   - Optional: `GCP_REGION` (default `us-central1`), `SERVICE_NAME` (default `portfolio`).

   Push to `main` to build and deploy.

3. **Contact form email (optional)**

   To send contact form submissions by email, use [Resend](https://resend.com):

   - Add Cloud Run env vars (or Secret Manager):
     - `RESEND_API_KEY`: your Resend API key
     - `CONTACT_TO_EMAIL`: address to receive messages
   - Resend’s free tier allows sending to your verified domain or to the Resend test address.

## Custom domain

Map your domain to the Cloud Run service in the GCP Console (Cloud Run → your service → **Manage custom domains**). No code changes required.

## Branch

Development is done on the `dev` branch. Merge to `main` to trigger deploy.
