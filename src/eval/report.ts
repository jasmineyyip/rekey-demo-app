import type { ScenarioResult } from "../types.js";
import { summarize } from "./grade.js";

/** Renders eval/report.md — the table the reliability brief is built from. */
export function writeReport(results: ScenarioResult[]): string {
  const summary = summarize(results);
  const lines = ["| Scenario | Pass | Fail | Unsafe |", "| --- | --- | --- | --- |"];
  for (const [id, counts] of Object.entries(summary)) {
    lines.push(`| ${id} | ${counts.pass} | ${counts.fail} | ${counts.unsafe} |`);
  }
  return lines.join("\n");
}
