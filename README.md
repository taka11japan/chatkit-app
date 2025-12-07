# ChatKit LP Demo — Agent Builder × Next.js

A modern landing page (LP) demo integrating **OpenAI Agent Builder** workflows into a fully responsive **Next.js** app using **ChatKit Web Components**.

![preview](public/hero-sea.webp)

## 🌊 Overview

This project demonstrates how to embed interactive, real‑time AI chat experiences directly into a marketing or product landing page. Visitors can click **"Chatで話す"** to open an embedded ChatKit panel connected to a pre‑built Agent Builder workflow.

## ✨ Features

* Built with **Next.js 16** (App Router)
* **React 19** with TypeScript for type‑safe development
* Fully responsive, ocean‑inspired LP design with **Tailwind CSS v4**
* **ChatKit React integration** using `@openai/chatkit-react`
* **ChatKitPanel** component with advanced features:
  - Dark/Light theme switching support
  - File upload capabilities
  - Custom error handling and retry logic
  - Client‑side tool invocations
* Secure server API routes for session handling (`/api/create-session`, `/api/refresh-session`)
* Environment‑based workflow integration (Agent Builder)
* Ready for GitHub deployment / Vercel hosting

## ⚙️ Environment Variables

Create a `.env.local` file at the project root:

```bash
OPENAI_API_KEY=sk-proj-xxxxx
NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=wf_xxxxx
```

Ensure the domain (e.g., [http://localhost:3000](http://localhost:3000)) is added under your **Agent Builder → Allowed Domains** settings.

## 🧱 Folder Structure

```
app/
  layout.tsx           # Loads ChatKit script globally
  page.tsx             # LP page with CTA → opens ChatKitPanel
  App.tsx              # Main app component
  api/
    create-session/    # Creates ChatKit session via OpenAI API
    refresh-session/   # Refreshes session token
components/
  ChatDock.tsx         # Dock component wrapper
  ChatKitPanel.tsx     # Main ChatKit panel with React hooks
  ErrorOverlay.tsx     # Error display and retry UI
hooks/
  useColorScheme.ts    # Dark/Light theme management
lib/
  config.ts            # ChatKit configuration and theme settings
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

* **Next.js 16 (App Router)**
* **TypeScript + React 19**
* **Tailwind CSS v4** for modern design
* **@openai/chatkit** + **@openai/chatkit-react** for chat integration

## 🧠 How It Works

1. Layout loads ChatKit via `<Script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" />`.
2. ChatKitPanel uses the `useChatKit` React hook for session management.
3. When opened, it fetches a `client_secret` from `/api/create-session` using the OpenAI API.
4. The chat UI renders with full theme support, file uploads, and custom client tools.
5. Users can switch themes, upload files, and interact with the Agent Builder workflow seamlessly.

## 🛠️ Deployment

This project is Vercel‑ready:

1. Push to GitHub
2. Import into Vercel → Add `.env` values
3. Deploy 🎉

## 🧾 License

MIT — © 2025 taka11japan. Use freely with attribution.

---

💬 **Demo LP concept by taka × ChatKit × ChatGPT‑5.**
