"use server";

import { signOut } from "@/config/auth";

export const logout = async () => {
  return signOut({ redirectTo: "/?loggedOut=true" });
};
