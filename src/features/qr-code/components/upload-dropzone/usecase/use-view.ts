import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const firstImage = (files: FileList | null | undefined) =>
  Array.from(files ?? []).find((file) => file.type.startsWith("image/"));

/** File picking for the dropzone: click to browse, drag and drop, and paste. */
export const useView = ({ onFile }: { onFile: (file: File) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onFileRef = useRef(onFile);
  const [dragging, setDragging] = useState(false);

  onFileRef.current = onFile;

  // Paste an image from the clipboard anywhere on the page.
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const file = firstImage(event.clipboardData?.files);
      if (file) onFileRef.current(file);
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleBrowse = () => inputRef.current?.click();

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = firstImage(event.dataTransfer.files);
    if (file) onFile(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = firstImage(event.target.files);
    if (file) onFile(file);
    event.target.value = "";
  };

  return {
    inputRef,
    dragging,
    handleBrowse,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
  };
};
