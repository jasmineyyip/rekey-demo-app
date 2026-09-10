/** Vercel client: env var upsert + redeploy + poll for READY. */
export class VercelClient {
  constructor(private target: "live" | "twin" | "mock") {}

  async upsertEnvVar(_projectId: string, _key: string, _value: string) {
    throw new Error("not implemented: src/tools/vercel.ts upsertEnvVar");
  }

  async redeploy(_projectId: string) {
    throw new Error("not implemented: src/tools/vercel.ts redeploy");
  }

  async waitForReady(_deploymentId: string, _timeoutMs = 120_000) {
    throw new Error("not implemented: src/tools/vercel.ts waitForReady");
  }
}
