"use client";

import Image from "next/image";

export const HeroImage = () => {
  return (
    <>
      <Image
        src="/rzrblade-emblem-light.svg"
        width={300}
        height={300}
        alt="rzrblade logo"
        className="dark:hidden"
        draggable={false}
      />
      <Image
        src="/rzrblade-emblem-dark.svg"
        width={300}
        height={300}
        alt="rzrblade logo"
        className="hidden dark:block"
        draggable={false}
      />
    </>
  );
};

export default HeroImage;
