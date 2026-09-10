/**
 * GitHub client: secret scanning alerts + Actions secrets.
 * Actions secret writes need libsodium sealed-box encryption against the
 * repo's public key (getRepoPublicKey) — see the build plan's app table.
 */
export class GithubClient {
  constructor(private target: "live" | "twin" | "mock") {}

  async listSecretScanningAlerts(_owner: string, _repo: string) {
    throw new Error("not implemented: src/tools/github.ts listSecretScanningAlerts");
  }

  async resolveAlert(_owner: string, _repo: string, _alertNumber: number, _resolution: "revoked" | "false_positive") {
    throw new Error("not implemented: src/tools/github.ts resolveAlert");
  }

  async updateActionsSecret(_owner: string, _repo: string, _secretName: string, _value: string) {
    throw new Error("not implemented: src/tools/github.ts updateActionsSecret");
  }
}
