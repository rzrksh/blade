import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ChallengeMethod } from "../../models";

// One color per value, used everywhere it appears, so you can follow it.
const VERIFIER = "text-amber-700 dark:text-amber-400";
const HASH = "text-sky-700 dark:text-sky-400";
const CHALLENGE = "text-lime-700 dark:text-lime-400";

interface Props {
  method: ChallengeMethod;
  verifier: string;
  hashHex: string;
  challenge: string;
}

const Step = ({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) => (
  <li className="relative pl-10">
    <span className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full border bg-background text-xs font-semibold">
      {n}
    </span>
    <h4 className="mb-1 pt-0.5 font-medium">{title}</h4>
    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
      {children}
    </div>
  </li>
);

const Value = ({ children, color }: { children: string; color: string }) => (
  <code
    className={cn(
      "block break-all rounded-md border bg-muted/40 px-3 py-2 font-mono text-sm",
      color,
    )}
  >
    {children || "..."}
  </code>
);

const Transform = ({ children }: { children: ReactNode }) => (
  <li className="flex items-center gap-2 pl-10 text-xs text-muted-foreground">
    <ArrowDown className="size-4" />
    <span className="font-mono">{children}</span>
  </li>
);

const Code = ({ children }: { children: ReactNode }) => (
  <pre className="overflow-x-auto rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs leading-relaxed text-foreground">
    {children}
  </pre>
);

export const Explainer = ({ method, verifier, hashHex, challenge }: Props) => {
  const s256 = method === "S256";
  // Steps after the challenge shift by one when there's no hashing step.
  const afterChallenge = s256 ? 4 : 3;

  return (
    <Card>
      <CardHeader>
        <CardTitle>How PKCE turns one value into the other</CardTitle>
        <CardDescription>
          Using the values above. Each value keeps its color, so you can follow
          it from step to step.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <ol className="flex flex-col gap-4">
          <Step n={1} title="Create a code_verifier">
            <p>
              A random secret, {verifier.length || "43–128"} characters long,
              using only A–Z, a–z, 0–9 and - . _ ~. Your app keeps it in memory
              until step {afterChallenge + 1}.
            </p>
            <Value color={VERIFIER}>{verifier}</Value>
          </Step>

          {s256 ? (
            <>
              <Transform>ASCII bytes → SHA-256</Transform>
              <Step n={2} title="Hash it with SHA-256">
                <p>
                  The result is always 32 bytes, however long the verifier is.
                  Hashing is one-way: nobody can get the verifier back from it.
                </p>
                <Value color={HASH}>{hashHex}</Value>
              </Step>
              <Transform>base64url, no padding</Transform>
              <Step n={3} title="Encode the hash: this is the code_challenge">
                <p>
                  Standard base64, then + becomes -, / becomes _, and the
                  trailing = is dropped. 32 bytes always give 43 characters.
                </p>
                <Value color={CHALLENGE}>{challenge}</Value>
              </Step>
            </>
          ) : (
            <>
              <Transform>no transformation</Transform>
              <Step n={2} title="The code_challenge is the verifier itself">
                <p>
                  With <code className="font-mono">plain</code>, anyone who sees
                  the authorization request also sees the secret. Use it only if
                  the server doesn&apos;t support S256.
                </p>
                <Value color={CHALLENGE}>{challenge}</Value>
              </Step>
            </>
          )}
        </ol>

        <ol className="flex flex-col gap-4">
          <Step
            n={afterChallenge}
            title="Send the challenge with the authorization request"
          >
            <p>
              This goes through the browser, so treat it as public. The
              authorization server stores the challenge with the code it issues.
            </p>
            <Code>
              GET /authorize?response_type=code{"\n"}
              {"  "}&amp;client_id=YOUR_CLIENT_ID{"\n"}
              {"  "}&amp;redirect_uri=https://app.example.com/callback{"\n"}
              {"  "}&amp;code_challenge=
              <span className={CHALLENGE}>{challenge}</span>
              {"\n"}
              {"  "}&amp;code_challenge_method={method}
            </Code>
          </Step>
          <Step
            n={afterChallenge + 1}
            title="Send the verifier with the token request"
          >
            <p>
              After the redirect back with{" "}
              <code className="font-mono">code</code>, your app exchanges it,
              adding the original verifier. This call goes directly to the
              server, not through the browser.
            </p>
            <Code>
              POST /token{"\n"}
              grant_type=authorization_code{"\n"}
              &amp;code=AUTHORIZATION_CODE{"\n"}
              &amp;redirect_uri=https://app.example.com/callback{"\n"}
              &amp;client_id=YOUR_CLIENT_ID{"\n"}
              &amp;code_verifier=
              <span className={VERIFIER}>{verifier}</span>
            </Code>
          </Step>
          <Step
            n={afterChallenge + 2}
            title="The server repeats the transformation and compares"
          >
            <Code>
              {s256 ? (
                <>
                  BASE64URL(SHA256(
                  <span className={VERIFIER}>code_verifier</span>))
                  {" == "}
                  <span className={CHALLENGE}>code_challenge</span>
                </>
              ) : (
                <>
                  <span className={VERIFIER}>code_verifier</span>
                  {" == "}
                  <span className={CHALLENGE}>code_challenge</span>
                </>
              )}
            </Code>
            <p>
              If they match, it returns the tokens. If not, it rejects the
              request with <code className="font-mono">invalid_grant</code>.
              That&apos;s the point of PKCE: someone who steals the
              authorization code in transit can&apos;t use it, because they
              never saw the verifier.
            </p>
          </Step>
        </ol>
      </CardContent>
    </Card>
  );
};
