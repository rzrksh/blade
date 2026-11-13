"use client";

import { ImageUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useView } from "./usecase/use-view";

interface Props {
  onFile: (file: File) => void;
  previewUrl: string | null;
}

export const UploadDropzone = ({ onFile, previewUrl }: Props) => {
  const {
    inputRef,
    dragging,
    handleBrowse,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
  } = useView({ onFile });

  return (
    <button
      type="button"
      onClick={handleBrowse}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-muted/50",
        dragging && "border-lime-500 bg-lime-500/10",
      )}
    >
      {previewUrl ? (
        // biome-ignore lint/performance/noImgElement: local blob preview, next/image can't optimize it
        <img
          src={previewUrl}
          alt="Uploaded QR code"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <>
          <ImageUp className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              Drop an image, click to browse, or paste
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, WEBP, SVG. Stays on your device.
            </p>
          </div>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
    </button>
  );
};
