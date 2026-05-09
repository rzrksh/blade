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
        className="mx-auto mb-6 dark:hidden"
      />
      <Image
        src="/rzrblade-emblem-dark.svg"
        width={300}
        height={300}
        alt="rzrblade logo"
        className="mx-auto mb-6 hidden dark:block"
      />
    </>
  );
};

export default HeroImage;
