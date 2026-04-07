import {
  submitProofModeAssessment,
  SubmitProofModeAssessmentInput,
} from "@/data/proofmodeSubmission";
import {
  addTrustTagRecord,
  getTrustTagsForProfile,
} from "@/data/proofmodeStore";

function generateTempProfileId() {
  return "PM-" + Math.floor(Math.random() * 1000000);
}

export function processProofModeSubmission(
  input: SubmitProofModeAssessmentInput
) {
  const enrichedInput: SubmitProofModeAssessmentInput = {
    ...input,
    profileId: input.profileId || generateTempProfileId(),
  };

  const existingRecords = getTrustTagsForProfile(enrichedInput.profileId);

  const existingRecordForSkill = existingRecords.find(
    (record) => record.skillCode === enrichedInput.skillCode
  );

  if (existingRecordForSkill) {
    return {
      record: existingRecordForSkill,
      scoreResult: null,
      eligibilityResult: null,
    };
  }

  const result = submitProofModeAssessment(enrichedInput);

  if (result.record) {
    addTrustTagRecord({
      ...result.record,
      profileId: enrichedInput.profileId,
    });
  }

  return result;
}
