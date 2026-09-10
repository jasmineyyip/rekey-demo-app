import type { Ledger } from "../ledger/sqlite.js";
import type { RunRecord } from "../types.js";

/**
 * The actor: drives one run through the state machine in SPEC.md.
 * received -> triaged -> (awaiting_approval) -> new_created -> propagated
 * -> new_verified -> old_deactivated -> old_dead -> telemetry_ok -> closed
 * with a halted branch on any verification failure.
 *
 * The actor never grades its own success — see agent/verifier.ts.
 */
export async function runActor(_ledger: Ledger, _run: RunRecord): Promise<void> {
  throw new Error("not implemented: src/agent/actor.ts runActor — Saturday/Sunday build");
}
