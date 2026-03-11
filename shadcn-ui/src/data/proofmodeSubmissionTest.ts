import { processProofModeSubmission } from "@/data/proofmodeProcessor";
import { clearTrustTagStore, getAllTrustTags } from "@/data/proofmodeStore";

clearTrustTagStore();

export const proofModeSubmissionTestResults = {
  passingEligible: processProofModeSubmission({
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
  }),

  passingNeedsMoreEvidence: processProofModeSubmission({
    profileId: "PM-1002",
    skillCode: "BOOK",
    answers: {
      "BOOK-1": "b",
      "BOOK-2": "true",
      "BOOK-3": "b",
      "BOOK-4": "Reconciliation helps match records and catch errors accurately.",
    },
    evidenceItems: [
      {
        id: "test-e3",
        type: "document",
        name: "bookkeeping-sample.pdf",
        uploadedAt: "2026-03-11T11:00:00Z",
      },
    ],
    existingRecordCount: 0,
    submittedAt: "2026-03-11T11:10:00Z",
  }),

  failingAssessment: processProofModeSubmission({
    profileId: "PM-1003",
    skillCode: "WELD",
    answers: {
      "WELD-1": "a",
      "WELD-2": "false",
      "WELD-3": "a",
      "WELD-4": "Because it looks cool.",
    },
    evidenceItems: [
      {
        id: "test-e4",
        type: "image",
        name: "weld-photo.jpg",
        uploadedAt: "2026-03-11T12:00:00Z",
      },
      {
        id: "test-e5",
        type: "document",
        name: "weld-notes.pdf",
        uploadedAt: "2026-03-11T12:05:00Z",
      },
    ],
    existingRecordCount: 0,
    submittedAt: "2026-03-11T12:10:00Z",
  }),
};

export const proofModeStoredRecords = getAllTrustTags();

export const proofModeSubmissionTestResult =
  proofModeSubmissionTestResults.passingEligible;
