"use client";

import { RefreshCw } from "lucide-react";
import { CopyField } from "@/components/composition/copy-field";
import { Segmented } from "@/components/composition/segmented";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MAX_LENGTH, MIN_LENGTH } from "../../utils/pkce";
import { Explainer } from "../explainer";
import { useView } from "./usecase/use-view";

export const Generator = () => {
  const {
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
  } = useView();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="gap-5 p-4 self-start">
          <div className="flex flex-col gap-2">
            <Label>Challenge method</Label>
            <Segmented
              label="Challenge method"
              value={method}
              onChange={handleChangeMethod}
              className="self-start"
              options={[
                { value: "S256", label: "S256 (recommended)" },
                { value: "plain", label: "plain" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="pkce-length">Verifier length</Label>
              <span className="font-mono text-sm">{length}</span>
            </div>
            <input
              id="pkce-length"
              type="range"
              min={MIN_LENGTH}
              max={MAX_LENGTH}
              value={length}
              onChange={(event) =>
                handleChangeLength(Number(event.target.value))
              }
              className="w-full accent-lime-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{MIN_LENGTH}</span>
              <span>{MAX_LENGTH}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="pkce-verifier">code_verifier</Label>
              <Button size="sm" variant="outline" onClick={handleRegenerate}>
                <RefreshCw /> Regenerate
              </Button>
            </div>
            <Textarea
              id="pkce-verifier"
              value={verifier}
              onChange={(event) => handleChangeVerifier(event.target.value)}
              className="min-h-24 font-mono break-all"
              spellCheck={false}
              aria-invalid={Boolean(verifierError)}
            />
            {verifierError ? (
              <p className="text-sm text-red-600">{verifierError}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Generated with crypto.getRandomValues. You can also paste your
                own to get its challenge.
              </p>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <CopyField
            label="code_verifier"
            value={verifier}
            meta={`${verifier.length} chars`}
          />
          <CopyField
            label="code_challenge"
            value={pair?.challenge ?? ""}
            meta={pair ? `${pair.challenge.length} chars` : undefined}
            display={cryptoError || pair?.challenge || "..."}
            valueClassName={cryptoError ? "text-red-600" : undefined}
          />
          <CopyField label="code_challenge_method" value={method} />
          <p className="text-xs text-muted-foreground">
            Everything is generated in your browser. Nothing is sent anywhere.
          </p>
        </div>
      </div>

      {pair && (
        <Explainer
          method={method}
          verifier={verifier}
          hashHex={pair.hashHex}
          challenge={pair.challenge}
        />
      )}
    </div>
  );
};
