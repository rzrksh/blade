import { v4 as uuid } from "uuid";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { useLocalStorageList } from "@/hooks/use-local-storage-list";

export type SavedUrl = {
  id: string;
  value: string;
  savedAt: number;
};

export const useSavedUrls = () => {
  const [items, update] = useLocalStorageList<SavedUrl>(
    STORAGE_KEYS.qrCodeSavedUrls,
  );

  const isSaved = (value: string) => items.some((item) => item.value === value);

  const save = (value: string) =>
    update((prev) =>
      prev.some((item) => item.value === value)
        ? prev
        : [{ id: uuid(), value, savedAt: Date.now() }, ...prev],
    );

  const remove = (id: string) =>
    update((prev) => prev.filter((item) => item.id !== id));

  return { items, isSaved, save, remove };
};
