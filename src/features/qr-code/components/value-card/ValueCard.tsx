import { Copy, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { MdLink, MdNotes } from "react-icons/md";
import TooltipWrapper from "@/components/composition/tooltip";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import { isUrl } from "../../utils/is-url";

interface Props {
  value: string;
  meta?: ReactNode;
  actions?: ReactNode;
  size?: "default" | "lg";
}

/** A card whose body copies `value` on click, with optional trailing actions. */
export const ValueCard = ({
  value,
  meta,
  actions,
  size = "default",
}: Props) => {
  const link = isUrl(value);
  const TypeIcon = link ? MdLink : MdNotes;

  return (
    <div className="flex items-stretch rounded-lg border bg-card transition-colors hover:bg-muted/50">
      <button
        type="button"
        onClick={() => copyText(value)}
        className="group flex min-w-0 flex-1 items-start gap-3 p-3 text-left"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <TypeIcon className="size-5" aria-label={link ? "Link" : "Text"} />
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "break-all font-mono",
              size === "lg" ? "text-sm md:text-base" : "text-sm line-clamp-2",
            )}
          >
            {value}
          </p>
          {meta && <p className="mt-1 text-xs text-muted-foreground">{meta}</p>}
        </div>
        <Copy className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
      </button>
      <div className="flex items-start gap-1 p-2">
        {link && (
          <TooltipWrapper tooltipText="Open link">
            <Button variant="ghost" size="icon-sm" asChild>
              <a href={value} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
              </a>
            </Button>
          </TooltipWrapper>
        )}
        {actions}
      </div>
    </div>
  );
};
