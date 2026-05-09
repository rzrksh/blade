import type { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-[52px] pb-[24px] max-w-[var(--max-page-width)] mx-auto">
      {children}
    </div>
  );
};

export default PageWrapper;
