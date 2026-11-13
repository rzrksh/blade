"use client";

import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUrlBuilderContext } from "../../context/url-builder.context";
import { useSavedUrls } from "../../usecase/use-saved-urls";
import { EmptySave } from "./EmptySave";
import { SavedURLItem } from "./SavedURLItem";

export const SavedURL = () => {
  const { items, remove } = useSavedUrls();
  const { urlInput, handleChangeTextUrl, handleSetConfig } =
    useUrlBuilderContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Saved URLs{items.length > 0 && ` (${items.length})`}
        </CardTitle>
        <CardDescription>
          Click one to open it in the composer. Stored only in this browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <EmptySave />
        ) : (
          <ul className="flex max-h-[480px] flex-col gap-2 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id}>
                <SavedURLItem
                  item={item}
                  active={item.url === urlInput}
                  onOpen={() => {
                    handleSetConfig("compose");
                    handleChangeTextUrl(item.url);
                  }}
                  onDelete={() => {
                    remove(item.id);
                    toast.success("Deleted");
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
