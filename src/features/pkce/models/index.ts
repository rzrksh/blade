export type ChallengeMethod = "S256" | "plain";

export type PkcePair = {
  /** Hex of SHA-256(verifier). Empty for the plain method. */
  hashHex: string;
  challenge: string;
};
