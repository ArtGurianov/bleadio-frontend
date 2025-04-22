import db from "@/config/db";
import { uuidSchema } from "@/lib/schemas/uuidSchema";
import { NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
if (!TG_BOT_TOKEN) throw new Error("Token not provided in env vars");
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ token: string }>;
  }
) {
  try {
    let resultString = "Command not recognized.";
    const { token } = await params;
    if (token !== TG_BOT_TOKEN) resultString = "Unauthorized webhook call";

    const body = await request.json();
    const {
      message: {
        from: { id, is_bot },
        text,
      },
    } = body as {
      message: {
        from: { id: number; is_bot: boolean };
        text: string;
      };
    };

    if (!id || is_bot) {
      resultString = "Only human interaction.";
    }

    if (text.startsWith("/set_api_key")) {
      const parsed = text.split(" ");
      if (
        parsed.length !== 2 ||
        parsed[0] !== "/set_api_key" ||
        !uuidSchema.safeParse(parsed[1]).success
      ) {
        resultString = "Invalid format. Please send as `/set_api_key YOUR_KEY`";
      }

      await db.user.update({
        where: { apiKey: parsed[1] },
        data: { tgUserId: id },
      });

      resultString =
        "Success! You can now start sending notifications from your services.";
    }

    const qs = new URLSearchParams({
      text: resultString,
    }).toString();
    await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({}, { status: 200 });
}
