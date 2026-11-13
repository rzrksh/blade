import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AlertDialogComposed } from "@/components/composition/alert";
import TooltipWrapper from "@/components/composition/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SavedUrl } from "../../usecase/use-saved-urls";

interface Props {
  item: SavedUrl;
  active: boolean;
  onOpen: () => void;
  onDelete: () => void;
}

export const SavedURLItem = ({ item, active, onOpen, onDelete }: Props) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.url);
      toast.success("URL Copied!");
    } catch {
      toast.error("Couldn't copy to clipboard.");
    }
  };

  return (
    <div
      className={cn(
        "flex items-stretch rounded-lg border transition-colors hover:bg-muted/50",
        active && "border-lime-500/70 bg-lime-500/5",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="min-w-0 flex-1 p-3 text-left"
      >
        <p className="truncate text-sm font-medium">{item.name}</p>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {item.url}
        </p>
      </button>
      <div className="flex items-center gap-1 pr-2">
        <TooltipWrapper tooltipText="Copy">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            aria-label="Copy URL"
          >
            <Copy />
          </Button>
        </TooltipWrapper>
        <AlertDialogComposed
          title={`Delete "${item.name}"?`}
          description="This removes it from your saved URLs in this browser."
          confirmText="Delete"
          onClickConfirm={onDelete}
        >
          <Button variant="ghost" size="icon-sm" aria-label="Delete">
            <Trash2 />
          </Button>
        </AlertDialogComposed>
      </div>
    </div>
  );
};
