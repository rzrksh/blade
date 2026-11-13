import { useEffect, useState } from "react";
import type { ChallengeMethod, PkcePair } from "../../../models";
import {
  createChallenge,
  DEFAULT_LENGTH,
  generateVerifier,
  validateVerifier,
} from "../../../utils/pkce";

export const useView = () => {
  const [method, setMethod] = useState<ChallengeMethod>("S256");
  const [length, setLength] = useState(DEFAULT_LENGTH);
  const [verifier, setVerifier] = useState("");
  const [pair, setPair] = useState<PkcePair | null>(null);
  const [cryptoError, setCryptoError] = useState("");

  const verifierError = verifier ? validateVerifier(verifier) : "";

  // Generate on the client only, so server and client HTML match.
  useEffect(() => setVerifier(generateVerifier(DEFAULT_LENGTH)), []);

  // Derive the challenge whenever the verifier or method changes.
  useEffect(() => {
    if (!verifier || verifierError) {
      setPair(null);
      return;
    }

    let cancelled = false;
    createChallenge(verifier, method)
      .then((next) => {
        if (cancelled) return;
        setPair(next);
        setCryptoError("");
      })
      .catch(() => {
        if (cancelled) return;
        setPair(null);
        setCryptoError(
          "SHA-256 isn't available here. It needs HTTPS or localhost.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [verifier, method, verifierError]);

  const handleRegenerate = () => setVerifier(generateVerifier(length));

  const handleChangeLength = (next: number) => {
    setLength(next);
    setVerifier(generateVerifier(next));
  };

  const handleChangeVerifier = (next: string) => setVerifier(next.trim());

  const handleChangeMethod = (next: ChallengeMethod) => setMethod(next);

  return {
    method,
    length,
    verifier,
    verifierError,
    cryptoError,
    pair,
    handleRegenerate,
    handleChangeLength,
    handleChangeVerifier,
    handleChangeMethod,
  };
};
