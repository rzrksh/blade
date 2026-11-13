import jsQR from "jsqr";

const MAX_DIMENSION = 1600;

let sharedCanvas: HTMLCanvasElement | null = null;

const getContext = (width: number, height: number) => {
  sharedCanvas ??= document.createElement("canvas");
  sharedCanvas.width = width;
  sharedCanvas.height = height;
  return sharedCanvas.getContext("2d", { willReadFrequently: true });
};

/** Draws a source onto a canvas (scaled down to maxDimension) and decodes any QR code in it. */
export const decodeFromSource = (
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  maxDimension = MAX_DIMENSION,
): string | null => {
  if (!sourceWidth || !sourceHeight) return null;

  const scale = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
  const width = Math.round(sourceWidth * scale);
  const height = Math.round(sourceHeight * scale);
  const ctx = getContext(width, height);
  if (!ctx) return null;

  ctx.drawImage(source, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);
  const code = jsQR(data, width, height, { inversionAttempts: "attemptBoth" });

  return code ? code.data : null;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });

export const decodeFromFile = async (file: File): Promise<string | null> => {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    // SVGs without an intrinsic size report 0; give them a sensible canvas size.
    const width = img.naturalWidth || 1024;
    const height = img.naturalHeight || 1024;
    return decodeFromSource(img, width, height);
  } finally {
    URL.revokeObjectURL(url);
  }
};
