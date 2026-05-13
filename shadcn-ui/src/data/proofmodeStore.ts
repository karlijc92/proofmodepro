import { ProofModeTrustTagRecord } from "@/data/proofmodeRecords";

const TRUSTTAG_STORAGE_KEY = "proofmode_trusttags";
const PENDING_ASSESSMENT_STORAGE_KEY = "proofmode_pending_assessment";

export type ProofModePendingEvidenceItem = {
  id: string;
  name: string;
  typeLabel: string;
  sizeLabel: string;
  uploadedAt: string;
};

export type ProofModePendingAssessmentAnswer = {
  questionId: string;
  answerId: string;
  answerText: string;
};

export type ProofModePendingAssessment = {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  skillCodes: string[];
  score: number;
  correctAnswersCount: number;
  totalQuestions: number;
  answers: ProofModePendingAssessmentAnswer[];
  evidenceItems: ProofModePendingEvidenceItem[];
  passed: boolean;
  createdAt: string;
};

function loadTrustTagStore(): ProofModeTrustTagRecord[] {
  try {
    const raw = localStorage.getItem(TRUSTTAG_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTrustTagStore(store: ProofModeTrustTagRecord[]) {
  localStorage.setItem(TRUSTTAG_STORAGE_KEY, JSON.stringify(store));
}

export function addTrustTagRecord(record: ProofModeTrustTagRecord) {
  const store = loadTrustTagStore();
  store.push(record);
  saveTrustTagStore(store);
  return record;
}

export function getAllTrustTags() {
  return loadTrustTagStore();
}

export function getTrustTagsForProfile(profileId: string) {
  return loadTrustTagStore().filter((record) => record.profileId === profileId);
}

export function getTrustTagById(trustTagId: string) {
  return loadTrustTagStore().find((record) => record.trustTagId === trustTagId);
}

export function clearTrustTagStore() {
  localStorage.removeItem(TRUSTTAG_STORAGE_KEY);
}

export function savePendingAssessment(pendingAssessment: ProofModePendingAssessment) {
  localStorage.setItem(PENDING_ASSESSMENT_STORAGE_KEY, JSON.stringify(pendingAssessment));
  return pendingAssessment;
}

export function getPendingAssessment(): ProofModePendingAssessment | null {
  try {
    const raw = localStorage.getItem(PENDING_ASSESSMENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingAssessment() {
  localStorage.removeItem(PENDING_ASSESSMENT_STORAGE_KEY);
}
