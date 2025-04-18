"use server";

import { signIn } from "@/config/auth";

export const login = async (email: string) => {
  return signIn("resend", { email });
};
