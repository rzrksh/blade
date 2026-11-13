import {
  CircleCheck,
  CircleX,
  Copy,
  Edit,
  Eye,
  EyeClosed,
  ListChevronsDownUp,
  ListChevronsUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { URLNode } from "../../models";

interface Props {
  draftNode: URLNode;
  collapsed: boolean;
  isEdit: boolean;
  isShowFullUrl: boolean;
  handleCollapse: () => void;
  handleCopy: () => void;
  handleClickEdit: () => void;
  handleConfirmChange: () => void;
  handleCancelChange: () => void;
  handleToggleShowFullURL: () => void;
}

export const UrlNodeHeader = ({
  draftNode,
  collapsed,
  isEdit,
  isShowFullUrl,
  handleCollapse,
  handleCopy,
  handleClickEdit,
  handleCancelChange,
  handleConfirmChange,
  handleToggleShowFullURL,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 dark:bg-[var(--header-section)] rounded-xl p-2">
      <div className="flex min-w-0 flex-wrap gap-2 items-center">
        <Button
          variant="ghost"
          className="w-[40px]"
          onClick={handleCollapse}
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ListChevronsUpDown /> : <ListChevronsDownUp />}
        </Button>
        <Label className="flex-wrap">
          {draftNode.level && (
            <Badge
              className="bg-gray-200 dark:bg-lime-400 dark:text-black"
              variant="secondary"
            >
              URL Level {draftNode.level}
            </Badge>
          )}

          <Badge
            className="bg-gray-200 dark:bg-lime-400 dark:text-black"
            variant="secondary"
          >
            {draftNode.level === 1
              ? "root"
              : `Parent Key: ${draftNode.parentURLParam}`}
          </Badge>
        </Label>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {isEdit ? (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleConfirmChange}
              aria-label="Confirm"
            >
              <CircleCheck /> <span className="hidden sm:inline">Confirm</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancelChange}
              aria-label="Cancel"
            >
              <CircleX /> <span className="hidden sm:inline">Cancel</span>
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleClickEdit}
            aria-label="Edit"
          >
            <Edit /> <span className="hidden sm:inline">Edit</span>
          </Button>
        )}
        {!isEdit && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              aria-label="Copy"
            >
              <Copy /> <span className="hidden sm:inline">Copy</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleShowFullURL}
              aria-label="Toggle full URL"
            >
              {isShowFullUrl ? <Eye /> : <EyeClosed />}{" "}
              <span className="hidden sm:inline">Full URL</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
