import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { isUrl } from "../../../utils/is-url";

const fileNameFor = (value: string) => {
  const base = isUrl(value) ? new URL(value).hostname : "qr-code";
  return `${base.replace(/[^a-z0-9.-]+/gi, "-")}.png`;
};

export const useView = () => {
  const [value, setValue] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Regenerate the QR image whenever the input changes; ignore stale results.
  useEffect(() => {
    if (!value) {
      setDataUrl(null);
      setError("");
      return;
    }

    let cancelled = false;
    QRCode.toDataURL(value, {
      width: 1024,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#ffffff" },
    })
      .then((url) => {
        if (cancelled) return;
        setDataUrl(url);
        setError("");
      })
      .catch(() => {
        if (cancelled) return;
        setDataUrl(null);
        setError("This is too long to fit in a QR code.");
      });

    return () => {
      cancelled = true;
    };
  }, [value]);

  const handleChangeValue = (next: string) => setValue(next);

  const handleSave = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileNameFor(value);
    link.click();
  };

  return { value, dataUrl, error, handleChangeValue, handleSave };
};
