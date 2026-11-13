import type { JwtPart } from "../../models";

export const PART_COLORS: Record<JwtPart, string> = {
  header: "text-rose-600 dark:text-rose-400",
  payload: "text-violet-600 dark:text-violet-400",
  signature: "text-sky-600 dark:text-sky-400",
};

export const PART_DOTS: Record<JwtPart, string> = {
  header: "bg-rose-500",
  payload: "bg-violet-500",
  signature: "bg-sky-500",
};

const ORDER: JwtPart[] = ["header", "payload", "signature"];

/** The raw token, each dot-separated part in its own color. */
export const TokenPreview = ({
  parts,
}: {
  parts: [string, string, string];
}) => (
  <span className="block break-all font-mono text-sm leading-relaxed">
    {parts.map((segment, index) => (
      <span key={ORDER[index]}>
        {index > 0 && <span className="text-muted-foreground">.</span>}
        <span className={PART_COLORS[ORDER[index]]}>{segment}</span>
      </span>
    ))}
  </span>
);
