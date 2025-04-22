import db from "@/config/db";
import { appDataSchema } from "@/lib/schemas/appDataSchema";
import { formatDataMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
if (!TG_BOT_TOKEN) throw new Error("Token not provided in env vars");
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;

export async function POST(request: Request) {
  const body = await request.json();
  const verificationResult = appDataSchema.safeParse(body);
  if (verificationResult.error) {
    const errorStr = verificationResult.error.errors.reduce(
      (temp, next) =>
        `${temp} ${next.path.toString().toUpperCase()} - ${next.message};`,
      ""
    );
    return NextResponse.json(
      { error: `Fields verification failed: ${errorStr}` },
      { status: 400 }
    );
  }

  try {
    const { apiKey, ...rest } = verificationResult.data;

    const user = await db.user.findUnique({ where: { apiKey } });
    if (!user) {
      return NextResponse.json({ error: "Api key not found" }, { status: 404 });
    }

    const qs = new URLSearchParams({
      text: formatDataMessage(rest),
    }).toString();
    await fetch(
      `${TELEGRAM_API_URL}/sendMessage?chat_id=${user.tgUserId}&${qs}&parse_mode=HTML`
    );

    return NextResponse.json({}, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: `Failed while sending notification to telegram bot` },
      { status: 500 }
    );
  }
}
