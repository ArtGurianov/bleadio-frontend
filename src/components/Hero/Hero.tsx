import Image from "next/image";
import { BleadSvgUrl } from "../svg";

export const Hero = () => {
  return (
    <div className="flex flex-wrap-reverse justify-center items-center gap-2">
      <div>
        <Image
          src={BleadSvgUrl}
          width="0"
          height="0"
          sizes="100vw"
          alt="logo"
          className="h-auto shrink-0"
          priority
        />
      </div>
      <div className="font-serif text-2xl">
        <p className="text-center">{"Got your lead?"}</p>
        <p>{"Don’t let em bleed!"}</p>
        <p className="text-end mt-4 text-3xl">{"Act fast with"}</p>
        <p className="text-end text-3xl">{"BLEAD.io"}</p>
      </div>
    </div>
  );
};
