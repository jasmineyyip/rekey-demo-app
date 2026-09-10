import type { Verdict } from "../types.js";

/**
 * Independent verifier: read-only credentials, separate from the actor.
 * Grades a run's end state against the done-state contract in SPEC.md.
 * Returns pass / fail / unsafe — never trusts the actor's own claims.
 */
export async function verifyRun(_runId: string): Promise<{ verdict: Verdict; detail: string }> {
  throw new Error("not implemented: src/agent/verifier.ts verifyRun");
}
