import { supabase } from "@/lib/supabase";

// ---- Pending assessment (kept as localStorage — this is fine, it's just
// in-progress quiz state before payment, not the permanent record) ----

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

async function getRealUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user.id;
}

function getPendingAssessmentStorageKey(userId: string | null) {
  if (userId) {
    return `${BASE_PENDING_ASSESSMENT_STORAGE_KEY}_${getSafeStorageKeyPart(userId)}`;
  }
  return `${BASE_PENDING_ASSESSMENT_STORAGE_KEY}_guest`;
}

export async function savePendingAssessment(
  pendingAssessment: ProofModePendingAssessment
) {
  const userId = await getRealUserId();
  localStorage.setItem(
    getPendingAssessmentStorageKey(userId),
    JSON.stringify(pendingAssessment)
  );
  return pendingAssessment;
}

export async function getPendingAssessment(): Promise<ProofModePendingAssessment | null> {
  try {
    const userId = await getRealUserId();
    const raw = localStorage.getItem(getPendingAssessmentStorageKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function clearPendingAssessment() {
  const userId = await getRealUserId();
  localStorage.removeItem(getPendingAssessmentStorageKey(userId));
}

// ---- TrustTags — now backed by Supabase, matched to the real `trusttags`
// table schema (user_id, skill_name, score, verification_code, status,
// issued_at, expires_at, assessment_id, submission_id, verification_url) ----

export interface SupabaseTrustTagRow {
  id: string;
  created_at: string;
  user_id: string;
  assessment_id: string | null;
  skill_name: string;
  score: number;
  verification_code: string;
  issued_at: string | null;
  status: string;
  expires_at: string | null;
  submission_id: string | null;
  verification_url: string | null;
}

export interface AddTrustTagInput {
  skillName: string;
  score: number;
  verificationCode: string;
  status: string;
  issuedAt?: string | null;
  expiresAt?: string | null;
  assessmentId?: string | null;
  submissionId?: string | null;
  verificationUrl?: string | null;
}

export async function addTrustTagRecord(
  input: AddTrustTagInput
): Promise<SupabaseTrustTagRow> {
  const userId = await getRealUserId();
  if (!userId) {
    throw new Error(
      "Cannot issue a TrustTag: no logged-in Supabase user was found."
    );
  }

  const { data, error } = await supabase
    .from("trusttags")
    .insert({
      user_id: userId,
      skill_name: input.skillName,
      score: input.score,
      verification_code: input.verificationCode,
      status: input.status,
      issued_at: input.issuedAt ?? null,
      expires_at: input.expiresAt ?? null,
      assessment_id: input.assessmentId ?? null,
      submission_id: input.submissionId ?? null,
      verification_url: input.verificationUrl ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as SupabaseTrustTagRow;
}

export async function getAllTrustTagsForCurrentUser(): Promise<SupabaseTrustTagRow[]> {
  const userId = await getRealUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from("trusttags")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SupabaseTrustTagRow[];
}

export async function getTrustTagsForSkill(
  skillName: string
): Promise<SupabaseTrustTagRow[]> {
  const all = await getAllTrustTagsForCurrentUser();
  return all.filter((record) => record.skill_name === skillName);
}

export async function getTrustTagByVerificationCode(
  verificationCode: string
): Promise<SupabaseTrustTagRow | null> {
  const { data, error } = await supabase
    .from("trusttags")
    .select("*")
    .eq("verification_code", verificationCode)
    .maybeSingle();

  if (error) throw error;
  return data as SupabaseTrustTagRow | null;
}
