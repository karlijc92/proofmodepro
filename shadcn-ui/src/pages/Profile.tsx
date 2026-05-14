import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getAllTrustTags } from "@/data/proofmodeStore";

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

  const trustTags = useMemo(() => getAllTrustTags(), []);

  const trustTagCount = trustTags.length;
  const verifiedSkillCount = new Set(
    trustTags.map((record) => record.skillCode).filter(Boolean)
  ).size;
  const evidenceFileCount = trustTags.reduce((total, record) => {
    return total + (record.evidenceItems?.length ?? record.evidenceCount ?? 0);
  }, 0);

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
          <StatusCard
            label="TrustTags"
            value={trustTagCount > 0 ? String(trustTagCount) : "None yet"}
          />
          <StatusCard
            label="Verified Skills"
            value={verifiedSkillCount > 0 ? String(verifiedSkillCount) : "None yet"}
          />
          <StatusCard
            label="Evidence Files"
            value={evidenceFileCount > 0 ? String(evidenceFileCount) : "None yet"}
          />
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

function OverviewTab() {
  return (
    <div>
      <SectionHeader
        title="Profile Overview"
        text="Your regular profile is the main place for skill proof, TrustTags, evidence, and basic job-readiness tools."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <DashboardCard title="TrustTag Wallet" text="No TrustTags have been added yet." action="View TrustTag Wallet" route="/profile-preview" />
        <DashboardCard title="Verified Skills" text="Your verified skills will appear here after completed TrustTags are issued." action="View Verified Skills" route="/profile-preview" />
        <DashboardCard title="Evidence / Documents" text="Uploaded work samples, photos, documents, or proof files will be organized here." action="Open Evidence Manager" route="/profile/evidence-manager" />
        <DashboardCard title="Career Snapshot" text="Use this section to prepare your profile for employers, clients, schools, or workforce programs." action="Open Career Snapshot" route="/profile/career-plan" />
      </div>
    </div>
  );
}

function TrustTagsTab() {
  return (
    <div>
      <SectionHeader title="TrustTags" text="Create, store, and manage skill-based TrustTags connected to your profile." />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <DashboardCard title="Create New TrustTag" text="Start a new skill verification and unlock a TrustTag after passing." action="Create TrustTag" route="/create-trust-tag" />
        <DashboardCard title="Active TrustTags" text="No active TrustTags yet." action="View Active TrustTags" route="/profile-preview" />
        <DashboardCard title="Pending TrustTags" text="TrustTags waiting for payment, review, or evidence will appear here." action="View Pending TrustTags" route="/profile-preview" />
        <DashboardCard title="Needs More Evidence" text="TrustTags that need more proof will appear here." action="Open Evidence Manager" route="/profile/evidence-manager" />
        <DashboardCard title="Expired TrustTags" text="Expired TrustTags will appear here so they can be renewed if needed." action="View Expired TrustTags" route="/profile-preview" />
      </div>
    </div>
  );
}

function JobToolsTab() {
  return (
    <div>
      <SectionHeader title="Job Enhancement Tools" text="Use these tools to strengthen your profile, prepare for work, and turn verified skills into real opportunities." />

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Resume Builder" text="Turn verified skills and TrustTags into resume-ready language." action="Open Resume Builder" route="/profile/resume-builder" />
        <DashboardCard title="Interview Prep" text="Practice common interview questions and prepare stronger answers." action="Open Interview Prep" route="/profile/interview-prep" />
        <DashboardCard title="Role Play Practice" text="Practice workplace conversations, customer service situations, and job scenarios." action="Open Role Play" route="/profile/role-play" />
        <DashboardCard title="Skill Quizzes" text="Take readiness quizzes to check where you are strong and where you need practice." action="Open Skill Quizzes" route="/profile/skill-quizzes" />
        <DashboardCard title="Job Search Tracker" text="Track applications, interviews, follow-ups, and next steps." action="Open Job Tracker" route="/profile/job-tracker" />
        <DashboardCard title="Career Plan" text="Create a simple plan for improving skills, building proof, and applying for better opportunities." action="Open Career Plan" route="/profile/career-plan" />
      </div>
    </div>
  );
}

