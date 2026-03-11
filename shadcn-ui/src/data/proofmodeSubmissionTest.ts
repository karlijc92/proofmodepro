import { submitProofModeAssessment } from "@/data/proofmodeSubmission";

export const proofModeSubmissionTestResult = submitProofModeAssessment({
  profileId: "PM-1001",
  skillCode: "CARP",
  answers: {
    "CARP-1": "b",
    "CARP-2": "true",
    "CARP-3": "b",
    "CARP-4": "Square measurements improve fit, alignment, and accuracy.",
  },
  evidenceItems: [
    {
      id: "test-e1",
      type: "image",
      name: "framing-photo.jpg",
      uploadedAt: "2026-03-11T10:00:00Z",
    },
    {
      id: "test-e2",
      type: "video",
      name: "install-demo.mp4",
      uploadedAt: "2026-03-11T10:05:00Z",
    },
  ],
  existingRecordCount: 0,
  submittedAt: "2026-03-11T10:10:00Z",
});
