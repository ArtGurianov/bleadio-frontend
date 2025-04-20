"use server";

import { v4 } from "uuid";
import { auth } from "@/config/auth";
import db from "@/config/db";

export const getApiKey = async () => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (user?.apiKey) {
      return user.apiKey;
    }

    const apiKey = v4();
    await db.user.update({ where: { email }, data: { apiKey } });
    return apiKey;
  } catch {
    throw new Error("Error during getting apiKey from database.");
  }
};
