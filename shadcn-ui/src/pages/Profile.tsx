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
  { id: "regular" as ProfileType, title: "Regular", status: "Active" },
  { id: "student" as ProfileType, title: "Student", status: "Locked" },
  { id: "business" as ProfileType, title: "Business", status: "Locked" },
  { id: "organization" as ProfileType, title: "Organization", status: "Locked" },
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
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-medium text-primary">
                ProofMode Profile
              </p>
              <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
                Karli’s Skill Profile
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Verified skills, TrustTags, job-readiness tools, and profile
                access in one place.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-4 text-sm">
              <p className="text-muted-foreground">Profile Status</p>
              <p className="mt-1 font-semibold text-foreground">Regular Active</p>
              <p className="mt-2 text-muted-foreground">Subscription Access</p>
              <p className="mt-1 font-semibold text-foreground">
                Student / Business / Organization Locked
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="TrustTags" value="0 Active" />
          <StatCard label="Verified Skills" value="0" />
          <StatCard label="Profile Completion" value="35%" />
          <StatCard label="Readiness Level" value="Starter" />
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
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
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-foreground">
                  {profile.title} Profile
                </h2>
                <span className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                  {profile.status}
                </span>
              </div>
            </button>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-primary">Current View</p>
              <h2 className="mt-1 text-2xl font-semibold text-foreground">
                {selected?.title} Profile
              </h2>
            </div>

            {selectedProfile === "regular" ? (
              <Button variant="outline">Edit Profile</Button>
            ) : (
              <Button variant="outline">Upgrade to Unlock</Button>
            )}
          </div>

          {selectedProfile === "regular" && (
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileCard
                title="TrustTag Wallet"
                value="No active TrustTags yet"
                text="Completed and issued TrustTags will appear here with skill name, score, status, evidence count, and expiration date."
              />
              <ProfileCard
                title="Verified Skills"
                value="Start by creating a TrustTag"
                text="Build proof around skills such as bookkeeping, customer service, trades, technology, and freelance work."
              />
              <ProfileCard
                title="Job Readiness"
                value="Starter"
                text="Use your profile to track skill proof, readiness, and next steps before applying for work or sharing your profile."
              />
              <ProfileCard
                title="Profile Tools"
                value="Included"
                text="Basic profile, TrustTag storage, verification status, and readiness tracking are part of the regular profile."
              />
            </div>
          )}

          {selectedProfile === "student" && (
            <LockedProfile
              title="Student Career Profile"
              description="Unlock student tools for interview practice, role play, quizzes, resume help, and job-readiness support."
              items={[
                "Interview practice",
                "Role play scenarios",
                "Career readiness quizzes",
                "Resume and job search help",
              ]}
              unsubscribeText="Manage or cancel student subscription"
            />
          )}

          {selectedProfile === "business" && (
            <LockedProfile
              title="Business / Employer Profile"
              description="Unlock employer tools for employee profiles, TrustTag review, hiring support, and workforce development."
              items={[
                "Company profile",
                "Employee profile management",
                "Employee TrustTag review",
                "Hiring and workforce tools",
              ]}
              unsubscribeText="Manage or cancel business subscription"
            />
          )}

          {selectedProfile === "organization" && (
            <LockedProfile
              title="Government / Organization Profile"
              description="Unlock organization tools for participant tracking, skill verification, program readiness, and reporting."
              items={[
                "Participant tracking",
                "Program dashboard",
                "TrustTag verification tools",
                "Workforce readiness reporting",
              ]}
            />
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

function ProfileCard({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="mt-2 font-semibold text-foreground">{value}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function LockedProfile({
  title,
  description,
  items,
  unsubscribeText,
}: {
  title: string;
  description: string;
  items: string[];
  unsubscribeText?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="text-sm font-medium text-primary">Locked Profile</p>
          <h3 className="mt-1 text-xl font-semibold text-foreground">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <Button>Unlock Access</Button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-xl border bg-card p-4 text-sm">
            {item}
          </div>
        ))}
      </div>

      {unsubscribeText && (
        <button className="mt-5 text-sm font-medium text-primary underline">
          {unsubscribeText}
        </button>
      )}
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
