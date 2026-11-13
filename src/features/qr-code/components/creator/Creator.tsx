"use client";

import { Download, QrCode } from "lucide-react";
import TooltipWrapper from "@/components/composition/tooltip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useView } from "./usecase/use-view";

export const Creator = () => {
  const { value, dataUrl, error, handleChangeValue, handleSave } = useView();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="gap-3 p-4">
        <Label htmlFor="qr-input">URL or text</Label>
        <Textarea
          id="qr-input"
          placeholder="https://example.com"
          value={value}
          onChange={(event) => handleChangeValue(event.target.value)}
          className="min-h-32 font-mono"
          autoFocus
        />
        <p className="text-xs text-muted-foreground">
          {value.length} characters
        </p>
      </Card>

      <Card className="gap-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">QR code</h3>
          <TooltipWrapper tooltipText="Save as PNG">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleSave}
              disabled={!dataUrl}
              aria-label="Save as PNG"
            >
              <Download />
            </Button>
          </TooltipWrapper>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {dataUrl ? (
            // biome-ignore lint/performance/noImgElement: generated data URL, next/image can't optimize it
            <img
              src={dataUrl}
              alt={`QR code for ${value}`}
              className="aspect-square w-full max-w-72 rounded-md border"
            />
          ) : (
            <div className="flex aspect-square w-full max-w-72 flex-col items-center justify-center gap-3 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
              <QrCode className="size-8" />
              {error || "Type a URL or text to generate a QR code."}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
