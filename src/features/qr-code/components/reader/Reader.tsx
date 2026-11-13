"use client";

import { Bookmark, BookmarkCheck, Camera, Trash2, Upload } from "lucide-react";
import { Segmented } from "@/components/composition/segmented";
import TooltipWrapper from "@/components/composition/tooltip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CameraScanner } from "../camera-scanner";
import { UploadDropzone } from "../upload-dropzone";
import { ValueCard } from "../value-card";
import { useView } from "./usecase/use-view";

const dateFormat = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const Reader = () => {
  const {
    source,
    result,
    previewUrl,
    emptyMessage,
    isResultSaved,
    savedItems,
    handleChangeSource,
    handleFile,
    handleDetected,
    handleSaveResult,
    handleRemoveSaved,
  } = useView();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="gap-4 p-4">
        <Segmented
          label="QR source"
          value={source}
          onChange={handleChangeSource}
          className="self-start"
          options={[
            { value: "upload", label: "Upload", icon: <Upload /> },
            { value: "camera", label: "Camera", icon: <Camera /> },
          ]}
        />
        {source === "upload" ? (
          <UploadDropzone onFile={handleFile} previewUrl={previewUrl} />
        ) : (
          <CameraScanner onDetected={handleDetected} />
        )}
      </Card>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Result</h3>
          {result !== null ? (
            <ValueCard
              value={result}
              size="lg"
              meta="Click to copy"
              actions={
                <TooltipWrapper tooltipText={isResultSaved ? "Saved" : "Save"}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleSaveResult}
                    disabled={isResultSaved}
                    aria-label={isResultSaved ? "Saved" : "Save"}
                  >
                    {isResultSaved ? (
                      <BookmarkCheck className="text-lime-600 dark:text-lime-400" />
                    ) : (
                      <Bookmark />
                    )}
                  </Button>
                </TooltipWrapper>
              }
            />
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Saved{savedItems.length > 0 && ` (${savedItems.length})`}
          </h3>
          {savedItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing saved yet. Saved results stay in this browser.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {savedItems.map((item) => (
                <li key={item.id}>
                  <ValueCard
                    value={item.value}
                    meta={dateFormat.format(item.savedAt)}
                    actions={
                      <TooltipWrapper tooltipText="Delete">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveSaved(item.id)}
                          aria-label="Delete"
                        >
                          <Trash2 />
                        </Button>
                      </TooltipWrapper>
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
