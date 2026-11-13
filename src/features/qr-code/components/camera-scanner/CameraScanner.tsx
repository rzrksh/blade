"use client";

import { CameraOff, Loader2 } from "lucide-react";
import { useView } from "./usecase/use-view";

interface Props {
  onDetected: (value: string) => void;
}

export const CameraScanner = ({ onDetected }: Props) => {
  const { videoRef, status, error } = useView({ onDetected });

  if (status === "error") {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center">
        <CameraOff className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground max-w-xs">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        muted
      />
      {status === "starting" ? (
        <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-white/80">
          <Loader2 className="size-4 animate-spin" />
          Starting camera...
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="aspect-square h-3/5 rounded-xl border-2 border-white/70 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
        </div>
      )}
    </div>
  );
};
