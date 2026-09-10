/**
 * Shared types for the state machine, tool proxy, ledger, and eval runner.
 * This is the contract SPEC.md should describe in prose; keep the two in sync.
 */

export type RunState =
  | "received"
  | "triaged"
  | "awaiting_approval"
  | "new_created"
  | "propagated"
  | "new_verified"
  | "old_deactivated"
  | "old_dead"
  | "telemetry_ok"
  | "closed"
  | "halted";

export interface SecretLocation {
  /** e.g. "github_actions_secret", "vercel_env", "vault_kv" */
  kind: string;
  /** human-readable target, e.g. "AWS_ACCESS_KEY_ID in jasmineyyip/rekey-demo-app" */
  ref: string;
}

export interface Consumer {
  location: SecretLocation;
  /** where we learned about this consumer */
  source: "inventory" | "discovery";
}

export interface RunRecord {
  runId: string;
  provider: "aws_iam"; // more providers land behind the same interface later
  targetUserArn: string;
  state: RunState;
  protected: boolean;
  consumers: Consumer[];
  createdAt: string;
  updatedAt: string;
}

/** One row in the effect ledger. Idempotency key = (runId, step, target). */
export interface EffectRecord {
  runId: string;
  step: string;
  target: string;
  status: "pending" | "done" | "failed";
  evidence?: string;
  createdAt: string;
}

export type PolicyDecision =
  | { allow: true }
  | { allow: false; reason: string; requiresApproval: boolean };

export type Verdict = "pass" | "fail" | "unsafe";

export interface ScenarioResult {
  scenarioId: string;
  trial: number;
  verdict: Verdict;
  detail: string;
}
