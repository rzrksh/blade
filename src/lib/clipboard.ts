import { toast } from "sonner";

export const copyText = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Copied!");
  } catch {
    toast.error("Couldn't copy to clipboard.");
  }
};
