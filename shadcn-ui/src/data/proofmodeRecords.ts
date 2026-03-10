export type TrustTagStatus =
  | "pending_review"
  | "verified"
  | "needs_more_evidence"
  | "rejected";

export interface ProofModeEvidenceItem {
  id: string;
  type: "image" | "video" | "document";
  name: string;
  url?: string;
  uploadedAt: string;
}

export interface ProofModeTrustTagRecord {
  trustTagId: string;
  profileId: string;
  skillCode: string;
  skillName: string;
  categoryKey: string;
  assessmentScorePercent: number;
  evidenceItems: ProofModeEvidenceItem[];
  evidenceCount: number;
  status: TrustTagStatus;
  reviewerNotes?: string;
  issuedAt?: string;
  expiresAt?: string;
  submittedAt: string;
}

export const proofModeSampleRecords: ProofModeTrustTagRecord[] = [
  {
    trustTagId: "TT-CARP-PM1001-01",
    profileId: "PM-1001",
    skillCode: "CARP",
    skillName: "Carpentry",
    categoryKey: "skilled_trades",
    assessmentScorePercent: 82,
    evidenceItems: [
      {
        id: "e1",
        type: "image",
        name: "framing-project-photo.jpg",
        uploadedAt: "2026-03-10T10:00:00Z",
      },
      {
        id: "e2",
        type: "video",
        name: "shelf-install-demo.mp4",
        uploadedAt: "2026-03-10T10:05:00Z",
      },
    ],
    evidenceCount: 2,
    status: "pending_review",
    submittedAt: "2026-03-10T10:10:00Z",
  },
  {
    trustTagId: "TT-WELD-PM1002-01",
    profileId: "PM-1002",
    skillCode: "WELD",
    skillName: "Welding",
    categoryKey: "skilled_trades",
    assessmentScorePercent: 93,
    evidenceItems: [
      {
        id: "e3",
        type: "image",
        name: "bead-sample.jpg",
        uploadedAt: "2026-03-09T14:00:00Z",
      },
      {
        id: "e4",
        type: "document",
        name: "job-sheet.pdf",
        uploadedAt: "2026-03-09T14:10:00Z",
      },
    ],
    evidenceCount: 2,
    status: "verified",
    reviewerNotes: "Strong evidence and passing assessment.",
    issuedAt: "2026-03-10T09:00:00Z",
    expiresAt: "2027-03-10T09:00:00Z",
    submittedAt: "2026-03-09T14:15:00Z",
  },
  {
    trustTagId: "TT-BOOK-PM1003-01",
    profileId: "PM-1003",
    skillCode: "BOOK",
    skillName: "Bookkeeping",
    categoryKey: "finance_bookkeeping",
    assessmentScorePercent: 78,
    evidenceItems: [
      {
        id: "e5",
        type: "document",
        name: "reconciliation-sample.pdf",
        uploadedAt: "2026-03-08T11:00:00Z",
      },
    ],
    evidenceCount: 1,
    status: "needs_more_evidence",
    reviewerNotes: "Assessment passed, but minimum evidence requirement not yet met.",
    submittedAt: "2026-03-08T11:15:00Z",
  },
];
