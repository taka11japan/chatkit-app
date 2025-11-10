import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST() {
  const org =
    process.env.OPENAI_ORG || process.env.NEXT_PUBLIC_OPENAI_ORG;
  const workflow =
    process.env.OPENAI_WORKFLOW || process.env.NEXT_PUBLIC_OPENAI_WORKFLOW; // wf_...
  const apiKey = process.env.OPENAI_API_KEY;

  if (!org || !workflow || !apiKey) {
    return NextResponse.json(
      { error: "Missing env vars: OPENAI_API_KEY / WORKFLOW (wf_...) / ORG" },
      { status: 400 }
    );
  }

  // 🔧 Next 15: cookies() は Promise なので await 必須
  const cookieStore = await cookies();
  let userId = cookieStore.get("ck_user_id")?.value;
  if (!userId) {
    userId = `dev_${crypto.randomUUID()}`;
  }

  const upstream = await fetch("https://api.openai.com/v1/chatkit/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-OpenAI-Org": org,
      "OpenAI-Beta": "chatkit_beta=v1",
    },
    body: JSON.stringify({
      workflow: { id: workflow },
      user: userId,
    }),
  });

  const data = await upstream.json();
  const res = NextResponse.json(data, { status: upstream.status });

  // 応答側の Cookie にセット（こちらは従来通り）
  res.cookies.set("ck_user_id", userId, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
