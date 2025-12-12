"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Next.js Image
import ChatDock from "../components/ChatDock"; // ルート直下の /components を参照

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      {/* --- HERO --- */}
      <section className="relative isolate overflow-hidden">
        {/* ocean gradient background */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-sky-800 to-[#0a0f1c]" />
          {/* sun glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-cyan-300/15 blur-3xl" />
          {/* subtle grain */}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light bg-[radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_0,#fff_0,transparent_35%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide uppercase">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
              Agent Builder で作る、次世代LP
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              爽快、クールに
              <br />
              <span className="text-cyan-300 whitespace-nowrap">"話して体験"できる</span>
              <br />
              <br />
              MCS付替え LP
            </h1>

            <p className="mt-6 max-w-xl text-slate-300 leading-relaxed">
              クリックするだけじゃ、もう古い。OpenAI <b>Agent Builder</b> で作った会話型エージェントを、
              ChatKitでLPに埋め込み。訪問者がワンクリックで「Chatで話す」→その場で体験・質問・購入の
              すべてを完結。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400/90 hover:bg-cyan-300 text-slate-900 font-semibold px-5 py-3 shadow-lg shadow-cyan-900/30 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <span>💬 Chatで話す</span>
              </button>
              <Link
                href="https://platform.openai.com/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white/40 px-5 py-3 text-slate-200/90 hover:text-white transition"
                target="_blank"
              >
                ▶ 製品ドキュメント
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              * このデモは Agent Builder で作成したワークフロー（<code>wf_…</code>）を ChatKit 経由で起動します。
              ドメインを <em>Allowed domains</em> に登録し、<code>OPENAI_API_KEY</code> と
              <code> NEXT_PUBLIC_OPENAI_ORG / WORKFLOW</code> を .env.local に設定してください。
            </p>
          </div>

          {/* visual side */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent blur-2xl" />
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden shadow-2xl">
              {/* ✅ Use Next.js <Image> for optimization */}
              <Image
                src="/hero-sea.webp"
                alt="Sea-breeze style visual"
                width={1600}
                height={840}
                className="w-full h-[420px] object-cover object-center"
                priority
              />
            </div>
            {/* wave footer under image */}
            <svg
              className="absolute -bottom-8 left-0 w-full h-16 text-cyan-300/30"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M0,64L60,53.3C120,43,240,21,360,16C480,11,600,21,720,53.3C840,85,960,139,1080,149.3C1200,160,1320,128,1380,112L1440,96V160H0Z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-8 lg:grid-cols-3">
        {[
          { title: "即時応答", body: "FAQから在庫確認、予約案内まで。会話で完結。" },
          { title: "Agent Builder製", body: "ノーコードで対話フローを設計、ChatKitでそのまま配信。" },
          { title: "セキュア", body: "APIキーはサーバー経由で発行。ドメイン許可も一元管理。" },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/7 transition">
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{f.body}</p>
          </div>
        ))}
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 mt-10">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} ChatKit LP demo • Powered by OpenAI Agent Builder</p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 px-4 py-2 font-medium"
          >
            💬 Chatで話す
          </button>
        </div>
      </footer>

      {/* --- Floating FAB --- */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] rounded-full bg-cyan-500 text-slate-900 px-5 py-3 font-semibold shadow-xl hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-white/30"
        aria-label="Open chat"
      >
        💬 Chatで話す
      </button>

      {/* ChatKit Dock */}
      <ChatDock open={open} onOpenChange={setOpen} />
    </main>
  );
}
