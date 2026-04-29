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
    label: "Included",
    description:
      "Store TrustTags, show verified skills, track status, and use basic job-readiness tools.",
  },
  {
    id: "student" as ProfileType,
    title: "Student Profile",
    label: "Subscription",
    description:
      "Adds interview prep, role play, quizzes, resume support, and student career tools.",
  },
  {
    id: "business" as ProfileType,
    title: "Business / Employer Profile",
    label: "Subscription",
    description:
      "Manage employee profiles, review TrustTags, and support hiring or workforce development.",
  },
  {
    id: "organization" as ProfileType,
    title: "Government / Organization Profile",
    label: "Subscription",
    description:
      "Track participants, verify skills, support workforce programs, and view readiness progress.",
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        <section className="mb-10 rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-primary">Your Profile</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Show what you can do. Get recognized for it.
          </h1>

          <p className="mt-3 max-w-3xl text-muted-foreground">
            Your profile brings your verified skills, TrustTags, and work-readiness
            tools into one place. Use it to show proof of your abilities, track your
            progress, and prepare for jobs, school programs, hiring, or workforce
            opportunities.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {profileTypes.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(profile.id)}
              className={`rounded-2xl border bg-card p-5 text-left shadow-sm transition hover:border-primary ${
                selectedProfile === profile.id
                  ? "border-primary ring-1 ring-primary"
                  : "border-border"
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-semibold text-foreground">{profile.title}</h2>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  {profile.label}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {profile.description}
              </p>
            </button>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-primary">
                Selected Profile Type
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-foreground">
                {selected?.title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {selected?.description}
              </p>
            </div>

            {selected?.label === "Subscription" ? (
              <Button variant="outline">Manage Subscription</Button>
            ) : (
              <Button variant="outline">Included Profile</Button>
            )}
          </div>

          {selectedProfile === "regular" && (
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileCard
                title="TrustTag Wallet"
                text="Your TrustTags will appear here after your account is connected. Each TrustTag will show the verified skill, score, status, evidence, and expiration details."
              />

              <ProfileCard
                title="Verification Status"
                text="See which TrustTags are active, pending, need more evidence, or expired so you always know what is ready to share."
              />

              <ProfileCard
                title="Basic Job Readiness"
                text="Use basic tools to understand your strongest skills, identify next steps, and prepare to share proof with employers or clients."
              />

              <ProfileCard
                title="Profile Overview"
                text="Your regular profile is the foundation. Subscription profiles add more tools, but the regular profile remains focused on proof, skills, and readiness."
              />
            </div>
          )}

          {selectedProfile === "student" && (
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileCard
                title="Student Career Hub"
                text="A guided space for students to prepare for work, build confidence, and connect verified skills to real employment goals."
              />

              <ProfileCard
                title="Interview Prep"
                text="Practice common interview questions, prepare stronger answers, and build confidence before applying for jobs or internships."
              />

              <ProfileCard
                title="Role Play Practice"
                text="Practice workplace conversations, customer service situations, interviews, and professional communication scenarios."
              />

              <ProfileCard
                title="Quizzes and Readiness Checks"
                text="Use quizzes and skill checks to strengthen job-readiness and identify areas that need more practice."
              />

              <div className="rounded-2xl border border-border bg-background p-5 md:col-span-2">
                <h3 className="font-semibold text-foreground">
                  Student Subscription Access
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  These tools are part of the student profile subscription. Access
                  will be unlocked after account login and plan status are connected.
                </p>
                <button className="mt-3 text-sm font-medium text-primary underline">
                  Unsubscribe or manage student plan
                </button>
              </div>
            </div>
          )}

          {selectedProfile === "business" && (
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileCard
                title="Company Profile"
                text="Manage company details, hiring needs, workforce goals, and the skills your business wants to verify."
              />

              <ProfileCard
                title="Employee Profiles"
                text="Manage individual employee profiles and view TrustTags connected to workers, teams, or applicants."
              />

              <ProfileCard
                title="TrustTag Review"
                text="Review verified skills, evidence status, readiness, and TrustTag details before making hiring or placement decisions."
              />

              <ProfileCard
                title="Hiring and Workforce Tools"
                text="Use skill verification to support hiring, training, internal mobility, and workforce development."
              />

              <div className="rounded-2xl border border-border bg-background p-5 md:col-span-2">
                <h3 className="font-semibold text-foreground">
                  Business Subscription Access
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Business tools are part of the employer subscription. Access will
                  be unlocked after account login and plan status are connected.
                </p>
                <button className="mt-3 text-sm font-medium text-primary underline">
                  Unsubscribe or manage business plan
                </button>
              </div>
            </div>
          )}

          {selectedProfile === "organization" && (
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileCard
                title="Program Dashboard"
                text="Track participants, skill progress, verified abilities, and workforce-readiness outcomes across programs."
              />

              <ProfileCard
                title="Participant Tracking"
                text="Manage participant profiles and connect people to training, placement, support services, or verified opportunities."
              />

              <ProfileCard
                title="TrustTag Verification Tools"
                text="Verify participant skills and use TrustTags to support job placement, program reporting, or workforce planning."
              />

              <ProfileCard
                title="Reporting Tools"
                text="Future reporting can show verified skills, readiness levels, program impact, and placement progress."
              />

              <div className="rounded-2xl border border-border bg-background p-5 md:col-span-2">
                <h3 className="font-semibold text-foreground">
                  Organization Access
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Advanced organization tools will unlock once account type, plan
                  status, and permissions are connected.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Launch Categories" value={totalCategories} />
          <StatCard label="Launch Skills" value={totalSkills} />
          <StatCard
            label="Passing Score"
            value={`${trustTagRules.passingScorePercent}%`}
          />
          <StatCard
            label="Minimum Evidence Uploads"
            value={trustTagRules.minimumEvidenceUploads}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProfileCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
