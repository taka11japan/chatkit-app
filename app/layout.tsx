// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ChatKit LP ✨",
  description: "ChatKit integration demo page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* ✅ ChatKit のWeb Componentsスクリプトを読み込み */}
        <Script
          id="chatkit-loader"
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="afterInteractive"
          type="module"
        />
        {children}
      </body>
    </html>
  );
}
