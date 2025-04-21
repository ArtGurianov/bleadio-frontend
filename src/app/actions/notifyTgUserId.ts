"use server";

import db from "@/config/db";
import { appDataSchema } from "@/lib/schemas/appDataSchema";
import { formatDataMessage } from "@/lib/utils";
import { z } from "zod";

const token = process.env.TG_BOT_TOKEN;
if (!token) throw new Error("Token not provided in env vars");
const TELEGRAM_API_URL = `https://api.telegram.org/bot${token}`;

export const notifyTgUserId = async (data: z.infer<typeof appDataSchema>) => {
  try {
    const { apiKey, ...rest } = data;

    const user = await db.user.findUnique({ where: { apiKey } });
    if (!user) {
      throw new Error();
    }

    const qs = new URLSearchParams({
      text: formatDataMessage(rest),
    }).toString();
    await fetch(
      `${TELEGRAM_API_URL}/sendMessage?chat_id=${user.tgUserId}&${qs}&parse_mode=HTML`
    );
  } catch {
    throw new Error("Error while sending notification to Telegram");
  }
};
