"use server";

import db from "@/config/db";

export const setTgUserId = async (apiKey: string, tgUserId: number) => {
  try {
    await db.user.update({
      where: { apiKey },
      data: { tgUserId },
    });
  } catch {
    throw new Error("Api key not found.");
  }
};
