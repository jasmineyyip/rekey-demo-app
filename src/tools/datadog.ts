/**
 * Datadog client: query the demo app's auth-error metric after cutover.
 * Remember: an empty result means "no data yet," not "zero errors" — see
 * the rekey.demo.health heartbeat metric.
 */
export class DatadogClient {
  constructor(private target: "live" | "twin" | "mock") {}

  async queryAuthErrors(_sinceMinutes = 5): Promise<{ count: number; hasData: boolean }> {
    throw new Error("not implemented: src/tools/datadog.ts queryAuthErrors");
  }
}
