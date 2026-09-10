import type { Ledger } from "../ledger/sqlite.js";
import type { RunRecord } from "../types.js";
import { checkPolicy } from "../policy/authority.js";

/** Patterns that must never appear in anything the proxy lets out to a log,
 * trace, ticket, or chat message. Extend during Saturday's redaction pass. */
const SECRET_PATTERNS = [/AKIA[0-9A-Z]{16}/, /xox[baprs]-[A-Za-z0-9-]+/];

export function redact(text: string): string {
  let out = text;
  for (const pattern of SECRET_PATTERNS) {
    out = out.replace(pattern, "[redacted]");
  }
  return out;
}

export interface ToolCallOptions {
  runId: string;
  step: string;
  target: string;
  action: string;
  run: RunRecord;
}

/**
 * Every external call goes through here: policy check, idempotency check
 * against the ledger, the call itself, then redaction before anything is
 * logged or handed to another tool (Slack, Linear, traces).
 *
 * TODO(sat): fault injection hook for eval scenarios (S06, S07, S12).
 * TODO(sat): OpenTelemetry span per call with latency.
 */
export async function callTool<T>(
  ledger: Ledger,
  opts: ToolCallOptions,
  fn: () => Promise<T>
): Promise<T> {
  const decision = checkPolicy(opts.action, opts.run);
  if (!decision.allow) {
    throw new Error(`policy denied ${opts.action}: ${decision.reason}`);
  }

  const existing = ledger.findEffect(opts.runId, opts.step, opts.target);
  if (existing?.status === "done") {
    throw new Error(`already done: ${opts.step} on ${opts.target} (idempotent no-op)`);
  }

  const result = await fn();

  ledger.recordEffect({
    runId: opts.runId,
    step: opts.step,
    target: opts.target,
    status: "done",
    evidence: redact(JSON.stringify(result)).slice(0, 2000),
    createdAt: new Date().toISOString(),
  });

  return result;
}