function StudentTab() {
  return (
    <LockedArea
      title="Student Profile"
      text="Student profiles include extra tools for school-to-work preparation, employment help, interview practice, role play, quizzes, and resume support."
      tools={["Student career dashboard", "Interview prep", "Role play practice", "Job-readiness quizzes", "Resume and application help", "Career planning tools"]}
      footer="Student tools require an active student subscription."
      showUnsubscribe
    />
  );
}

function BusinessTab() {
  return (
    <LockedArea
      title="Business / Employer Profile"
      text="Business profiles help employers manage workers, employee profiles, verified skills, TrustTags, hiring needs, and workforce development."
      tools={["Company profile", "Employee profile management", "Employee TrustTag review", "Hiring readiness tools", "Workforce skill tracking", "Team development tools"]}
      footer="Business tools require an active business subscription."
      showUnsubscribe
    />
  );
}

function OrganizationTab() {
  return (
    <LockedArea
      title="Government / Organization Profile"
      text="Organization profiles support programs that track participants, verify skills, monitor readiness, and support workforce placement."
      tools={["Program dashboard", "Participant tracking", "TrustTag verification tools", "Workforce readiness tracking", "Program outcome reporting", "Placement support tools"]}
      footer="Organization tools require approved organization access."
    />
  );
}

function SubscriptionTab() {
  return (
    <div>
      <SectionHeader title="Subscription Access" text="Regular profiles are included. Student, business, and organization tools unlock through the correct plan or approved account type." />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PlanCard title="Regular Profile" status="Included" text="TrustTags, verified skills, evidence, and basic job-readiness tools." button="Current Plan" />
        <PlanCard title="Student Profile" status="Locked" text="Interview prep, role play, quizzes, resume help, and career support." button="View Student Plan" route="/pricing" showUnsubscribe />
        <PlanCard title="Business Profile" status="Locked" text="Employee profiles, TrustTag review, hiring tools, and workforce management." button="View Business Plan" route="/pricing" showUnsubscribe />
      </div>
    </div>
  );
}

function LockedArea({ title, text, tools, footer, showUnsubscribe }: { title: string; text: string; tools: string[]; footer: string; showUnsubscribe?: boolean }) {
  const navigate = useNavigate();

  return (
    <div>
      <SectionHeader title={title} text={text} />

      <div className="mt-6 rounded-2xl border bg-background p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-medium text-primary">Locked Access</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">Upgrade Required</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{footer}</p>
          </div>

          <Button onClick={() => navigate("/pricing")}>Unlock Tools</Button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool} className="rounded-xl border bg-card p-4 text-sm font-medium text-foreground">
              {tool}
            </div>
          ))}
        </div>

        {showUnsubscribe && (
          <button onClick={() => navigate("/contact")} className="mt-5 text-sm font-medium text-primary underline">
            Manage or cancel subscription
          </button>
        )}
      </div>
    </div>
  );
}

function DashboardCard({ title, text, action, route }: { title: string; text: string; action: string; route: string }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border bg-background p-5">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-2 min-h-12 text-sm text-muted-foreground">{text}</p>
      <Button variant="outline" className="mt-4" onClick={() => navigate(route)}>
        {action}
      </Button>
    </div>
  );
}

function PlanCard({ title, status, text, button, route, showUnsubscribe }: { title: string; status: string; text: string; button: string; route?: string; showUnsubscribe?: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border bg-background p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">{status}</span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{text}</p>

      <Button variant="outline" className="mt-4 w-full" disabled={!route} onClick={() => route && navigate(route)}>
        {button}
      </Button>

      {showUnsubscribe && (
        <button onClick={() => navigate("/contact")} className="mt-3 w-full text-sm font-medium text-primary underline">
          Manage or cancel subscription
        </button>
      )}
    </div>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function SectionHeader({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
