import { supabase } from "@/lib/supabase";

export type ProofModeResumeData = {
  fullName: string;
  headline: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
};

export type ProofModeJobTrackerEntry = {
  id: string;
  jobTitle: string;
  company: string;
  status: string;
  savedAt: string;
};

export type ProofModeCareerPlanData = {
  targetRole: string;
  currentStrengths: string;
  skillsToBuild: string;
  trustTagsToEarn: string;
  nextStep: string;
  savedAt?: string;
};

export type ProofModeEvidenceNote = {
  id: string;
  title: string;
  skillArea: string;
  description: string;
  savedAt: string;
};

export type ProofModePublicSettings = {
  slug: string;
  headline: string;
  bio: string;
  isPublic: boolean;
};

export const emptyResumeData: ProofModeResumeData = {
  fullName: "",
  headline: "",
  summary: "",
  skills: "",
  experience: "",
  education: "",
};

export const emptyCareerPlanData: ProofModeCareerPlanData = {
  targetRole: "",
  currentStrengths: "",
  skillsToBuild: "",
  trustTagsToEarn: "",
  nextStep: "",
};

async function getCurrentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new Error("No logged-in Supabase user was found.");
  }
  return data.user.id;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ---------- Resume ----------

export async function getResume(): Promise<ProofModeResumeData> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return emptyResumeData;

  return {
    fullName: data.full_name || "",
    headline: data.headline || "",
    summary: data.summary || "",
    skills: data.skills || "",
    experience: data.experience || "",
    education: data.education || "",
  };
}

export async function saveResumeToUnifiedProfile(resume: ProofModeResumeData) {
  const userId = await getCurrentUserId();

  const { error } = await supabase.from("resumes").upsert(
    {
      user_id: userId,
      full_name: resume.fullName,
      headline: resume.headline,
      summary: resume.summary,
      skills: resume.skills,
      experience: resume.experience,
      education: resume.education,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
  return resume;
}

export async function clearResumeFromUnifiedProfile() {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("resumes").delete().eq("user_id", userId);
  if (error) throw error;
  return emptyResumeData;
}

// ---------- Evidence notes ----------

export async function getEvidenceNotes(): Promise<ProofModeEvidenceNote[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("evidence_notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    skillArea: row.skill_area || "",
    description: row.description,
    savedAt: row.created_at,
  }));
}

export async function addEvidenceNoteToUnifiedProfile(
  note: Omit<ProofModeEvidenceNote, "id" | "savedAt">
) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("evidence_notes")
    .insert({
      user_id: userId,
      title: note.title,
      skill_area: note.skillArea,
      description: note.description,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    skillArea: data.skill_area || "",
    description: data.description,
    savedAt: data.created_at,
  };
}

// ---------- Career plan ----------

export async function getCareerPlan(): Promise<ProofModeCareerPlanData> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("career_plans")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return emptyCareerPlanData;

  return {
    targetRole: data.target_role || "",
    currentStrengths: data.current_strengths || "",
    skillsToBuild: data.skills_to_build || "",
    trustTagsToEarn: data.trusttags_to_earn || "",
    nextStep: data.next_step || "",
    savedAt: data.updated_at,
  };
}

export async function saveCareerPlanToUnifiedProfile(
  careerPlan: ProofModeCareerPlanData
) {
  const userId = await getCurrentUserId();

  const { error } = await supabase.from("career_plans").upsert(
    {
      user_id: userId,
      target_role: careerPlan.targetRole,
      current_strengths: careerPlan.currentStrengths,
      skills_to_build: careerPlan.skillsToBuild,
      trusttags_to_earn: careerPlan.trustTagsToEarn,
      next_step: careerPlan.nextStep,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
  return { ...careerPlan, savedAt: new Date().toISOString() };
}

// ---------- Job tracker ----------

export async function getJobTrackerEntries(): Promise<ProofModeJobTrackerEntry[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("job_tracker_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    jobTitle: row.job_title,
    company: row.company,
    status: row.status,
    savedAt: row.created_at,
  }));
}

export async function addJobTrackerEntryToUnifiedProfile(
  entry: Omit<ProofModeJobTrackerEntry, "id" | "savedAt">
) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("job_tracker_entries")
    .insert({
      user_id: userId,
      job_title: entry.jobTitle,
      company: entry.company,
      status: entry.status,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    jobTitle: data.job_title,
    company: data.company,
    status: data.status,
    savedAt: data.created_at,
  };
}

// ---------- Public profile settings ----------

export async function getPublicSettings(): Promise<ProofModePublicSettings> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("users")
    .select("profile_slug, profile_headline, profile_bio, profile_public")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return { slug: "", headline: "", bio: "", isPublic: false };
  }

  return {
    slug: data.profile_slug || "",
    headline: data.profile_headline || "",
    bio: data.profile_bio || "",
    isPublic: !!data.profile_public,
  };
}

export async function savePublicSettings(settings: ProofModePublicSettings) {
  const userId = await getCurrentUserId();
  const cleanSlug = slugify(settings.slug);

  if (!cleanSlug) {
    throw new Error("Please enter a profile URL before saving.");
  }

  const { error } = await supabase
    .from("users")
    .update({
      profile_slug: cleanSlug,
      profile_headline: settings.headline,
      profile_bio: settings.bio,
      profile_public: settings.isPublic,
    })
    .eq("id", userId);

  if (error) {
    if (error.code === "23505") {
      throw new Error("That profile URL is already taken. Please choose another.");
    }
    throw error;
  }

  return { ...settings, slug: cleanSlug };
}
