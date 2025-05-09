"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full px-4 py-1 bg-foreground/80 flex flex-col md:flex-row gap-2 justify-center items-center text-accent/80 text-center text-wrap">
      <span>
        {"Contact us: "}
        <Link
          className="underline text-accent"
          href={"mailto:support@blead.io"}
        >
          {"support@blead.io"}
        </Link>
      </span>
      <span>{`MyDAOgs Ecosystem ${new Date().getFullYear()}. Rights reserved.`}</span>
    </div>
  );
};
