/** Linear client: incident issue + evidence comments, via GraphQL. */
export class LinearClient {
  constructor(private target: "live" | "twin" | "mock") {}

  async createIssue(_teamId: string, _title: string, _description: string) {
    throw new Error("not implemented: src/tools/linear.ts createIssue");
  }

  async addComment(_issueId: string, _body: string) {
    throw new Error("not implemented: src/tools/linear.ts addComment");
  }
}
