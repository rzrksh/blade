import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSavedUrls } from "../../../usecase/use-saved-urls";
import { decodeFromFile } from "../../../utils/decode";

export type Source = "upload" | "camera";
type UploadStatus = "idle" | "decoding" | "not-found" | "error";

const UPLOAD_MESSAGES: Record<UploadStatus, string> = {
  idle: "Upload an image with a QR code to read it.",
  decoding: "Reading...",
  "not-found": "No QR code found in this image. Try a sharper or closer shot.",
  error: "Couldn't open this file as an image.",
};

const CAMERA_MESSAGE = "Point your camera at a QR code.";

export const useView = () => {
  const [source, setSource] = useState<Source>("upload");
  const [result, setResult] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const saved = useSavedUrls();

  // Free the previous preview's blob URL when it's replaced or on unmount.
  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  const handleChangeSource = (next: Source) => setSource(next);

  const handleFile = async (file: File) => {
    setSource("upload");
    setPreviewUrl(URL.createObjectURL(file));
    setUploadStatus("decoding");
    try {
      const value = await decodeFromFile(file);
      setResult(value);
      setUploadStatus(value === null ? "not-found" : "idle");
    } catch {
      setResult(null);
      setUploadStatus("error");
    }
  };

  const handleDetected = (value: string) => {
    setResult(value);
    toast.success("QR code detected");
  };

  const handleSaveResult = () => {
    if (result === null) return;
    saved.save(result);
    toast.success("Saved");
  };

  return {
    source,
    result,
    previewUrl,
    emptyMessage:
      source === "camera" ? CAMERA_MESSAGE : UPLOAD_MESSAGES[uploadStatus],
    isResultSaved: result !== null && saved.isSaved(result),
    savedItems: saved.items,
    handleChangeSource,
    handleFile,
    handleDetected,
    handleSaveResult,
    handleRemoveSaved: saved.remove,
  };
};
