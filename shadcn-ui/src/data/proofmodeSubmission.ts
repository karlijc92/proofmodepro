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
  scoreResult: ReturnType<typeof scoreAssessment> | null;
  eligibilityResult: ReturnType<typeof evaluateTrustTagEligibility> | null;
}

function sanitizeInput(input: SubmitProofModeAssessmentInput) {
  return {
    ...input,
    existingRecordCount: input.existingRecordCount ?? 0,
    submittedAt: input.submittedAt || new Date().toISOString(),
    evidenceItems: input.evidenceItems || [],
  };
}

export function submitProofModeAssessment(
  input: SubmitProofModeAssessmentInput
): SubmitProofModeAssessmentResult {
  const cleanInput = sanitizeInput(input);

  const scoreResult = scoreAssessment(
    cleanInput.skillCode,
    cleanInput.answers
  );

  if (!scoreResult) {
    return {
      record: null,
      scoreResult: null,
      eligibilityResult: null,
    };
  }

  const eligibilityResult = evaluateTrustTagEligibility(
    scoreResult,
    cleanInput.evidenceItems.length
  );

  const record = createTrustTagRecord({
    profileId: cleanInput.profileId,
    skillCode: cleanInput.skillCode,
    scoreResult,
    eligibilityResult,
    evidenceItems: cleanInput.evidenceItems,
    existingRecordCount: cleanInput.existingRecordCount,
    submittedAt: cleanInput.submittedAt,
  });

  return {
    record,
    scoreResult,
    eligibilityResult,
  };
}
