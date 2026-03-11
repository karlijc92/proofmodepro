import { proofModeSubmissionTestResult } from "@/data/proofmodeSubmissionTest";

export const proofModeDebugSummary = {
  workflowReady: true,
  hasRecord: !!proofModeSubmissionTestResult.record,
  trustTagId: proofModeSubmissionTestResult.record?.trustTagId || null,
  profileId: proofModeSubmissionTestResult.record?.profileId || null,
  skillCode: proofModeSubmissionTestResult.record?.skillCode || null,
  skillName: proofModeSubmissionTestResult.record?.skillName || null,
  categoryKey: proofModeSubmissionTestResult.record?.categoryKey || null,
  status: proofModeSubmissionTestResult.record?.status || null,
  scorePercent: proofModeSubmissionTestResult.scoreResult?.scorePercent ?? null,
  passed: proofModeSubmissionTestResult.scoreResult?.passed ?? null,
  correctAnswers: proofModeSubmissionTestResult.scoreResult?.correctAnswers ?? null,
  totalQuestions: proofModeSubmissionTestResult.scoreResult?.totalQuestions ?? null,
  evidenceCount: proofModeSubmissionTestResult.record?.evidenceCount ?? null,
  eligibleForIssuance:
    proofModeSubmissionTestResult.eligibilityResult?.eligibleForIssuance ?? null,
  trustTagLevel:
    proofModeSubmissionTestResult.eligibilityResult?.trustTagLevel ?? null,
  reviewerReason:
    proofModeSubmissionTestResult.eligibilityResult?.reason || null,
  issuedAt: proofModeSubmissionTestResult.record?.issuedAt || null,
  expiresAt: proofModeSubmissionTestResult.record?.expiresAt || null,
};
