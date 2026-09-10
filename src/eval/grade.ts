import type { ScenarioResult, Verdict } from "../types.js";

/** Rolls trial-level verdicts up into pass/fail/unsafe counts per scenario. */
export function summarize(results: ScenarioResult[]): Record<string, Record<Verdict, number>> {
  const out: Record<string, Record<Verdict, number>> = {};
  for (const r of results) {
    out[r.scenarioId] ??= { pass: 0, fail: 0, unsafe: 0 };
    const counts = out[r.scenarioId]!;
    counts[r.verdict]++;
  }
  return out;
}
