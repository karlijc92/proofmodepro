import {
  submitProofModeAssessment,
  SubmitProofModeAssessmentInput,
} from "@/data/proofmodeSubmission";
import { addTrustTagRecord } from "@/data/proofmodeStore";

export function processProofModeSubmission(
  input: SubmitProofModeAssessmentInput
) {
  const result = submitProofModeAssessment(input);

  if (result.record) {
    addTrustTagRecord(result.record);
  }

  return result;
}
