import { Copy, Eraser, FlaskConical } from "lucide-react";
import TooltipWrapper from "@/components/composition/tooltip";
import { Button } from "@/components/ui/button";

interface Props {
  onClickCopy?: () => void;
  onClickClear?: () => void;
  onClickTry?: () => void;
}

const ButtonTools = ({ onClickCopy, onClickClear, onClickTry }: Props) => {
  return (
    <div className="p-2 flex gap-1">
      {onClickCopy && (
        <TooltipWrapper tooltipText="Copy">
          <Button size="sm" variant="outline" onClick={() => onClickCopy()}>
            <Copy />
          </Button>
        </TooltipWrapper>
      )}
      {onClickClear && (
        <TooltipWrapper tooltipText="Clear">
          <Button size="sm" variant="outline" onClick={() => onClickClear()}>
            <Eraser />
          </Button>
        </TooltipWrapper>
      )}
      {onClickTry && (
        <TooltipWrapper tooltipText="Try">
          <Button size="sm" variant="outline" onClick={() => onClickTry()}>
            <FlaskConical />
          </Button>
        </TooltipWrapper>
      )}
    </div>
  );
};

export default ButtonTools;
