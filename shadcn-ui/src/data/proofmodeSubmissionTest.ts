import { proofModeSubmissionTestResult } from "@/data/proofmodeSubmissionTest";

export const proofModeDebugSummary = {
  hasRecord: !!proofModeSubmissionTestResult.record,
  trustTagId: proofModeSubmissionTestResult.record?.trustTagId || null,
  profileId: proofModeSubmissionTestResult.record?.profileId || null,
  skillCode: proofModeSubmissionTestResult.record?.skillCode || null,
  status: proofModeSubmissionTestResult.record?.status || null,
  scorePercent: proofModeSubmissionTestResult.scoreResult?.scorePercent ?? null,
  passed: proofModeSubmissionTestResult.scoreResult?.passed ?? null,
  eligibleForIssuance:
    proofModeSubmissionTestResult.eligibilityResult?.eligibleForIssuance ?? null,
  trustTagLevel:
    proofModeSubmissionTestResult.eligibilityResult?.trustTagLevel ?? null,
};
