import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type ToolContent = {
  title: string;
  label: string;
  description: string;
  examples: string[];
  primaryAction: string;
};

const toolContent: Record<string, ToolContent> = {
  "/profile/evidence-manager": {
    title: "Evidence Manager",
    label: "Profile Tool",
    description:
      "Organize proof files, work samples, documents, photos, and supporting evidence connected to future TrustTags.",
    examples: [
      "Upload work samples",
      "Track documents tied to skills",
      "Prepare evidence for review",
      "Keep proof organized for employers or programs",
    ],
    primaryAction: "Evidence uploads will connect here later",
  },
  "/profile/interview-prep": {
    title: "Interview Prep",
    label: "Job Tool",
    description:
      "Prepare stronger interview answers using your skills, experience, and ProofMode profile.",
    examples: [
      "Practice common interview questions",
      "Prepare answers using real experience",
      "Turn verified skills into talking points",
      "Build confidence before interviews",
    ],
    primaryAction: "Interview practice will be built here",
  },
  "/profile/role-play": {
    title: "Role Play Practice",
    label: "Job Tool",
    description:
      "Practice workplace conversations, customer service situations, and job scenarios.",
    examples: [
      "Practice customer conversations",
      "Practice supervisor conversations",
      "Practice conflict resolution",
      "Practice job-specific scenarios",
    ],
    primaryAction: "Role play tools will be built here",
  },
  "/profile/skill-quizzes": {
    title: "Skill Quizzes",
    label: "Job Tool",
    description:
      "Take readiness quizzes to understand strengths, gaps, and areas to improve.",
    examples: [
      "Check skill readiness",
      "Prepare before assessments",
      "Identify weak areas",
      "Build confidence before verification",
    ],
    primaryAction: "Skill quizzes will be built here",
  },
  "/profile/job-tracker": {
    title: "Job Search Tracker",
    label: "Job Tool",
    description:
      "Track applications, interviews, follow-ups, deadlines, and next steps.",
    examples: [
      "Save jobs applied to",
      "Track interview dates",
      "Track follow-up reminders",
      "Organize job search progress",
    ],
    primaryAction: "Job tracker will be built here",
  },
  "/profile/career-plan": {
    title: "Career Plan",
    label: "Job Tool",
    description:
      "Create a clear plan for improving skills, building proof, and applying for better opportunities.",
    examples: [
      "Choose target jobs",
      "List skills to improve",
      "Plan TrustTags to earn",
      "Create next-step career goals",
    ],
    primaryAction: "Career planning will be built here",
  },
};

export default function ProfileTool() {
  const location = useLocation();
  const navigate = useNavigate();

  const content = useMemo(() => {
    return (
      toolContent[location.pathname] || {
        title: "Profile Tool",
        label: "Profile Tool",
        description:
          "This profile tool is being prepared as part of the ProofMode profile system.",
        examples: [
          "Profile support",
          "Skill development",
          "Job-readiness support",
          "Proof-backed career tools",
        ],
        primaryAction: "Tool functionality will be built here",
      }
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-primary">{content.label}</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {content.title}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {content.description}
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              What This Tool Will Support
            </h2>

            <div className="mt-5 space-y-3">
              {content.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-xl border bg-background p-4 text-sm font-medium text-foreground"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Tool Status
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              This page is connected so users do not hit dead buttons or 404
              pages. Full functionality can be expanded after the full profile
              system is routed and stable.
            </p>

            <div className="mt-6 rounded-xl border bg-card p-4">
              <p className="text-sm font-medium text-primary">Next Build Step</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {content.primaryAction}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => navigate("/profile")}>
                Back to Profile
              </Button>
              <Button variant="outline" onClick={() => navigate("/pricing")}>
                View Upgrade Options
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
