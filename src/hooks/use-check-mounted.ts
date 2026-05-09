import { useEffect, useState } from "react";

const useCheckMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return { isMounted };
};

export default useCheckMounted;
