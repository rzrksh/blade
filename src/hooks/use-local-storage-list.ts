import { useCallback, useSyncExternalStore } from "react";
import type { StorageKey } from "@/constants/storage-keys";

type Snapshot = { raw: string | null; value: unknown[] };

const EMPTY: never[] = [];
const snapshots = new Map<string, Snapshot>();
const listeners = new Map<string, Set<() => void>>();

const getRaw = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const readList = <T>(key: string): T[] => {
  const raw = getRaw(key);
  const cached = snapshots.get(key);
  if (cached && cached.raw === raw) return cached.value as T[];

  let value: unknown[] = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : EMPTY;
    if (Array.isArray(parsed)) value = parsed;
  } catch {
    // Corrupt entry: treat as empty rather than crash the page.
  }
  snapshots.set(key, { raw, value });
  return value as T[];
};

const writeList = <T>(key: string, next: T[]) => {
  const raw = JSON.stringify(next);
  try {
    localStorage.setItem(key, raw);
    snapshots.set(key, { raw, value: next });
  } catch {
    // Storage full or blocked: keep the change in memory for this session.
    snapshots.set(key, { raw: getRaw(key), value: next });
  }
  for (const listener of listeners.get(key) ?? []) listener();
};

const subscribe = (key: string, listener: () => void) => {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(listener);

  // Keep other tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === key) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    set.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

/**
 * A JSON array persisted in localStorage under `key`. Every component using the
 * same key shares one list and re-renders when it changes (also across tabs).
 */
export const useLocalStorageList = <T>(key: StorageKey) => {
  const items = useSyncExternalStore(
    useCallback((listener: () => void) => subscribe(key, listener), [key]),
    () => readList<T>(key),
    () => EMPTY as T[],
  );

  const update = useCallback(
    (updater: (prev: T[]) => T[]) => writeList(key, updater(readList<T>(key))),
    [key],
  );

  return [items, update] as const;
};
