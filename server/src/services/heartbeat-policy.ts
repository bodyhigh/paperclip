import { agents } from "@paperclipai/db";
import { asBoolean, parseObject } from "../adapters/utils.js";

export function isHeartbeatWakeOnDemandEnabled(
  agent: Pick<typeof agents.$inferSelect, "runtimeConfig">,
) {
  const runtimeConfig = parseObject(agent.runtimeConfig);
  const heartbeat = parseObject(runtimeConfig.heartbeat);
  return asBoolean(
    heartbeat.wakeOnDemand ??
      heartbeat.wakeOnAssignment ??
      heartbeat.wakeOnOnDemand ??
      heartbeat.wakeOnAutomation,
    true,
  );
}

export function heartbeatOneShotIssueId(
  agent: Pick<typeof agents.$inferSelect, "runtimeConfig">,
): string | null {
  const heartbeat = parseObject(parseObject(agent.runtimeConfig).heartbeat);
  if (heartbeat.oneShotIssueId === undefined) return null;
  const value = heartbeat.oneShotIssueId;
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
      ? value
      : "__invalid_one_shot_issue__";
}
