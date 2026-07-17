import { supabase } from "@/lib/supabase";
import {
  submitProofModeAssessment,
  SubmitProofModeAssessmentInput,
} from "@/data/proofmodeSubmission";
import { addTrustTagRecord } from "@/data/proofmodeStore";

function generateVerificationCode() {
  return "VC-" + Math.random().toString(36).slice(2, 10).toUpperCase();
}

async function findAssessmentIdBySkillName(
  skillName: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("assessments")
    .select("id")
    .ilike("skill_name", skillName)
    .maybeSingle();

  if (error || !data) return null;
  return data.id;
}

export async function processProofModeSubmission(
  input: SubmitProofModeAssessmentInput
) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error(
      "Cannot process submission: no logged-in Supabase user was found."
    );
  }
  const userId = userData.user.id;

  // Score the assessment using existing local logic
  const result = submitProofModeAssessment(input);

  if (!result.record) {
    // Did not pass or not eligible — nothing to persist
    return result;
  }

  const assessmentId = await findAssessmentIdBySkillName(result.record.skillName);

  // Create the real submissions row (this also fires your existing
  // Resend email notification via the Database Webhook)
  const { data: submissionRow, error: submissionError } = await supabase
    .from("submissions")
    .insert({
      user_id: userId,
      assessment_id: assessmentId,
      answers: JSON.stringify(input.answers),
      evidence_links: JSON.stringify(input.evidenceItems),
    })
    .select()
    .single();

  if (submissionError) {
    throw submissionError;
  }

  const verificationCode = generateVerificationCode();
  const issuedAt = new Date().toISOString();
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  const trustTagRow = await addTrustTagRecord({
    skillName: result.record.skillName,
    score: result.record.assessmentScorePercent,
    verificationCode,
    status: "verified",
    issuedAt,
    expiresAt: expiresAt.toISOString(),
    assessmentId,
    submissionId: submissionRow.id,
    verificationUrl: `https://proofmodepro.com/verify?tagId=${verificationCode}`,
  });

  return {
    ...result,
    record: trustTagRow,
  };
}
