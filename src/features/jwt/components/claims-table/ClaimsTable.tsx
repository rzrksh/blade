import type { ClaimRow } from "../../models";

export const ClaimsTable = ({ claims }: { claims: ClaimRow[] }) => (
  <dl className="divide-y rounded-lg border">
    {claims.map((claim) => (
      <div
        key={claim.key}
        className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-3 px-3 py-2 text-sm"
      >
        <dt className="text-muted-foreground">
          {claim.label}{" "}
          <code className="font-mono text-xs opacity-70">{claim.key}</code>
        </dt>
        <dd className="min-w-0 break-words">
          {claim.value}
          {claim.detail && (
            <span className="block text-xs text-muted-foreground">
              {claim.detail}
            </span>
          )}
        </dd>
      </div>
    ))}
  </dl>
);
