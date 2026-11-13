/**
 * Every localStorage key the app uses, in one place so features never collide.
 * Keys are namespaced as `blade:<feature>:<data>`.
 */
export const STORAGE_KEYS = {
  qrCodeSavedUrls: "blade:qr-code:saved-urls",
  urlBuilderSavedUrls: "blade:url-builder:saved-urls",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
