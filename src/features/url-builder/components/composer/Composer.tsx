"use client";

import {
  Bookmark,
  BookmarkCheck,
  CircleX,
  Copy,
  FlaskConical,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUrlBuilderContext } from "../../context/url-builder.context";
import { DEMO_URL } from "../../models/demo-url";
import { useSavedUrls } from "../../usecase/use-saved-urls";
import { isValidURL } from "../../utils/is-valid-url";
import DialogSave from "../saved-url/DialogSave";
import { URLDecomposerTree } from "./UrlDecomposerTree";

export const Composer = () => {
  const { urlTree, urlInput, handleChangeTextUrl } = useUrlBuilderContext();
  const { findByUrl } = useSavedUrls();
  const [saveOpen, setSaveOpen] = useState(false);
  const savedAs = findByUrl(urlInput);

  return (
    <Card className="min-w-0">
      <DialogSave url={urlInput} open={saveOpen} onOpenChange={setSaveOpen} />
      <CardHeader className="has-data-[slot=card-action]:grid-cols-1 sm:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <CardTitle>URL Composer</CardTitle>
        <CardDescription>
          Turn messy, encoded URLs into human-readable data. Compose your URL
          worry free.
        </CardDescription>
        <CardAction className="col-start-1 row-start-3 justify-self-start sm:col-start-2 sm:row-start-1 sm:justify-self-end">
          <div className="flex flex-wrap gap-2">
            {isValidURL(urlInput) &&
              (savedAs ? (
                <Button size="sm" variant="outline" disabled>
                  <BookmarkCheck className="text-lime-600 dark:text-lime-400" />
                  <span className="max-w-32 truncate">
                    Saved: {savedAs.name}
                  </span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSaveOpen(true)}
                >
                  <Bookmark /> <span>Save</span>
                </Button>
              ))}
            {urlInput && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(urlInput);
                  toast.success("URL Copied!");
                }}
              >
                <Copy /> <span>Copy URL</span>
              </Button>
            )}
            {!urlInput && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleChangeTextUrl(DEMO_URL)}
              >
                <FlaskConical /> <span>Try</span>
              </Button>
            )}
            {urlInput && (
              <Button
                size="sm"
                variant="outline"
                className="border-red-100"
                onClick={() => handleChangeTextUrl("")}
              >
                <CircleX className="text-red-500" />{" "}
                <span className="text-red-500">Clear</span>
              </Button>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Label className="mb-2" htmlFor="base-url">
          URL
        </Label>
        <Textarea
          className="mb-5 min-h-40"
          id="base-url"
          placeholder="Type any URL"
          value={urlInput}
          onChange={(e) => handleChangeTextUrl(e.target.value)}
        />
        {urlTree && (
          <div className="mt-8">
            <Label className="mb-2">URL Tree</Label>
            <URLDecomposerTree urlNode={urlTree} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
