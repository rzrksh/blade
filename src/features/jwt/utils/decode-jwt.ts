import type { DecodeResult, JsonObject, JwtPart } from "../models";
import { base64UrlToBytes } from "./base64url";

const base64UrlToText = (input: string) =>
  new TextDecoder("utf-8", { fatal: true }).decode(base64UrlToBytes(input));

const decodeJsonPart = (
  segment: string,
  part: JwtPart,
):
  | { ok: true; value: JsonObject }
  | { ok: false; error: string; part: JwtPart } => {
  let text: string;
  try {
    text = base64UrlToText(segment);
  } catch {
    return { ok: false, part, error: `The ${part} isn't valid base64url.` };
  }

  try {
    const value: unknown = JSON.parse(text);
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return { ok: false, part, error: `The ${part} must be a JSON object.` };
    }
    return { ok: true, value: value as JsonObject };
  } catch {
    return { ok: false, part, error: `The ${part} isn't valid JSON.` };
  }
};

/** Strips whitespace and an optional "Bearer " prefix from a pasted token. */
export const cleanToken = (input: string) =>
  input
    .trim()
    .replace(/^bearer\s+/i, "")
    .replace(/\s+/g, "");

/** Decodes a JWS-style JWT. Does not verify the signature. */
export const decodeJwt = (input: string): DecodeResult => {
  const token = cleanToken(input);
  const segments = token.split(".");

  if (segments.length === 5) {
    return {
      ok: false,
      error:
        "This looks like an encrypted JWT (JWE). Its payload can only be read with the decryption key.",
    };
  }
  if (segments.length !== 3) {
    return {
      ok: false,
      error: `A JWT has 3 parts separated by dots. This has ${segments.length}.`,
    };
  }

  const [headerSegment, payloadSegment, signature] = segments;
  const header = decodeJsonPart(headerSegment, "header");
  if (!header.ok) return header;
  const payload = decodeJsonPart(payloadSegment, "payload");
  if (!payload.ok) return payload;

  return {
    ok: true,
    jwt: {
      parts: [headerSegment, payloadSegment, signature],
      header: header.value,
      payload: payload.value,
      signature,
    },
  };
};
