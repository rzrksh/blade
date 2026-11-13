import { useEffect, useRef, useState } from "react";
import { decodeFromSource } from "../../../utils/decode";

const SCAN_INTERVAL_MS = 250;
const SCAN_MAX_DIMENSION = 720;

export type CameraStatus = "starting" | "scanning" | "error";

const describeError = (error: unknown) => {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError")
      return "Camera permission was denied. Allow it in your browser settings and try again.";
    if (error.name === "NotFoundError" || error.name === "OverconstrainedError")
      return "No camera was found on this device.";
    if (error.name === "NotReadableError")
      return "The camera is being used by another app.";
  }
  return "Couldn't start the camera.";
};

/** Starts the camera on mount, scans frames for QR codes, and stops on unmount. */
export const useView = ({
  onDetected,
}: {
  onDetected: (value: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onDetectedRef = useRef(onDetected);
  const [status, setStatus] = useState<CameraStatus>("starting");
  const [error, setError] = useState("");

  onDetectedRef.current = onDetected;

  useEffect(() => {
    let stream: MediaStream | null = null;
    let frame = 0;
    let cancelled = false;
    let lastScan = 0;
    let lastValue: string | null = null;

    const scan = (time: number) => {
      frame = requestAnimationFrame(scan);
      const video = videoRef.current;
      if (!video || video.readyState < 2 || time - lastScan < SCAN_INTERVAL_MS)
        return;
      lastScan = time;

      const value = decodeFromSource(
        video,
        video.videoWidth,
        video.videoHeight,
        SCAN_MAX_DIMENSION,
      );
      if (value !== null && value !== lastValue) {
        lastValue = value;
        onDetectedRef.current(value);
      }
    };

    const start = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError(
          "Camera access isn't available here. It needs a supported browser over HTTPS.",
        );
        setStatus("error");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        const video = videoRef.current;
        if (cancelled || !video) return;

        video.srcObject = stream;
        await video.play();
        if (cancelled) return;

        setStatus("scanning");
        frame = requestAnimationFrame(scan);
      } catch (err) {
        if (cancelled) return;
        setError(describeError(err));
        setStatus("error");
      }
    };

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      for (const track of stream?.getTracks() ?? []) track.stop();
    };
  }, []);

  return { videoRef, status, error };
};
