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

const BASE_PROFILE_STORAGE_KEY = "proofmode_unified_profile";
const LEGACY_PROFILE_STORAGE_KEY = "proofmode_unified_profile";

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

function getProfileStorageKey() {
  const userId = getSupabaseUserIdFromLocalStorage();

  if (userId) {
    return `${BASE_PROFILE_STORAGE_KEY}_${getSafeStorageKeyPart(userId)}`;
  }

  return `${BASE_PROFILE_STORAGE_KEY}_guest`;
}

function createDefaultProfile(): ProofModeUnifiedProfile {
  const userId = getSupabaseUserIdFromLocalStorage();

  return {
    profileId: userId ? `PM-USER-${userId}` : "PM-GUEST-PREVIEW",
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
    const storageKey = getProfileStorageKey();
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      const profile = createDefaultProfile();

      localStorage.setItem(storageKey, JSON.stringify(profile));

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
    const storageKey = getProfileStorageKey();
    const profile = createDefaultProfile();

    localStorage.setItem(storageKey, JSON.stringify(profile));

    return profile;
  }
}

export function saveUnifiedProfile(profile: ProofModeUnifiedProfile) {
  const storageKey = getProfileStorageKey();

  const updatedProfile = {
    ...profile,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(storageKey, JSON.stringify(updatedProfile));

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

export function addEvidenceNoteToUnifiedProfile(
  note: Omit<ProofModeEvidenceNote, "id" | "savedAt">
) {
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
  localStorage.removeItem(getProfileStorageKey());
}

export function clearLegacyUnifiedProfileData() {
  localStorage.removeItem(LEGACY_PROFILE_STORAGE_KEY);
}
