import type {
  Algorithm,
  AlgorithmFamily,
  JsonObject,
  KeyPairPem,
} from "../models";
import { bytesToBase64Url, textToBase64Url } from "./base64url";

const CURVES: Record<string, string> = {
  "256": "P-256",
  "384": "P-384",
  "512": "P-521",
};

export const familyOf = (alg: Algorithm) => alg.slice(0, 2) as AlgorithmFamily;

const bitsOf = (alg: Algorithm) => alg.slice(2);

const hashOf = (alg: Algorithm) => `SHA-${bitsOf(alg)}`;

/** RFC 7518 §3.2: an HMAC key should be at least as long as the hash output. */
export const minSecretBytes = (alg: Algorithm) => Number(bitsOf(alg)) / 8;

const importParams = (alg: Algorithm) => {
  const hash = hashOf(alg);
  switch (familyOf(alg)) {
    case "HS":
      return { name: "HMAC", hash };
    case "RS":
      return { name: "RSASSA-PKCS1-v1_5", hash };
    case "PS":
      return { name: "RSA-PSS", hash };
    case "ES":
      return { name: "ECDSA", namedCurve: CURVES[bitsOf(alg)] };
  }
};

const signParams = (alg: Algorithm) => {
  switch (familyOf(alg)) {
    case "PS":
      return { name: "RSA-PSS", saltLength: Number(bitsOf(alg)) / 8 };
    case "ES":
      return { name: "ECDSA", hash: hashOf(alg) };
    default:
      return importParams(alg);
  }
};

const PEM_HINTS: Record<string, string> = {
  "RSA PRIVATE KEY":
    "This is a PKCS#1 key. Convert it to PKCS#8: openssl pkcs8 -topk8 -nocrypt -in key.pem",
  "EC PRIVATE KEY":
    "This is a SEC1 key. Convert it to PKCS#8: openssl pkcs8 -topk8 -nocrypt -in key.pem",
  "ENCRYPTED PRIVATE KEY":
    "Encrypted keys aren't supported. Decrypt it first: openssl pkcs8 -in key.pem -nocrypt",
};

const pemToDer = (pem: string) => {
  const label = pem.match(/-----BEGIN ([A-Z ]+)-----/)?.[1];
  if (label && PEM_HINTS[label]) throw new Error(PEM_HINTS[label]);
  const body = pem
    .replace(/-----(BEGIN|END) [A-Z ]+-----/g, "")
    .replace(/\s+/g, "");
  return Uint8Array.from(atob(body), (char) => char.charCodeAt(0));
};

const derToPem = (der: ArrayBuffer, label: string) => {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(der)));
  const lines = base64.match(/.{1,64}/g)?.join("\n") ?? "";
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
};

const importSigningKey = async (alg: Algorithm, key: string) => {
  if (familyOf(alg) === "HS") {
    return crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      importParams(alg),
      false,
      ["sign"],
    );
  }

  let der: Uint8Array<ArrayBuffer>;
  try {
    der = pemToDer(key);
  } catch (error) {
    throw new Error(
      error instanceof Error && error.message.startsWith("This is")
        ? error.message
        : "The private key isn't valid PEM.",
    );
  }

  try {
    return await crypto.subtle.importKey(
      "pkcs8",
      der,
      importParams(alg),
      false,
      ["sign"],
    );
  } catch {
    throw new Error(
      `Couldn't use this key for ${alg}. Paste a PKCS#8 private key (-----BEGIN PRIVATE KEY-----) of the right type.`,
    );
  }
};

/** Signs header.payload with `key` (an HMAC secret, or a PKCS#8 PEM private key). */
export const signJwt = async ({
  alg,
  header,
  payload,
  key,
}: {
  alg: Algorithm;
  header: JsonObject;
  payload: JsonObject;
  key: string;
}) => {
  const signingInput = `${textToBase64Url(JSON.stringify(header))}.${textToBase64Url(JSON.stringify(payload))}`;
  const cryptoKey = await importSigningKey(alg, key);
  const signature = await crypto.subtle.sign(
    signParams(alg),
    cryptoKey,
    new TextEncoder().encode(signingInput),
  );
  return `${signingInput}.${bytesToBase64Url(new Uint8Array(signature))}`;
};

/** A fresh key pair for an asymmetric algorithm, as PKCS#8 / SPKI PEM. */
export const generateKeyPair = async (alg: Algorithm): Promise<KeyPairPem> => {
  const params =
    familyOf(alg) === "ES"
      ? importParams(alg)
      : {
          ...importParams(alg),
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
        };
  const pair = (await crypto.subtle.generateKey(params, true, [
    "sign",
    "verify",
  ])) as CryptoKeyPair;

  const [privateDer, publicDer] = await Promise.all([
    crypto.subtle.exportKey("pkcs8", pair.privateKey),
    crypto.subtle.exportKey("spki", pair.publicKey),
  ]);
  return {
    privateKey: derToPem(privateDer, "PRIVATE KEY"),
    publicKey: derToPem(publicDer, "PUBLIC KEY"),
  };
};
