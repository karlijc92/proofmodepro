import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type ToolContent = {
  title: string;
  label: string;
  description: string;
  examples: string[];
};

const toolContent: Record<string, ToolContent> = {
  "/profile/evidence-manager": {
    title: "Evidence Manager",
    label: "Profile Tool",
    description:
      "Organize and prepare your proof, work samples, and documents to support your skills and future TrustTags.",
    examples: [
      "Upload work samples",
      "Add photos or documents",
      "Prepare proof for TrustTags",
      "Organize files for employers",
    ],
  },
  "/profile/interview-prep": {
    title: "Interview Prep",
    label: "Job Tool",
    description:
      "Practice answering real interview questions using your experience and verified skills.",
    examples: [
      "Tell me about yourself",
      "Describe your experience with [skill]",
      "Give an example of a challenge you solved",
      "Why should we hire you?",
    ],
  },
  "/profile/role-play": {
    title: "Role Play Practice",
    label: "Job Tool",
    description:
      "Practice real workplace conversations and situations to build confidence.",
    examples: [
      "Customer complaint scenario",
      "Talking to a supervisor",
      "Handling a mistake at work",
      "Workplace communication",
    ],
  },
  "/profile/skill-quizzes": {
    title: "Skill Quizzes",
    label: "Job Tool",
    description:
      "Test your knowledge and identify areas to improve before real assessments.",
    examples: [
      "Basic knowledge checks",
      "Scenario-based questions",
      "Skill readiness tests",
      "Confidence building quizzes",
    ],
  },
  "/profile/job-tracker": {
    title: "Job Search Tracker",
    label: "Job Tool",
    description:
      "Track your job applications, interviews, and follow-ups in one place.",
    examples: [
      "Job applied to",
      "Interview scheduled",
      "Follow-up reminders",
      "Application status",
    ],
  },
  "/profile/career-plan": {
    title: "Career Plan",
    label: "Job Tool",
    description:
      "Create a simple plan to improve your skills, build proof, and reach better opportunities.",
    examples: [
      "Target job roles",
      "Skills to improve",
      "TrustTags to earn",
      "Next steps",
    ],
  },
};

export default function ProfileTool() {
  const location = useLocation();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const content = useMemo(() => {
    return (
      toolContent[location.pathname] || {
        title: "Profile Tool",
        label: "Profile Tool",
        description:
          "Use this tool to strengthen your profile and improve your job readiness.",
        examples: ["Skill building", "Career growth", "Job preparation"],
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
          {/* LEFT SIDE */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Practice / Input
            </h2>

            <div className="mt-5 space-y-4">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your response, notes, or practice answers here..."
                className="w-full rounded-xl border p-4 text-sm"
                rows={6}
              />

              <Button variant="outline">
                Save Progress (coming soon)
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Examples & Guidance
            </h2>

            <div className="mt-5 space-y-3">
              {content.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-xl border bg-card p-4 text-sm font-medium text-foreground"
                >
                  {example}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => navigate("/profile")}>
                Back to Profile
              </Button>
              <Button variant="outline" onClick={() => navigate("/pricing")}>
                Upgrade for Advanced Tools
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
