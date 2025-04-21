import { setTgUserId } from "@/app/actions/setTgUserId";
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
  const { token } = await params;
  if (token !== TG_BOT_TOKEN) throw new Error("Unauthorized webhook call");

  try {
    const {
      message: {
        from: { id, is_bot },
        text,
      },
    } = (await request.json()) as {
      message: {
        from: { id: number; is_bot: boolean };
        text: string;
      };
    };

    if (!id || is_bot) {
      const qs = new URLSearchParams({
        text: "Only human interaction.",
      }).toString();
      await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }

    if (text.startsWith("/set_api_key")) {
      const parsed = text.split(" ");
      if (
        parsed.length !== 2 ||
        parsed[0] !== "/set_api_key" ||
        !uuidSchema.safeParse(parsed[1]).success
      ) {
        const qs = new URLSearchParams({
          text: "Invalid format. Please send as `/set_api_key KEY`",
        }).toString();
        await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
        return NextResponse.json({}, { status: 200 });
      }

      await setTgUserId(parsed[1], id);
      const qs = new URLSearchParams({
        text: "Success! You can now start sending notifications from your services.",
      }).toString();
      await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
      return NextResponse.json({}, { status: 200 });
    }

    const qs = new URLSearchParams({
      text: "Command not recognized.",
    }).toString();
    await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
