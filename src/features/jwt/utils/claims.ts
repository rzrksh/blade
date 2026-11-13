import type { ClaimRow, JsonObject, TokenStatus } from "../models";

const CLAIM_LABELS: Record<string, string> = {
  iss: "Issuer",
  sub: "Subject",
  aud: "Audience",
  exp: "Expires",
  nbf: "Not before",
  iat: "Issued at",
  jti: "JWT ID",
  azp: "Authorized party",
  scope: "Scope",
};

const TIME_CLAIMS = new Set(["exp", "nbf", "iat", "auth_time"]);

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
  ["second", 1],
];

const relative = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
const dateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "long",
});

/** "in 3 hours", "2 days ago" for a unix timestamp (seconds). */
export const fromNow = (seconds: number, now = Date.now()) => {
  const diff = seconds - Math.round(now / 1000);
  const [unit, size] =
    UNITS.find(([, unitSeconds]) => Math.abs(diff) >= unitSeconds) ??
    UNITS[UNITS.length - 1];
  return relative.format(Math.round(diff / size), unit);
};

const formatValue = (value: unknown) =>
  typeof value === "string" ? value : JSON.stringify(value);

/** Registered claims (and auth_time) as readable rows, in a stable order. */
export const claimRows = (payload: JsonObject, now = Date.now()): ClaimRow[] =>
  [...Object.keys(CLAIM_LABELS), "auth_time"]
    .filter((key) => key in payload)
    .map((key) => {
      const value = payload[key];
      const label = CLAIM_LABELS[key] ?? "Authenticated at";
      if (TIME_CLAIMS.has(key) && typeof value === "number") {
        return {
          key,
          label,
          value: dateTime.format(value * 1000),
          detail: `${fromNow(value, now)} · ${value}`,
        };
      }
      return { key, label, value: formatValue(value) };
    });

export const tokenStatus = (
  payload: JsonObject,
  now = Date.now(),
): TokenStatus => {
  const nowSeconds = now / 1000;
  const { exp, nbf } = payload;

  if (typeof nbf === "number" && nbf > nowSeconds) {
    return { kind: "not-yet-valid", text: `Valid ${fromNow(nbf, now)}` };
  }
  if (typeof exp !== "number") {
    return { kind: "no-expiry", text: "No expiry" };
  }
  return exp < nowSeconds
    ? { kind: "expired", text: `Expired ${fromNow(exp, now)}` }
    : { kind: "active", text: `Expires ${fromNow(exp, now)}` };
};
