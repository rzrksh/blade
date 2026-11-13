"use client";

import { ArrowRightLeft, Clock, KeyRound, Loader2 } from "lucide-react";
import { CopyField } from "@/components/composition/copy-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ALGORITHMS, type Algorithm, type JwtPart } from "../../models";
import { PART_DOTS, TokenPreview } from "../token-preview";
import { useView } from "./usecase/use-view";

const GROUPS: { label: string; family: string }[] = [
  { label: "HMAC (shared secret)", family: "HS" },
  { label: "RSA", family: "RS" },
  { label: "RSA-PSS", family: "PS" },
  { label: "ECDSA", family: "ES" },
];

const PartLabel = ({
  part,
  htmlFor,
  children,
}: {
  part: JwtPart;
  htmlFor: string;
  children: string;
}) => (
  <Label htmlFor={htmlFor} className="flex items-center gap-2">
    <span className={cn("size-2 rounded-full", PART_DOTS[part])} />
    {children}
  </Label>
);

interface Props {
  onOpenInDecoder: (token: string) => void;
}

export const Encoder = ({ onOpenInDecoder }: Props) => {
  const {
    alg,
    family,
    headerText,
    payloadText,
    secret,
    privateKey,
    publicKey,
    generating,
    token,
    error,
    warning,
    handleChangeAlg,
    handleChangeHeader,
    handleChangePayload,
    handleChangeSecret,
    handleChangePrivateKey,
    handleSetTimeClaim,
    handleGenerateKeyPair,
    handleOpenInDecoder,
  } = useView({ onOpenInDecoder });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="gap-5 p-4 self-start">
        <div className="flex flex-col gap-2">
          <Label htmlFor="jwt-alg">Algorithm</Label>
          <Select
            value={alg}
            onValueChange={(value) => handleChangeAlg(value as Algorithm)}
          >
            <SelectTrigger id="jwt-alg" className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GROUPS.map((group) => (
                <SelectGroup key={group.family}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {ALGORITHMS.filter((item) =>
                    item.startsWith(group.family),
                  ).map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <PartLabel part="header" htmlFor="jwt-header">
            Header
          </PartLabel>
          <Textarea
            id="jwt-header"
            value={headerText}
            onChange={(event) => handleChangeHeader(event.target.value)}
            className="min-h-20 font-mono"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <PartLabel part="payload" htmlFor="jwt-payload">
              Payload
            </PartLabel>
            <div className="flex gap-1">
              <Button
                size="xs"
                variant="outline"
                onClick={() => handleSetTimeClaim("iat")}
              >
                <Clock /> iat = now
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={() => handleSetTimeClaim("exp")}
              >
                <Clock /> exp = in 1 hour
              </Button>
            </div>
          </div>
          <Textarea
            id="jwt-payload"
            value={payloadText}
            onChange={(event) => handleChangePayload(event.target.value)}
            className="min-h-40 font-mono"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          {family === "HS" ? (
            <>
              <PartLabel part="signature" htmlFor="jwt-secret">
                Secret
              </PartLabel>
              <Input
                id="jwt-secret"
                value={secret}
                onChange={(event) => handleChangeSecret(event.target.value)}
                placeholder="Enter the shared secret to sign with"
                className="font-mono"
                spellCheck={false}
                autoComplete="off"
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <PartLabel part="signature" htmlFor="jwt-private-key">
                  Private key (PKCS#8 PEM)
                </PartLabel>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={handleGenerateKeyPair}
                  disabled={generating}
                >
                  {generating ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <KeyRound />
                  )}
                  Generate key pair
                </Button>
              </div>
              <Textarea
                id="jwt-private-key"
                value={privateKey}
                onChange={(event) => handleChangePrivateKey(event.target.value)}
                placeholder={
                  "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
                }
                className="min-h-32 font-mono text-xs"
                spellCheck={false}
              />
            </>
          )}
          <p className="text-xs text-muted-foreground">
            Signing happens in your browser. Your key never leaves this page.
          </p>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        {token ? (
          <>
            <CopyField
              label="Encoded token"
              meta={alg}
              value={token}
              display={
                <TokenPreview
                  parts={token.split(".") as [string, string, string]}
                />
              }
            />
            <Button
              variant="outline"
              className="self-start"
              onClick={handleOpenInDecoder}
            >
              <ArrowRightLeft /> Open in decoder
            </Button>
          </>
        ) : (
          <div
            className={cn(
              "rounded-lg border border-dashed p-6 text-center text-sm",
              error ? "text-red-600" : "text-muted-foreground",
            )}
          >
            {error ||
              (family === "HS"
                ? "Enter a secret to sign the token."
                : "Paste a private key or generate a key pair to sign the token.")}
          </div>
        )}
        {warning && (
          <p className="text-sm text-amber-700 dark:text-amber-400">
            {warning}
          </p>
        )}
        {publicKey && (
          <CopyField
            label="Public key (to verify)"
            meta="SPKI PEM"
            value={publicKey}
            valueClassName="text-xs"
          />
        )}
      </div>
    </div>
  );
};
