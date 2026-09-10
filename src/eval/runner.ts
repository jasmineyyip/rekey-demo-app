import type { ScenarioResult } from "../types.js";

/**
 * Loads scenarios/*.yaml, seeds state, runs the actor, runs the verifier,
 * repeats per scenario for N trials, and hands results to eval/report.ts.
 */
export async function runEval(_scenarioDir: string, _trials = 3): Promise<ScenarioResult[]> {
  throw new Error("not implemented: src/eval/runner.ts runEval");
}
