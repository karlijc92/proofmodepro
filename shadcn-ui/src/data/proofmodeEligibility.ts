import { trustTagRules, trustTagLevels } from "@/data/proofmodeConfig";
import { ProofModeScoreResult } from "@/data/proofmodeScoring";
import { TrustTagStatus } from "@/data/proofmodeRecords";

export interface ProofModeEligibilityResult {
  passedAssessment: boolean;
  hasMinimumEvidence: boolean;
  eligibleForIssuance: boolean;
  recommendedStatus: TrustTagStatus;
  scorePercent: number;
  evidenceCount: number;
  trustTagLevel: "verified" | "advanced" | "expert" | null;
  reason: string;
}

function getTrustTagLevel(scorePercent: number) {
  if (
    scorePercent >= trustTagLevels.expert.min &&
    scorePercent <= trustTagLevels.expert.max
  ) {
    return "expert";
  }

  if (
    scorePercent >= trustTagLevels.advanced.min &&
    scorePercent <= trustTagLevels.advanced.max
  ) {
    return "advanced";
  }

  if (
    scorePercent >= trustTagLevels.verified.min &&
    scorePercent <= trustTagLevels.verified.max
  ) {
    return "verified";
  }

  return null;
}

export function evaluateTrustTagEligibility(
  scoreResult: ProofModeScoreResult,
  evidenceCount: number
): ProofModeEligibilityResult {
  const passedAssessment =
    scoreResult.scorePercent >= trustTagRules.passingScorePercent;

  const hasMinimumEvidence =
    evidenceCount >= trustTagRules.minimumEvidenceUploads;

  if (!passedAssessment) {
    return {
      passedAssessment: false,
      hasMinimumEvidence,
      eligibleForIssuance: false,
      recommendedStatus: "rejected",
      scorePercent: scoreResult.scorePercent,
      evidenceCount,
      trustTagLevel: null,
      reason: "Assessment score did not meet the passing requirement.",
    };
  }

  if (!hasMinimumEvidence) {
    return {
      passedAssessment: true,
      hasMinimumEvidence: false,
      eligibleForIssuance: false,
      recommendedStatus: "needs_more_evidence",
      scorePercent: scoreResult.scorePercent,
      evidenceCount,
      trustTagLevel: getTrustTagLevel(scoreResult.scorePercent),
      reason: "Assessment passed, but minimum evidence requirement was not met.",
    };
  }

  return {
    passedAssessment: true,
    hasMinimumEvidence: true,
    eligibleForIssuance: true,
    recommendedStatus: "verified",
    scorePercent: scoreResult.scorePercent,
    evidenceCount,
    trustTagLevel: getTrustTagLevel(scoreResult.scorePercent),
    reason: "Submission meets assessment and evidence requirements.",
  };
}
