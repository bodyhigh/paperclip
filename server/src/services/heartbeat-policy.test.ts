import { describe, expect, it } from "vitest";
import { heartbeatOneShotIssueId, isHistoricalOneShotIssueRun } from "./heartbeat-policy.js";

describe("one-shot heartbeat policy", () => {
  it("normalizes a configured UUID before matching the canonical issue ID", () => {
    expect(heartbeatOneShotIssueId({ runtimeConfig: { heartbeat: {
      oneShotIssueId: "ABCDEF12-3456-4789-ABCD-0123456789AB",
    } } })).toBe("abcdef12-3456-4789-abcd-0123456789ab");
  });
});

describe("historical one-shot run binding", () => {
  const issueId = "00000000-0000-4000-8000-000000000001";

  it("retains the stop decision after mutable agent policy is cleared", () => {
    expect(isHistoricalOneShotIssueRun(
      { runtimeConfig: {} },
      { contextSnapshot: { issueId, oneShotIssueId: issueId } },
      issueId,
    )).toBe(true);
  });

  it("ignores an unrelated run binding", () => {
    expect(isHistoricalOneShotIssueRun(
      { runtimeConfig: {} },
      { contextSnapshot: { oneShotIssueId: "00000000-0000-4000-8000-000000000002" } },
      issueId,
    )).toBe(false);
  });
});
