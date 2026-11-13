import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Algorithm, JsonObject } from "../../../models";
import {
  familyOf,
  generateKeyPair,
  minSecretBytes,
  signJwt,
} from "../../../utils/sign-jwt";

const pretty = (value: unknown) => JSON.stringify(value, null, 2);

const nowSeconds = () => Math.floor(Date.now() / 1000);

const parseObject = (text: string, part: string) => {
  try {
    const value: unknown = JSON.parse(text);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return { value: value as JsonObject, error: "" };
    }
  } catch {
    // fall through
  }
  return { value: null, error: `The ${part} must be a valid JSON object.` };
};

const initialPayload = () => {
  const iat = nowSeconds();
  return pretty({
    sub: "1234567890",
    name: "Ada Lovelace",
    iat,
    exp: iat + 3600,
  });
};

export const useView = ({
  onOpenInDecoder,
}: {
  onOpenInDecoder: (token: string) => void;
}) => {
  const [alg, setAlg] = useState<Algorithm>("HS256");
  const [headerText, setHeaderText] = useState(() =>
    pretty({ alg: "HS256", typ: "JWT" }),
  );
  const [payloadText, setPayloadText] = useState(initialPayload);
  const [secret, setSecret] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [generating, setGenerating] = useState(false);
  const [token, setToken] = useState("");
  const [signError, setSignError] = useState("");

  const family = familyOf(alg);
  const key = family === "HS" ? secret : privateKey;
  const header = parseObject(headerText, "header");
  const payload = parseObject(payloadText, "payload");
  const inputError = header.error || payload.error;
  const headerAlgMismatch =
    header.value && header.value.alg !== alg
      ? `The header's "alg" doesn't match ${alg}. Verifiers will use the header's value.`
      : "";
  const weakSecret =
    family === "HS" &&
    secret.length > 0 &&
    new TextEncoder().encode(secret).length < minSecretBytes(alg)
      ? `${alg} expects a secret of at least ${minSecretBytes(alg)} bytes.`
      : "";

  // Re-sign whenever any input changes; ignore results from older inputs.
  useEffect(() => {
    const parsedHeader = parseObject(headerText, "header").value;
    const parsedPayload = parseObject(payloadText, "payload").value;
    if (!key || !parsedHeader || !parsedPayload) {
      setToken("");
      setSignError("");
      return;
    }

    let cancelled = false;
    signJwt({ alg, header: parsedHeader, payload: parsedPayload, key })
      .then((next) => {
        if (cancelled) return;
        setToken(next);
        setSignError("");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setToken("");
        setSignError(
          error instanceof Error && error.message
            ? error.message
            : "Couldn't sign the token.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [alg, headerText, payloadText, key]);

  const handleChangeAlg = (next: Algorithm) => {
    if (familyOf(next) !== family) setPublicKey("");
    setAlg(next);
    // Keep the header's "alg" in sync when the header is valid JSON.
    if (header.value) setHeaderText(pretty({ ...header.value, alg: next }));
  };

  const handleSetTimeClaim = (claim: "iat" | "exp") => {
    if (!payload.value) {
      toast.error("Fix the payload JSON first.");
      return;
    }
    const value = claim === "iat" ? nowSeconds() : nowSeconds() + 3600;
    setPayloadText(pretty({ ...payload.value, [claim]: value }));
  };

  const handleGenerateKeyPair = async () => {
    setGenerating(true);
    try {
      const pair = await generateKeyPair(alg);
      setPrivateKey(pair.privateKey);
      setPublicKey(pair.publicKey);
    } catch {
      toast.error(
        "Couldn't generate a key pair here. It needs HTTPS or localhost.",
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleChangePrivateKey = (next: string) => {
    setPrivateKey(next);
    setPublicKey("");
  };

  return {
    alg,
    family,
    headerText,
    payloadText,
    secret,
    privateKey,
    publicKey,
    generating,
    token,
    error: inputError || signError,
    warning: headerAlgMismatch || weakSecret,
    handleChangeAlg,
    handleChangeHeader: (next: string) => setHeaderText(next),
    handleChangePayload: (next: string) => setPayloadText(next),
    handleChangeSecret: (next: string) => setSecret(next),
    handleChangePrivateKey,
    handleSetTimeClaim,
    handleGenerateKeyPair,
    handleOpenInDecoder: () => onOpenInDecoder(token),
  };
};
