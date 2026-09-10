/** Slack client: incident summaries + approval buttons over Socket Mode. */
export class SlackClient {
  constructor(private target: "live" | "twin" | "mock") {}

  async postSummary(_channel: string, _text: string) {
    throw new Error("not implemented: src/tools/slack.ts postSummary");
  }

  async postApprovalRequest(_channel: string, _runId: string, _reason: string) {
    throw new Error("not implemented: src/tools/slack.ts postApprovalRequest");
  }
}
