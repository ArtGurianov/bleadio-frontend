"use server";

import db from "@/config/db";
import { v4 } from "uuid";
import { auth } from "@/config/auth";
import { AppClientError, createActionResponse } from "@/lib/utils";

export const getApiKey = async (isReset: boolean = false) => {
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) throw new AppClientError("Unauthorized");

    if (!isReset) {
      const user = await db.user.findUnique({
        where: { email },
      });
      if (user?.apiKey) {
        return createActionResponse({ data: user.apiKey });
      }
    }
    const apiKey = v4();
    await db.user.update({ where: { email }, data: { apiKey } });
    return createActionResponse({ data: apiKey });
  } catch (error) {
    return createActionResponse({ error });
  }
};
