import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type ProfileTab =
  | "overview"
  | "trusttags"
  | "job-tools"
  | "student"
  | "business"
  | "organization"
  | "subscription";

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "trusttags", label: "TrustTags" },
  { id: "job-tools", label: "Job Tools" },
  { id: "student", label: "Student" },
  { id: "business", label: "Business" },
  { id: "organization", label: "Organization" },
  { id: "subscription", label: "Subscription" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-medium text-primary">ProofMode Account</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
                My Profile
              </h1>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Manage your TrustTags, verified skills, evidence, job tools, and
                profile access from one place.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-4 text-sm">
              <p className="text-muted-foreground">Account Type</p>
              <p className="mt-1 font-semibold text-foreground">Regular Profile</p>

              <p className="mt-3 text-muted-foreground">Subscription Access</p>
              <p className="mt-1 font-semibold text-foreground">
                Student, Business, and Organization tools locked
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <StatusCard label="TrustTags" value="None yet" />
          <StatusCard label="Verified Skills" value="None yet" />
          <StatusCard label="Evidence Files" value="None yet" />
          <StatusCard label="Profile Type" value="Regular" />
        </section>

        <section className="mt-8 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "trusttags" && <TrustTagsTab />}
          {activeTab === "job-tools" && <JobToolsTab />}
          {activeTab === "student" && <StudentTab />}
          {activeTab === "business" && <BusinessTab />}
          {activeTab === "organization" && <OrganizationTab />}
          {activeTab === "subscription" && <SubscriptionTab />}
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- TABS ---------- */

function OverviewTab() {
  return (
    <div>
      <SectionHeader title="Profile Overview" text="Your regular profile is the main place for skill proof, TrustTags, evidence, and job tools." />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <DashboardCard title="TrustTag Wallet" text="No TrustTags yet." action="Create a TrustTag" route="/create-trust-tag" />
        <DashboardCard title="Verified Skills" text="Verified skills appear after passing." action="Start Verification" route="/create-trust-tag" />
        <DashboardCard title="Evidence / Documents" text="Upload proof tied to TrustTags." action="Add Evidence" route="/create-trust-tag" />
        <DashboardCard title="Career Snapshot" text="Prepare profile for employers." action="Build Career Snapshot" route="/profile/resume-builder" />
      </div>
    </div>
  );
}

function TrustTagsTab() {
  return (
    <div>
      <SectionHeader title="TrustTags" text="Manage your skill-based TrustTags." />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <DashboardCard title="Active TrustTags" text="None yet." action="Create a TrustTag" route="/create-trust-tag" />
        <DashboardCard title="Pending" text="Awaiting action." action="View Pending" route="/verify" />
        <DashboardCard title="Needs Evidence" text="Upload more proof." action="Upload Evidence" route="/create-trust-tag" />
        <DashboardCard title="Expired" text="Renew if needed." action="View Expired" route="/verify" />
      </div>
    </div>
  );
}

function JobToolsTab() {
  return (
    <div>
      <SectionHeader title="Job Tools" text="Turn skills into opportunities." />

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Resume Builder" text="Build resume from skills." action="Open Resume Builder" route="/profile/resume-builder" />
        <DashboardCard title="Interview Prep" text="Practice interviews." action="Coming Soon" route="/profile/resume-builder" />
        <DashboardCard title="Role Play" text="Practice scenarios." action="Coming Soon" route="/profile/resume-builder" />
        <DashboardCard title="Skill Quizzes" text="Check readiness." action="Take Quiz" route="/create-trust-tag" />
        <DashboardCard title="Job Tracker" text="Track applications." action="Coming Soon" route="/profile/resume-builder" />
        <DashboardCard title="Career Plan" text="Plan growth." action="View Plans" route="/pricing" />
      </div>
    </div>
  );
}

/* ---------- LOCKED AREAS ---------- */

function StudentTab() {
  return <LockedArea title="Student Profile" footer="Requires student plan." />;
}

function BusinessTab() {
  return <LockedArea title="Business Profile" footer="Requires business plan." />;
}

function OrganizationTab() {
  return <LockedArea title="Organization Profile" footer="Requires access." />;
}

function SubscriptionTab() {
  return (
    <div>
      <SectionHeader title="Subscriptions" text="Unlock additional tools." />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PlanCard title="Regular" status="Active" button="Current Plan" />
        <PlanCard title="Student" status="Locked" button="View Plan" route="/pricing" />
        <PlanCard title="Business" status="Locked" button="View Plan" route="/pricing" />
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function LockedArea({ title, footer }: { title: string; footer: string }) {
  const navigate = useNavigate();

  return (
    <div>
      <SectionHeader title={title} text={footer} />
      <Button onClick={() => navigate("/pricing")}>Unlock</Button>
    </div>
  );
}

function DashboardCard({ title, text, action, route }: any) {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border bg-background p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <Button className="mt-4" onClick={() => navigate(route)}>
        {action}
      </Button>
    </div>
  );
}

function PlanCard({ title, status, button, route }: any) {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border p-5">
      <h3>{title}</h3>
      <p>{status}</p>
      <Button onClick={() => route && navigate(route)}>{button}</Button>
    </div>
  );
}

function StatusCard({ label, value }: any) {
  return (
    <div className="rounded-2xl border p-5">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}

function SectionHeader({ title, text }: any) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
