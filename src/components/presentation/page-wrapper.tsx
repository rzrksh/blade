import type { ReactNode } from "react";

const PageWrapper = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        className || `pt-[52px] pb-[24px] max-w-[var(--max-page-width)] mx-auto`
      }
    >
      {children}
    </div>
  );
};

export default PageWrapper;
