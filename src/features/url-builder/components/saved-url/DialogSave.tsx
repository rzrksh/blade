"use client";

import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSavedUrls } from "../../usecase/use-saved-urls";

const MAX_NAME_LENGTH = 60;

const defaultNameFor = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};

interface Props {
  url: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SaveForm = ({ url, onDone }: { url: string; onDone: () => void }) => {
  const { save } = useSavedUrls();
  const [name, setName] = useState(() => defaultNameFor(url));
  const [touched, setTouched] = useState(false);
  const trimmed = name.trim();
  const error = !trimmed
    ? "Give this URL a name."
    : trimmed.length > MAX_NAME_LENGTH
      ? `Keep it under ${MAX_NAME_LENGTH} characters.`
      : "";

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (error) return;
    save({ name: trimmed, url });
    toast.success("URL saved");
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="url-save-name">Name</Label>
        <Input
          id="url-save-name"
          placeholder="e.g. Checkout prod"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setTouched(true);
          }}
          aria-invalid={touched && Boolean(error)}
          autoFocus
          onFocus={(event) => event.target.select()}
        />
        {touched && error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-xs text-muted-foreground break-all line-clamp-2">
          {url}
        </p>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
};

const DialogSave = ({ url, open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Save URL</DialogTitle>
        <DialogDescription>
          Name it so you can find it later. It stays in this browser.
        </DialogDescription>
      </DialogHeader>
      <SaveForm url={url} onDone={() => onOpenChange(false)} />
    </DialogContent>
  </Dialog>
);

export default DialogSave;
