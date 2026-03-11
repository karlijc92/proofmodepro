import { scoreAssessment, ProofModeAnswerMap } from "@/data/proofmodeScoring";
import { evaluateTrustTagEligibility } from "@/data/proofmodeEligibility";
import { createTrustTagRecord } from "@/data/proofmodeIssuance";
import { ProofModeTrustTagRecord } from "@/data/proofmodeRecords";

export interface SubmitProofModeAssessmentInput {
  profileId: string;
  skillCode: string;
  answers: ProofModeAnswerMap;
  evidenceItems: ProofModeTrustTagRecord["evidenceItems"];
  existingRecordCount?: number;
  submittedAt?: string;
}

export interface SubmitProofModeAssessmentResult {
  record: ProofModeTrustTagRecord | null;
  scoreResult: ReturnType<typeof scoreAssessment>;
  eligibilityResult: ReturnType<typeof evaluateTrustTagEligibility> | null;
}

export function submitProofModeAssessment(
  input: SubmitProofModeAssessmentInput
): SubmitProofModeAssessmentResult {
  const scoreResult = scoreAssessment(input.skillCode, input.answers);

  if (!scoreResult) {
    return {
      record: null,
      scoreResult: null,
      eligibilityResult: null,
    };
  }

  const eligibilityResult = evaluateTrustTagEligibility(
    scoreResult,
    input.evidenceItems.length
  );

  const record = createTrustTagRecord({
    profileId: input.profileId,
    skillCode: input.skillCode,
    scoreResult,
    eligibilityResult,
    evidenceItems: input.evidenceItems,
    existingRecordCount: input.existingRecordCount,
    submittedAt: input.submittedAt,
  });

  return {
    record,
    scoreResult,
    eligibilityResult,
  };
}
