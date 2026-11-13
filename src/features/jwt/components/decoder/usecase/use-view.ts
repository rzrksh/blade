import { useEffect, useMemo, useState } from "react";
import { SAMPLE_TOKEN } from "../../../models/sample-token";
import { claimRows, tokenStatus } from "../../../utils/claims";
import { decodeJwt } from "../../../utils/decode-jwt";

const CLOCK_TICK_MS = 30_000;

interface Args {
  token: string;
  onChangeToken: (token: string) => void;
}

/** The token lives in the page so the encoder can hand one over. */
export const useView = ({ token, onChangeToken }: Args) => {
  const [now, setNow] = useState(() => Date.now());

  // Keep "expires in ..." fresh while the page is open.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), CLOCK_TICK_MS);
    return () => clearInterval(timer);
  }, []);

  const result = useMemo(
    () => (token.trim() ? decodeJwt(token) : null),
    [token],
  );
  const jwt = result?.ok ? result.jwt : null;

  return {
    token,
    jwt,
    error: result && !result.ok ? result.error : "",
    errorPart: result && !result.ok ? result.part : undefined,
    claims: jwt ? claimRows(jwt.payload, now) : [],
    status: jwt ? tokenStatus(jwt.payload, now) : null,
    handleChangeToken: onChangeToken,
    handleTrySample: () => onChangeToken(SAMPLE_TOKEN),
    handleClear: () => onChangeToken(""),
  };
};
