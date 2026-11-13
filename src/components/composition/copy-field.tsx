import { Copy } from "lucide-react";
import type { ReactNode } from "react";
import TooltipWrapper from "@/components/composition/tooltip";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

interface Props {
  label: ReactNode;
  value: string;
  /** Text shown instead of `value` (e.g. pretty-printed). `value` is still what gets copied. */
  display?: ReactNode;
  meta?: ReactNode;
  className?: string;
  valueClassName?: string;
}

/** A labelled, monospaced value with a copy button. */
export const CopyField = ({
  label,
  value,
  display,
  meta,
  className,
  valueClassName,
}: Props) => (
  <div className={cn("rounded-lg border bg-card", className)}>
    <div className="flex items-center justify-between gap-2 border-b px-3 py-1.5">
      <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
        {label}
      </div>
      <div className="flex items-center gap-2">
        {meta && <span className="text-xs text-muted-foreground">{meta}</span>}
        <TooltipWrapper tooltipText="Copy">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => copyText(value)}
            disabled={!value}
            aria-label="Copy"
          >
            <Copy />
          </Button>
        </TooltipWrapper>
      </div>
    </div>
    <pre
      className={cn(
        "overflow-x-auto whitespace-pre-wrap break-all p-3 font-mono text-sm",
        valueClassName,
      )}
    >
      {display ?? (value || " ")}
    </pre>
  </div>
);
