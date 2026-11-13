export type JsonObject = Record<string, unknown>;

export type JwtPart = "header" | "payload" | "signature";

export type DecodedJwt = {
  parts: [string, string, string];
  header: JsonObject;
  payload: JsonObject;
  signature: string;
};

export type DecodeResult =
  | { ok: true; jwt: DecodedJwt }
  | { ok: false; error: string; part?: JwtPart };

export type ClaimRow = {
  key: string;
  label: string;
  value: string;
  detail?: string;
};

export type TokenStatus =
  | { kind: "active"; text: string }
  | { kind: "expired"; text: string }
  | { kind: "not-yet-valid"; text: string }
  | { kind: "no-expiry"; text: string };

export const ALGORITHMS = [
  "HS256",
  "HS384",
  "HS512",
  "RS256",
  "RS384",
  "RS512",
  "PS256",
  "PS384",
  "PS512",
  "ES256",
  "ES384",
  "ES512",
] as const;

export type Algorithm = (typeof ALGORITHMS)[number];

export type AlgorithmFamily = "HS" | "RS" | "PS" | "ES";

export type KeyPairPem = { privateKey: string; publicKey: string };
