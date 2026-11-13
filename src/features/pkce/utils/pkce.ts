import type { ChallengeMethod, PkcePair } from "../models";

/** RFC 7636 §4.1: unreserved characters allowed in a code_verifier. */
export const UNRESERVED =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
export const MIN_LENGTH = 43;
export const MAX_LENGTH = 128;
export const DEFAULT_LENGTH = 64;

const VERIFIER_PATTERN = /^[A-Za-z0-9\-._~]+$/;
// Largest multiple of the alphabet size that fits in a byte, to avoid modulo bias.
const REJECT_FROM = 256 - (256 % UNRESERVED.length);

/** Cryptographically random code_verifier of `length` unreserved characters. */
export const generateVerifier = (length = DEFAULT_LENGTH) => {
  let verifier = "";
  while (verifier.length < length) {
    for (const byte of crypto.getRandomValues(new Uint8Array(length))) {
      if (byte < REJECT_FROM && verifier.length < length) {
        verifier += UNRESERVED[byte % UNRESERVED.length];
      }
    }
  }
  return verifier;
};

/** Returns why a verifier is invalid, or "" when it's valid. */
export const validateVerifier = (verifier: string) => {
  if (verifier.length < MIN_LENGTH || verifier.length > MAX_LENGTH) {
    return `Must be ${MIN_LENGTH}–${MAX_LENGTH} characters (now ${verifier.length}).`;
  }
  if (!VERIFIER_PATTERN.test(verifier)) {
    return "Only A–Z, a–z, 0–9 and - . _ ~ are allowed.";
  }
  return "";
};

export const base64UrlEncode = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

export const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(" ");

/** code_challenge for a verifier. S256 needs crypto.subtle (HTTPS or localhost). */
export const createChallenge = async (
  verifier: string,
  method: ChallengeMethod,
): Promise<PkcePair> => {
  if (method === "plain") return { hashHex: "", challenge: verifier };

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier),
  );
  const hash = new Uint8Array(digest);
  return { hashHex: toHex(hash), challenge: base64UrlEncode(hash) };
};
