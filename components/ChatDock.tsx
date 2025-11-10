"use client";

import { useEffect, useRef, useState } from "react";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

const ORG = process.env.NEXT_PUBLIC_OPENAI_ORG || "";
const WORKFLOW = process.env.NEXT_PUBLIC_OPENAI_WORKFLOW || ""; // wf_...

/**
 * ChatDock (Right-side, scrollable panel)
 * - Slide-in from right, full height
 * - Content area scrolls; web component fills panel
 * - Font size uses CSS clamp to auto-fit
 * - Stable init order: append -> attrs -> options
 */
export default function ChatDock({ open, onOpenChange }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const elRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Wait for custom element definition provided by layout.tsx <Script> loader
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!customElements.get("openai-chatkit")) {
          await customElements.whenDefined("openai-chatkit");
        }
        if (!cancelled) setReady(true);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "ChatKit not defined");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Create element once and keep it mounted
  useEffect(() => {
    if (!ready || elRef.current || !mountRef.current) return;

    const el = document.createElement("openai-chatkit") as any;

    // Fill the panel; auto-fit font size with clamp
    Object.assign(el.style, {
      width: "100%",
      height: "100%",
      display: "block",
      fontSize: "clamp(12px, 1.6vw, 16px)",
    });

    // 1) append first
    mountRef.current.appendChild(el);
    elRef.current = el;

    // 2) required attributes
    if (ORG) el.setAttribute("org", ORG);
    el.setAttribute("workflow", WORKFLOW);

    // 3) options
    const options = {
      api: {
        async getClientSecret(current?: string) {
          try {
            const path = current ? "/api/refresh-session" : "/api/create-session";
            const r = await fetch(path, {
              method: "POST",
              headers: current ? { "content-type": "application/json" } : undefined,
              body: current ? JSON.stringify({ currentClientSecret: current }) : undefined,
            });
            let body: any;
            try { body = await r.json(); } catch { body = await r.text(); }
            console.log(`[chatkit] ${path} status/body:`, r.status, body);
            if (!r.ok) throw new Error(`${path} ${r.status} ${typeof body === "string" ? body : JSON.stringify(body)}`);
            return body?.client_secret; // return object, not value
          } catch (e: any) {
            console.error("[chatkit] getClientSecret error", e);
            setError(String(e));
            return undefined;
          }
        },
      },
    } as any;

    try { (el as any).options = options; } catch {}
    try { if (typeof (el as any).setOptions === "function") (el as any).setOptions(options); } catch {}

    el.addEventListener("error", (evt: any) => {
      console.error("[chatkit] widget error", evt?.detail || evt);
      setError(`widget error: ${JSON.stringify(evt?.detail || {})}`);
    });
  }, [ready]);

  return (
    <div className={["fixed inset-0 z-[70]", open ? "pointer-events-auto" : "pointer-events-none"].join(" ")}>
      {/* Backdrop */}
      <button
        aria-label="close"
        onClick={() => onOpenChange(false)}
        className={[
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Right panel */}
      <aside
        className={[
          "fixed top-0 right-0 h-screen",
          "w-[100vw] sm:w-[420px] lg:w-[560px]",
          "bg-slate-900/95 border-l border-white/10 shadow-2xl",
          "transform transition-transform duration-300 will-change-transform",
          open ? "translate-x-0" : "translate-x-full",
          "flex flex-col",
        ].join(" ")}
        aria-hidden={open ? "false" : "true"}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <div className="text-sm text-slate-300">チャット</div>
          <button onClick={() => onOpenChange(false)} className="text-xs text-slate-300 hover:text-white">閉じる</button>
        </div>

        {/* Body (scrollable wrapper) */}
        <div className="flex-1 overflow-auto p-2">
          {/* Loader / Error / WebComponent mount target */}
          <div className="relative h-[calc(100vh-3.5rem-1rem)]">{/* header+padding差し引き */}
            {!ready && !error && (
              <div className="grid place-items-center text-slate-400 text-sm h-full">Loading Chat…</div>
            )}
            {error && (
              <div className="overflow-auto text-rose-300 text-sm p-4 h-full">{String(error)}</div>
            )}
            <div ref={mountRef} className="h-full w-full" />
          </div>
        </div>
      </aside>
    </div>
  );
}
