import { getAllTrustTags } from "@/data/proofmodeStore";

export const proofModeSubmissionTestResults = {
  passingEligible: {
    scoreResult: null,
    eligibilityResult: null,
    record: null,
  },
  passingNeedsMoreEvidence: {
    scoreResult: null,
    eligibilityResult: null,
    record: null,
  },
  failingAssessment: {
    scoreResult: null,
    eligibilityResult: null,
    record: null,
  },
};

export const proofModeStoredRecords = getAllTrustTags();

export const proofModeSubmissionTestResult =
  proofModeSubmissionTestResults.passingEligible;
