import { v4 as uuid } from "uuid";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { useLocalStorageList } from "@/hooks/use-local-storage-list";

export type SavedUrl = {
  id: string;
  name: string;
  url: string;
  savedAt: number;
};

export const useSavedUrls = () => {
  const [items, update] = useLocalStorageList<SavedUrl>(
    STORAGE_KEYS.urlBuilderSavedUrls,
  );

  const findByUrl = (url: string) => items.find((item) => item.url === url);

  const save = ({ name, url }: Pick<SavedUrl, "name" | "url">) =>
    update((prev) => [
      { id: uuid(), name, url, savedAt: Date.now() },
      ...prev.filter((item) => item.url !== url),
    ]);

  const remove = (id: string) =>
    update((prev) => prev.filter((item) => item.id !== id));

  return { items, findByUrl, save, remove };
};
