"use client";

import { Editor } from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppThemeContext } from "@/context/theme";
import ButtonTools from "../button-tools";
import useEditor from "./usecase/use-editor";

// Re-measure on window resize / rotation so the editor never overflows.
const EDITOR_OPTIONS = { automaticLayout: true };

const EDITOR_THEME = {
  dark: "vs-dark",
  light: "vs-light",
};

export default function JsonEditor() {
  const {
    beautified,
    raw,
    onBeautifiedChange,
    setRaw,
    handleCopyRawText,
    handleCopyBeautifiedText,
    handleClearRawText,
    handleClearBeautifiedText,
  } = useEditor();
  const { theme } = useAppThemeContext();
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:gap-2">
      <div className="min-w-0 flex-1">
        <ButtonTools
          onClickCopy={handleCopyRawText}
          onClickClear={handleClearRawText}
        />
        <div className="h-[45vh] md:h-[70vh]">
          <Editor
            height="100%"
            options={EDITOR_OPTIONS}
            defaultLanguage="json"
            loading={<Skeleton className="h-full w-full rounded-md" />}
            value={raw}
            theme={EDITOR_THEME[theme]}
            onChange={(v) => setRaw(v || "")}
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <ButtonTools
          onClickCopy={handleCopyBeautifiedText}
          onClickClear={handleClearBeautifiedText}
        />
        <div className="h-[45vh] md:h-[70vh]">
          <Editor
            height="100%"
            options={EDITOR_OPTIONS}
            defaultLanguage="json"
            loading={<Skeleton className="h-full w-full rounded-md" />}
            value={beautified}
            theme={EDITOR_THEME[theme]}
            onChange={onBeautifiedChange}
          />
        </div>
      </div>
    </div>
  );
}
