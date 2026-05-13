export type ProofModeProfileType =
  | "regular"
  | "student"
  | "business"
  | "organization";

export type ProofModeSubscriptionStatus =
  | "none"
  | "active"
  | "past_due"
  | "canceled";

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

export type ProofModeUnifiedProfile = {
  profileId: string;
  profileType: ProofModeProfileType;
  subscriptionStatus: ProofModeSubscriptionStatus;
  resume: ProofModeResumeData;
  jobTracker: ProofModeJobTrackerEntry[];
  careerPlan: ProofModeCareerPlanData;
  evidenceNotes: ProofModeEvidenceNote[];
  updatedAt: string;
};

const PROFILE_STORAGE_KEY = "proofmode_unified_profile";

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

function createDefaultProfile(): ProofModeUnifiedProfile {
  return {
    profileId: "PM-LOCAL-PREVIEW",
    profileType: "regular",
    subscriptionStatus: "none",
    resume: emptyResumeData,
    jobTracker: [],
    careerPlan: emptyCareerPlanData,
    evidenceNotes: [],
    updatedAt: new Date().toISOString(),
  };
}

export function getUnifiedProfile(): ProofModeUnifiedProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!raw) {
      const profile = createDefaultProfile();
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      return profile;
    }

    const parsed = JSON.parse(raw) as Partial<ProofModeUnifiedProfile>;

    return {
      ...createDefaultProfile(),
      ...parsed,
      resume: {
        ...emptyResumeData,
        ...(parsed.resume || {}),
      },
      careerPlan: {
        ...emptyCareerPlanData,
        ...(parsed.careerPlan || {}),
      },
      jobTracker: Array.isArray(parsed.jobTracker) ? parsed.jobTracker : [],
      evidenceNotes: Array.isArray(parsed.evidenceNotes)
        ? parsed.evidenceNotes
        : [],
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    const profile = createDefaultProfile();
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    return profile;
  }
}

export function saveUnifiedProfile(profile: ProofModeUnifiedProfile) {
  const updatedProfile = {
    ...profile,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
  return updatedProfile;
}

export function updateUnifiedProfile(
  updater: (profile: ProofModeUnifiedProfile) => ProofModeUnifiedProfile
) {
  const currentProfile = getUnifiedProfile();
  const updatedProfile = updater(currentProfile);
  return saveUnifiedProfile(updatedProfile);
}

export function saveResumeToUnifiedProfile(resume: ProofModeResumeData) {
  return updateUnifiedProfile((profile) => ({
    ...profile,
    resume,
  }));
}

export function clearResumeFromUnifiedProfile() {
  return updateUnifiedProfile((profile) => ({
    ...profile,
    resume: emptyResumeData,
  }));
}

export function addJobTrackerEntryToUnifiedProfile(
  entry: ProofModeJobTrackerEntry
) {
  return updateUnifiedProfile((profile) => ({
    ...profile,
    jobTracker: [...profile.jobTracker, entry],
  }));
}

export function saveCareerPlanToUnifiedProfile(
  careerPlan: ProofModeCareerPlanData
) {
  return updateUnifiedProfile((profile) => ({
    ...profile,
    careerPlan: {
      ...careerPlan,
      savedAt: new Date().toISOString(),
    },
  }));
}

export function addEvidenceNoteToUnifiedProfile(note: Omit<ProofModeEvidenceNote, "id" | "savedAt">) {
  return updateUnifiedProfile((profile) => ({
    ...profile,
    evidenceNotes: [
      ...profile.evidenceNotes,
      {
        ...note,
        id: `evidence-note-${Date.now()}`,
        savedAt: new Date().toISOString(),
      },
    ],
  }));
}

export function clearUnifiedProfile() {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
}
