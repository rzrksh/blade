"use client";

import Image from "next/image";

export const HeroImage = () => {
  return (
    <>
      <Image
        src="/blade-emblem-light.svg"
        width={300}
        height={300}
        alt="blade logo"
        className="dark:hidden"
        draggable={false}
      />
      <Image
        src="/blade-emblem-dark.svg"
        width={300}
        height={300}
        alt="blade logo"
        className="hidden dark:block"
        draggable={false}
      />
    </>
  );
};

export default HeroImage;
