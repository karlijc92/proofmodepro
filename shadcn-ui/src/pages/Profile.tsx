import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  proofModeCategories,
  proofModeSkills,
  trustTagRules,
} from "@/data/proofmodeConfig";

type ProfileType = "regular" | "student" | "business" | "organization";

const profileTypes = [
  {
    id: "regular" as ProfileType,
    title: "Regular Profile",
    label: "Free",
    description:
      "For individuals who want to store TrustTags, show verified skills, and improve job readiness.",
  },
  {
    id: "student" as ProfileType,
    title: "Student Profile",
    label: "Subscription",
    description:
      "For students who need employment support, interview practice, quizzes, and career tools.",
  },
  {
    id: "business" as ProfileType,
    title: "Business / Employer Profile",
    label: "Subscription",
    description:
      "For employers who want to manage employee profiles, review TrustTags, and support workforce development.",
  },
  {
    id: "organization" as ProfileType,
    title: "Government / Organization Profile",
    label: "Subscription",
    description:
      "For organizations managing participants, workforce programs, verification, and readiness tracking.",
  },
];

export default function Profile() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>("regular");

  const selected = useMemo(
    () => profileTypes.find((profile) => profile.id === selectedProfile),
    [selectedProfile]
  );

  const totalCategories = proofModeCategories.length;
  const totalSkills = proofModeSkills.length;

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">ProofMode Profile Hub</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Build, store, and strengthen verified skill profiles.
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            This hub separates regular profiles from subscription-based profiles.
            Regular profiles focus on TrustTags and basic job-readiness tools.
            Student, business, and organization profiles include expanded tools
            that can be unlocked through the correct plan.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {profileTypes.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(profile.id)}
              className={`rounded-xl border p-5 text-left transition hover:border-primary ${
                selectedProfile === profile.id
                  ? "border-primary bg-primary/5"
                  : "bg-background"
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-semibold">{profile.title}</h2>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    profile.label === "Free"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {profile.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.description}
              </p>
            </button>
          ))}
        </section>

        <section className="mt-8 rounded-xl border p-6">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{selected?.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {selected?.description}
              </p>
            </div>

            {selected?.label === "Subscription" ? (
              <Button variant="outline">Manage Subscription</Button>
            ) : (
              <Button variant="outline">Free Profile</Button>
            )}
          </div>

          {selectedProfile === "regular" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">TrustTag Wallet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This section will store the user’s issued TrustTags after real
                  login/signup is connected. Each TrustTag will show skill name,
                  verification status, evidence status, and expiration date.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Verification Status</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Users will be able to see which TrustTags are active, pending,
                  need more evidence, or expired.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Basic Job Readiness</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Free profile tools can include skill summaries, profile
                  completion guidance, and basic next-step recommendations.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">ProofMode Account Setup</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Real profile ownership will be connected after login/signup is
                  added. No fake or temporary profile IDs are being used.
                </p>
              </div>
            </div>
          )}

          {selectedProfile === "student" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Student Career Hub</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Includes job-readiness support for students, including career
                  preparation, skill-building, and employment guidance.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Interview Prep</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Students can practice interview questions, prepare answers, and
                  build confidence before applying for jobs.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Role Play Practice</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Future tools can simulate workplace conversations, interviews,
                  and customer-service scenarios.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Quizzes and Tests</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Students can take readiness quizzes and skill checks to improve
                  employability.
                </p>
              </div>

              <div className="rounded-lg border p-5 md:col-span-2">
                <h3 className="font-semibold">Subscription Access</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Student tools are subscription-based and will unlock after plan
                  status is connected.
                </p>
                <button className="mt-3 text-sm font-medium text-primary underline">
                  Unsubscribe or manage student plan
                </button>
              </div>
            </div>
          )}

          {selectedProfile === "business" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Company Profile</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Businesses can manage company information, hiring needs, and
                  workforce verification tools.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Employee Profiles</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Employers will be able to manage individual employee profiles
                  and review employee TrustTags.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">TrustTag Review</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Businesses can verify worker skills, see proof status, and
                  review skill-readiness information.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Hiring and Workforce Tools</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Future tools can help employers match roles to verified skills
                  and identify training needs.
                </p>
              </div>

              <div className="rounded-lg border p-5 md:col-span-2">
                <h3 className="font-semibold">Subscription Access</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Business tools are subscription-based and will unlock after
                  business plan status is connected.
                </p>
                <button className="mt-3 text-sm font-medium text-primary underline">
                  Unsubscribe or manage business plan
                </button>
              </div>
            </div>
          )}

          {selectedProfile === "organization" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Program Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Organizations can eventually track participants, programs,
                  skill progress, and verification outcomes.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Participant Tracking</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Government and organization users can manage participants and
                  connect them to workforce readiness tools.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">TrustTag Verification Tools</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Organizations can verify participant skills and support
                  placement into jobs, training, or services.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-semibold">Reporting Tools</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Future reporting can show program impact, verified skills,
                  readiness levels, and placement progress.
                </p>
              </div>

              <div className="rounded-lg border p-5 md:col-span-2">
                <h3 className="font-semibold">Organization Access</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Advanced organization tools will unlock once account type,
                  plan status, and permissions are connected.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-5">
            <p className="text-sm text-muted-foreground">Launch Categories</p>
            <p className="mt-2 text-2xl font-semibold">{totalCategories}</p>
          </div>

          <div className="rounded-lg border p-5">
            <p className="text-sm text-muted-foreground">Launch Skills</p>
            <p className="mt-2 text-2xl font-semibold">{totalSkills}</p>
          </div>

          <div className="rounded-lg border p-5">
            <p className="text-sm text-muted-foreground">Passing Score</p>
            <p className="mt-2 text-2xl font-semibold">
              {trustTagRules.passingScorePercent}%
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <p className="text-sm text-muted-foreground">Evidence Uploads</p>
            <p className="mt-2 text-2xl font-semibold">
              {trustTagRules.minimumEvidenceUploads}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
