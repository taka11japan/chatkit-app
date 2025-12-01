# ChatKit LP Demo — Agent Builder × Next.js

A modern landing page (LP) demo integrating **OpenAI Agent Builder** workflows into a fully responsive **Next.js** app using **ChatKit Web Components**.

![preview](public/hero-sea.webp)

## 🌊 Overview

This project demonstrates how to embed interactive, real‑time AI chat experiences directly into a marketing or product landing page. Visitors can click **“Chatで話す”** to open an embedded ChatKit panel connected to a pre‑built Agent Builder workflow.

## ✨ Features

* Built with **Next.js 15** (App Router)
* Fully responsive, ocean‑inspired LP design with Tailwind CSS
* **ChatDock** component: slide‑in right‑side chat panel
* Secure server API routes for session handling (`/api/create-session`, `/api/refresh-session`)
* Environment‑based workflow integration (Agent Builder)
* Ready for GitHub deployment / Vercel hosting

## ⚙️ Environment Variables

Create a `.env.local` file at the project root:

```bash
OPENAI_API_KEY=sk-proj-xxxxx
NEXT_PUBLIC_OPENAI_ORG=org_xxxxx
NEXT_PUBLIC_OPENAI_WORKFLOW=wf_xxxxx
```

Ensure the domain (e.g., [http://localhost:3000](http://localhost:3000)) is added under your **Agent Builder → Allowed Domains** settings.

## 🧱 Folder Structure

```
app/
  layout.tsx           # Loads ChatKit script globally
  page.tsx             # LP page with CTA → opens ChatDock
  api/
    create-session/    # Creates ChatKit session via OpenAI API
    refresh-session/   # Refreshes session token
components/
  ChatDock.tsx         # ChatKit dock panel (right-side slide-in)
public/
  hero-sea.webp        # Visual background image
```

## 🚀 Quick Start

```bash
git clone https://github.com/taka11japan/chatkit-app.git
cd chatkit-app
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and click **💬 Chatで話す** to test your Agent Builder chat.

## 🧩 Tech Stack

* **Next.js 15 (App Router)**
* **TypeScript + React 18**
* **Tailwind CSS** for design
* **OpenAI ChatKit Web Components** for chat integration

## 🧠 How It Works

1. Layout loads ChatKit via `<Script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" />`.
2. ChatDock waits until `<openai-chatkit>` is defined.
3. When opened, it fetches a `client_secret` from `/api/create-session` using the OpenAI API.
4. The chat UI renders in the dock and connects to your Agent Builder workflow.

## 🛠️ Deployment

This project is Vercel‑ready:

1. Push to GitHub
2. Import into Vercel → Add `.env` values
3. Deploy 🎉

## 🧾 License

MIT — © 2025 taka11japan. Use freely with attribution.

---

💬 **Demo LP concept by taka × ChatKit × ChatGPT‑5.**
