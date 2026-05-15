import { ProofModeTrustTagRecord } from "@/data/proofmodeRecords";

const BASE_TRUSTTAG_STORAGE_KEY = "proofmode_trusttags";
const BASE_PENDING_ASSESSMENT_STORAGE_KEY = "proofmode_pending_assessment";

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

function getSafeStorageKeyPart(value: string) {
  return value.replace(/[^a-zA-Z0-9-_]/g, "_");
}

function getSupabaseUserIdFromLocalStorage(): string | null {
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);

      if (!key || !key.startsWith("sb-") || !key.endsWith("-auth-token")) {
        continue;
      }

      const raw = localStorage.getItem(key);

      if (!raw) {
        continue;
      }

      const parsed = JSON.parse(raw);

      const userId =
        parsed?.user?.id ||
        parsed?.currentSession?.user?.id ||
        parsed?.session?.user?.id;

      if (typeof userId === "string" && userId.trim()) {
        return userId.trim();
      }
    }

    return null;
  } catch {
    return null;
  }
}

function getTrustTagStorageKey() {
  const userId = getSupabaseUserIdFromLocalStorage();

  if (userId) {
    return `${BASE_TRUSTTAG_STORAGE_KEY}_${getSafeStorageKeyPart(userId)}`;
  }

  return `${BASE_TRUSTTAG_STORAGE_KEY}_guest`;
}

function getPendingAssessmentStorageKey() {
  const userId = getSupabaseUserIdFromLocalStorage();

  if (userId) {
    return `${BASE_PENDING_ASSESSMENT_STORAGE_KEY}_${getSafeStorageKeyPart(userId)}`;
  }

  return `${BASE_PENDING_ASSESSMENT_STORAGE_KEY}_guest`;
}

function loadTrustTagStore(): ProofModeTrustTagRecord[] {
  try {
    const raw = localStorage.getItem(getTrustTagStorageKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTrustTagStore(store: ProofModeTrustTagRecord[]) {
  localStorage.setItem(getTrustTagStorageKey(), JSON.stringify(store));
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
  localStorage.removeItem(getTrustTagStorageKey());
}

export function clearLegacyTrustTagStore() {
  localStorage.removeItem(BASE_TRUSTTAG_STORAGE_KEY);
}

export function savePendingAssessment(
  pendingAssessment: ProofModePendingAssessment
) {
  localStorage.setItem(
    getPendingAssessmentStorageKey(),
    JSON.stringify(pendingAssessment)
  );

  return pendingAssessment;
}

export function getPendingAssessment(): ProofModePendingAssessment | null {
  try {
    const raw = localStorage.getItem(getPendingAssessmentStorageKey());

    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingAssessment() {
  localStorage.removeItem(getPendingAssessmentStorageKey());
}

export function clearLegacyPendingAssessment() {
  localStorage.removeItem(BASE_PENDING_ASSESSMENT_STORAGE_KEY);
}
