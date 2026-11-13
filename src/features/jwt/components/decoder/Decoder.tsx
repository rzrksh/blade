"use client";

import { CircleX, FlaskConical, ShieldAlert } from "lucide-react";
import { CopyField } from "@/components/composition/copy-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { JwtPart, TokenStatus } from "../../models";
import { ClaimsTable } from "../claims-table";
import { PART_DOTS, TokenPreview } from "../token-preview";
import { useView } from "./usecase/use-view";

const STATUS_STYLES: Record<TokenStatus["kind"], string> = {
  active: "border-lime-500/40 bg-lime-500/10 text-lime-700 dark:text-lime-400",
  expired: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400",
  "not-yet-valid":
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "no-expiry": "",
};

const PartLabel = ({ part, children }: { part: JwtPart; children: string }) => (
  <>
    <span className={cn("size-2 rounded-full", PART_DOTS[part])} />
    {children}
  </>
);

const pretty = (value: unknown) => JSON.stringify(value, null, 2);

interface Props {
  token: string;
  onChangeToken: (token: string) => void;
}

export const Decoder = ({ token: tokenProp, onChangeToken }: Props) => {
  const {
    token,
    jwt,
    error,
    claims,
    status,
    handleChangeToken,
    handleTrySample,
    handleClear,
  } = useView({ token: tokenProp, onChangeToken });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="gap-3 p-4 self-start">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="jwt-input">Encoded token</Label>
          {token ? (
            <Button size="sm" variant="outline" onClick={handleClear}>
              <CircleX /> Clear
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={handleTrySample}>
              <FlaskConical /> Try
            </Button>
          )}
        </div>
        <Textarea
          id="jwt-input"
          placeholder="Paste a JWT (eyJhbGciOi...). A Bearer prefix is fine."
          value={token}
          onChange={(event) => handleChangeToken(event.target.value)}
          className="min-h-40 font-mono break-all"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          autoFocus
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {jwt && (
          <div className="rounded-lg border bg-muted/30 p-3">
            <TokenPreview parts={jwt.parts} />
          </div>
        )}
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldAlert className="size-4 shrink-0" />
          Decoding happens in your browser and doesn't verify the signature.
          Anyone can read a JWT, so don't put secrets in one.
        </p>
      </Card>

      <div className="flex flex-col gap-4">
        {jwt ? (
          <>
            {status && (
              <Badge
                variant="outline"
                className={cn("text-sm", STATUS_STYLES[status.kind])}
              >
                {status.text}
              </Badge>
            )}
            <CopyField
              label={<PartLabel part="header">Header</PartLabel>}
              meta={
                typeof jwt.header.alg === "string" ? jwt.header.alg : undefined
              }
              value={pretty(jwt.header)}
            />
            <CopyField
              label={<PartLabel part="payload">Payload</PartLabel>}
              value={pretty(jwt.payload)}
            />
            {claims.length > 0 && <ClaimsTable claims={claims} />}
            <CopyField
              label={<PartLabel part="signature">Signature</PartLabel>}
              meta="base64url"
              value={jwt.signature}
              display={jwt.signature || "(empty: unsigned token)"}
            />
          </>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            Paste a token to see its header, payload and claims.
          </div>
        )}
      </div>
    </div>
  );
};
