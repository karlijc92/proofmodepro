import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import {
  addEvidenceNoteToUnifiedProfile,
  addJobTrackerEntryToUnifiedProfile,
  getEvidenceNotes,
  getJobTrackerEntries,
  getCareerPlan,
  saveCareerPlanToUnifiedProfile,
  ProofModeJobTrackerEntry,
  ProofModeEvidenceNote,
} from "@/data/proofmodeProfileStore";

type ToolKey =
  | "evidence"
  | "interview"
  | "roleplay"
  | "quizzes"
  | "tracker"
  | "career"
  | "default";

const routeToTool: Record<string, ToolKey> = {
  "/profile/evidence-manager": "evidence",
  "/profile/interview-prep": "interview",
  "/profile/role-play": "roleplay",
  "/profile/skill-quizzes": "quizzes",
  "/profile/job-tracker": "tracker",
  "/profile/career-plan": "career",
};

const interviewQuestions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "Describe a time you solved a problem at work.",
  "Tell me about a time you handled pressure or a difficult situation.",
  "What is one skill you are strongest in, and how have you used it?",
  "Describe a time you had to learn something quickly.",
  "Tell me about a time you dealt with a difficult customer, client, coworker, or supervisor.",
  "What are your strengths?",
  "What is an area you are working to improve?",
  "Why should an employer or client trust your experience?",
  "Tell me about a time you made a mistake and how you handled it.",
  "Where do you see yourself growing professionally?",
];

const rolePlayScenarios = [
  "A customer says your work was done incorrectly.",
  "A supervisor asks why a task was not finished on time.",
  "A coworker is not doing their part and it is affecting your work.",
  "A client asks why they should trust your experience.",
  "An employer asks you to explain a gap or informal work history.",
];

type QuizAnswer = "hands-on" | "people" | "detail" | "creative" | "leadership";

const quizQuestions = [
  {
    question: "What kind of work feels most natural to you?",
    options: [
      { label: "Fixing, building, repairing, or working with my hands", value: "hands-on" },
      { label: "Helping, teaching, supporting, or communicating with people", value: "people" },
      { label: "Organizing, tracking, checking details, or solving process problems", value: "detail" },
      { label: "Designing, writing, creating content, or making things look better", value: "creative" },
      { label: "Planning, leading, making decisions, or guiding others", value: "leadership" },
    ],
  },
];

function isLowQualityText(text: string) {
  const cleaned = text.trim().toLowerCase();
  const lettersOnly = cleaned.replace(/[^a-z]/g, "");
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;

  if (cleaned.length < 20) return true;
  if (wordCount < 5) return true;
  if (/(.)\1{4,}/.test(cleaned)) return true;
  if (lettersOnly.length > 0) {
    const vowelCount = (lettersOnly.match(/[aeiou]/g) || []).length;
    if (vowelCount / lettersOnly.length < 0.18) return true;
  }

  return false;
}

function buildInterviewFeedback(answer: string) {
  if (isLowQualityText(answer)) {
    return "This does not look like a complete interview answer yet. Add a clear example, explain what you did, and end with the result or lesson learned.";
  }

  const lower = answer.toLowerCase();
  const hasExample =
    lower.includes("for example") ||
    lower.includes("one time") ||
    lower.includes("when i") ||
    lower.includes("in my role") ||
    lower.includes("at work") ||
    lower.includes("during");
  const hasAction =
    lower.includes("i did") ||
    lower.includes("i handled") ||
    lower.includes("i helped") ||
    lower.includes("i learned") ||
    lower.includes("i solved") ||
    lower.includes("i communicated") ||
    lower.includes("i made sure");
  const hasResult =
    lower.includes("result") ||
    lower.includes("because of that") ||
    lower.includes("this helped") ||
    lower.includes("we were able") ||
    lower.includes("it improved") ||
    lower.includes("i learned");

  if (hasExample && hasAction && hasResult) {
    return "Strong answer. You gave context, explained your action, and connected it to a result. To make it even stronger, keep it concise and tie it directly to the job you want.";
  }

  if (hasExample && hasAction) {
    return "Good start. You gave an example and explained what you did. Add the outcome so an employer can clearly see the value of your experience.";
  }

  if (hasAction) {
    return "This has useful information, but it needs a stronger structure. Try using: situation, what you did, and what happened afterward.";
  }

  return "This needs more detail before it would work well in an interview. Add a real situation, the action you took, and the outcome.";
}

function buildRolePlayFeedback(response: string) {
  if (isLowQualityText(response)) {
    return "This does not look like a real workplace response yet. Write what you would actually say, acknowledge the issue, stay professional, and include the next step.";
  }

  const lower = response.toLowerCase();
  const acknowledges =
    lower.includes("understand") ||
    lower.includes("i hear") ||
    lower.includes("i see") ||
    lower.includes("sorry") ||
    lower.includes("thank you") ||
    lower.includes("appreciate");
  const staysProfessional =
    !lower.includes("stupid") &&
    !lower.includes("shut up") &&
    !lower.includes("not my problem") &&
    !lower.includes("whatever");
  const nextStep =
    lower.includes("i will") ||
    lower.includes("i can") ||
    lower.includes("let me") ||
    lower.includes("next") ||
    lower.includes("fix") ||
    lower.includes("follow up") ||
    lower.includes("check");

  if (acknowledges && staysProfessional && nextStep) {
    return "Strong workplace response. You acknowledged the concern, stayed professional, and gave a clear next step. That is the right structure for customer, coworker, and supervisor situations.";
  }

  if (staysProfessional && nextStep) {
    return "Good response. It gives a next step and stays professional. Add a short acknowledgment first so the other person feels heard.";
  }

  if (acknowledges && staysProfessional) {
    return "This starts well because it acknowledges the issue. Add a clear next step so the conversation moves toward a solution.";
  }

  return "This needs to sound more professional and solution-focused. A stronger answer should acknowledge the concern, stay calm, and explain what you will do next.";
}

export default function ProfileTool() {
  const location = useLocation();
  const navigate = useNavigate();

  const tool = useMemo<ToolKey>(
    () => routeToTool[location.pathname] || "default",
    [location.pathname]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        {tool === "evidence" && <EvidenceManager />}
        {tool === "interview" && <InterviewPrep />}
        {tool === "roleplay" && <RolePlayPractice />}
        {tool === "quizzes" && <SkillQuizzes />}
        {tool === "tracker" && <JobTracker />}
        {tool === "career" && <CareerPlan />}
        {tool === "default" && <DefaultTool />}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => navigate("/profile")}>Back to Profile</Button>

          <Button variant="outline" onClick={() => navigate("/pricing")}>
            Upgrade for Advanced Tools
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ToolHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <p className="text-sm font-medium text-primary">{label}</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
    </section>
  );
}

function EvidenceManager() {
  const [title, setTitle] = useState("");
  const [skillArea, setSkillArea] = useState("");
  const [description, setDescription] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const
