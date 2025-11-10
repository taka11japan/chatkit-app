import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const org = process.env.NEXT_PUBLIC_OPENAI_ORG;
  const apiKey = process.env.OPENAI_API_KEY;
  const { currentClientSecret } = await req.json().catch(() => ({}));

  const res = await fetch("https://api.openai.com/v1/chatkit/sessions/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-OpenAI-Org": org,
      "OpenAI-Beta": "chatkit_beta=v1",
    },
    body: JSON.stringify({ current_client_secret: currentClientSecret }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
