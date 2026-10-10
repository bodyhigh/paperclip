import { describe, expect, it } from "vitest";
import { heartbeatOneShotIssueId } from "./heartbeat-policy.js";

describe("one-shot heartbeat policy", () => {
  it("normalizes a configured UUID before matching the canonical issue ID", () => {
    expect(heartbeatOneShotIssueId({ runtimeConfig: { heartbeat: {
      oneShotIssueId: "ABCDEF12-3456-4789-ABCD-0123456789AB",
    } } })).toBe("abcdef12-3456-4789-abcd-0123456789ab");
  });
});
