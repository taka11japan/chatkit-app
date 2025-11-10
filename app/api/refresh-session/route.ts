import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const org =
    process.env.OPENAI_ORG || process.env.NEXT_PUBLIC_OPENAI_ORG;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!org || !apiKey) {
    return NextResponse.json(
      { error: "Missing env vars: OPENAI_API_KEY / ORG" },
      { status: 400 }
    );
  }

  const { currentClientSecret } = await req.json().catch(() => ({ currentClientSecret: undefined }));

  // 🔧 Next 15: cookies() は Promise
  const cookieStore = await cookies();
  const userId = cookieStore.get("ck_user_id")?.value;

  const upstream = await fetch("https://api.openai.com/v1/chatkit/sessions/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-OpenAI-Org": org,
      "OpenAI-Beta": "chatkit_beta=v1",
    },
    body: JSON.stringify({
      client_secret: currentClientSecret,
      user: userId, // なくても動くが一応添付
    }),
  });

  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
