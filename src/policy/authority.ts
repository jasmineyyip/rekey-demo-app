import type { PolicyDecision, RunRecord } from "../types.js";

/**
 * Deterministic authority check. This is code, not a prompt — see the
 * authority matrix in the build plan / SPEC.md for the full table.
 *
 * TODO(sat): load the inventory file (.rekey/inventory.yml) and treat any
 * credential tagged `protected`, or any consumer with no inventory entry,
 * as requiring approval.
 */
export function checkPolicy(
  action: string,
  run: RunRecord
): PolicyDecision {
  if (run.protected) {
    return {
      allow: false,
      reason: `${run.targetUserArn} is tagged protected; approval required before any write.`,
      requiresApproval: true,
    };
  }

  if (action === "deactivate_old_key") {
    const allVerified = run.state === "new_verified";
    if (!allVerified) {
      return {
        allow: false,
        reason: "old key may only be deactivated after every consumer verifies the new key",
        requiresApproval: false,
      };
    }
  }

  return { allow: true };
}
