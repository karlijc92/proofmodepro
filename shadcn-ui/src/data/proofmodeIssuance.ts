import { trustTagRules, generateTrustTagId } from "@/data/proofmodeConfig";
import { getAssessmentBySkillCode } from "@/data/proofmodeHelpers";
import { ProofModeScoreResult } from "@/data/proofmodeScoring";
import { ProofModeEligibilityResult } from "@/data/proofmodeEligibility";
import { ProofModeTrustTagRecord } from "@/data/proofmodeRecords";

export interface CreateTrustTagRecordInput {
  profileId: string;
  skillCode: string;
  scoreResult: ProofModeScoreResult;
  eligibilityResult: ProofModeEligibilityResult;
  evidenceItems: ProofModeTrustTagRecord["evidenceItems"];
  existingRecordCount?: number;
  submittedAt?: string;
}

function addMonthsToDate(dateString: string, months: number) {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
}

export function createTrustTagRecord(
  input: CreateTrustTagRecordInput
): ProofModeTrustTagRecord | null {
  const assessment = getAssessmentBySkillCode(input.skillCode);

  if (!assessment) return null;

  const sequence = (input.existingRecordCount || 0) + 1;
  const submittedAt = input.submittedAt || new Date().toISOString();

  const trustTagId = generateTrustTagId(
    input.skillCode,
    input.profileId,
    sequence
  );

  const shouldIssueNow = input.eligibilityResult.eligibleForIssuance;
  const issuedAt = shouldIssueNow ? submittedAt : undefined;
  const expiresAt = shouldIssueNow
    ? addMonthsToDate(submittedAt, trustTagRules.validMonths)
    : undefined;

  return {
    trustTagId,
    profileId: input.profileId,
    skillCode: input.skillCode,
    skillName: assessment.skillName,
    categoryKey: assessment.categoryKey,
    assessmentScorePercent: input.scoreResult.scorePercent,
    evidenceItems: input.evidenceItems,
    evidenceCount: input.evidenceItems.length,
    status: input.eligibilityResult.recommendedStatus,
    reviewerNotes: input.eligibilityResult.reason,
    issuedAt,
    expiresAt,
    submittedAt,
  };
}
