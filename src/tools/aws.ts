/**
 * AWS IAM + STS client. TARGET=mock returns canned responses; TARGET=live
 * hits real AWS with the rekey-agent / rekey-verifier credentials.
 *
 * Calls used: ListAccessKeys, GetAccessKeyLastUsed, CreateAccessKey,
 * UpdateAccessKey (Inactive), DeleteAccessKey, STS GetCallerIdentity.
 */
export interface AwsKeyInfo {
  accessKeyId: string;
  status: "Active" | "Inactive";
  createDate: string;
}

export class AwsClient {
  constructor(private target: "live" | "twin" | "mock") {}

  async listAccessKeys(_userName: string): Promise<AwsKeyInfo[]> {
    throw new Error("not implemented: src/tools/aws.ts listAccessKeys");
  }

  async getAccessKeyLastUsed(_accessKeyId: string): Promise<{ lastUsedDate?: string; region?: string; serviceName?: string }> {
    throw new Error("not implemented: src/tools/aws.ts getAccessKeyLastUsed");
  }

  async createAccessKey(_userName: string): Promise<{ accessKeyId: string; secretAccessKey: string }> {
    throw new Error("not implemented: src/tools/aws.ts createAccessKey");
  }

  async deactivateAccessKey(_userName: string, _accessKeyId: string): Promise<void> {
    throw new Error("not implemented: src/tools/aws.ts deactivateAccessKey");
  }

  /** Verification primitive: succeeds only if the given credentials are live. */
  async verifyCallerIdentity(_accessKeyId: string, _secretAccessKey: string): Promise<boolean> {
    throw new Error("not implemented: src/tools/aws.ts verifyCallerIdentity");
  }
}
