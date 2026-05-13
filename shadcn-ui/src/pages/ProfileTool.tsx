import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import {
  addEvidenceNoteToUnifiedProfile,
  addJobTrackerEntryToUnifiedProfile,
  emptyCareerPlanData,
  getUnifiedProfile,
  saveCareerPlanToUnifiedProfile,
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

type QuizAnswer =
  | "hands-on"
  | "people"
  | "detail"
  | "creative"
  | "leadership";

const quizQuestions = [
  {
    question: "What kind of work feels most natural to you?",
    options: [
      {
        label:
          "Fixing, building, repairing, or working with my hands",
        value: "hands-on",
      },
      {
        label:
          "Helping, teaching, supporting, or communicating with people",
        value: "people",
      },
      {
        label:
          "Organizing, tracking, checking details, or solving process problems",
        value: "detail",
      },
      {
        label:
          "Designing, writing, creating content, or making things look better",
        value: "creative",
      },
      {
        label:
          "Planning, leading, making decisions, or guiding others",
        value: "leadership",
      },
    ],
  },
];

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
          <Button onClick={() => navigate("/profile")}>
            Back to Profile
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/pricing")}
          >
            Upgrade for Advanced Tools
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ToolHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <p className="text-sm font-medium text-primary">
        {label}
      </p>

      <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h1>

      <p className="mt-3 max-w-3xl text-muted-foreground">
        {description}
      </p>
    </section>
  );
}

function EvidenceManager() {
  const [title, setTitle] = useState("");
  const [skillArea, setSkillArea] = useState("");
  const [description, setDescription] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function saveEvidenceNote() {
    if (!title.trim() || !description.trim()) {
      setSavedMessage(
        "Please add a title and description first."
      );
      return;
    }

    addEvidenceNoteToUnifiedProfile({
      title,
      skillArea,
      description,
    });

    setSavedMessage(
      "Evidence note saved to your profile."
    );

    setTitle("");
    setSkillArea("");
    setDescription("");
  }

  return (
    <>
      <ToolHeader
        label="Profile Tool"
        title="Evidence Manager"
        description="Organize proof, work samples, documents, photos, and notes that support your real skills."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Add Evidence Notes
          </h2>

          <div className="mt-5 space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Evidence title"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />

            <input
              value={skillArea}
              onChange={(e) => setSkillArea(e.target.value)}
              placeholder="Skill area"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe what this evidence proves..."
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={6}
            />

            <Button onClick={saveEvidenceNote}>
              Save Evidence Note
            </Button>

            {savedMessage && (
              <p className="text-sm font-medium text-primary">
                {savedMessage}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Evidence Checklist
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "What skill does this prove?",
              "Is the evidence clear and easy to understand?",
              "Does it show real work or real experience?",
              "Could an employer or reviewer understand it quickly?",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border bg-card p-4 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InterviewPrep() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Interview Prep"
        description="Practice interview questions and improve your responses."
      />

      <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">
          Mock Interview Question
        </h2>

        <p className="mt-4 rounded-xl border bg-background p-4 text-sm font-medium">
          {interviewQuestions[questionIndex]}
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
          rows={7}
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() =>
              setQuestionIndex(
                (current) =>
                  (current + 1) %
                  interviewQuestions.length
              )
            }
          >
            Next Question
          </Button>
        </div>
      </section>
    </>
  );
}

function RolePlayPractice() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [response, setResponse] = useState("");

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Role Play Practice"
        description="Practice workplace communication scenarios."
      />

      <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <p className="rounded-xl border bg-background p-4 text-sm font-medium">
          {rolePlayScenarios[scenarioIndex]}
        </p>

        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your response..."
          className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
          rows={7}
        />

        <Button
          className="mt-4"
          onClick={() =>
            setScenarioIndex(
              (current) =>
                (current + 1) %
                rolePlayScenarios.length
            )
          }
        >
          Next Scenario
        </Button>
      </section>
    </>
  );
}

function SkillQuizzes() {
  const [answers, setAnswers] = useState<
    Record<number, QuizAnswer>
  >({});

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Skill & Career Quizzes"
        description="Understand your strengths and career fit."
      />

      <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        {quizQuestions.map((item, index) => (
          <div
            key={item.question}
            className="mb-6 rounded-xl border bg-background p-4"
          >
            <p className="text-sm font-semibold text-foreground">
              {item.question}
            </p>

            <div className="mt-3 space-y-2">
              {item.options.map((option) => (
                <label
                  key={option.label}
                  className="flex cursor-pointer gap-3 rounded-lg border bg-card p-3 text-sm"
                >
                  <input
                    type="radio"
                    name={`quiz-${index}`}
                    checked={
                      answers[index] === option.value
                    }
                    onChange={() =>
                      setAnswers((current) => ({
                        ...current,
                        [index]:
                          option.value as QuizAnswer,
                      }))
                    }
                  />

                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function JobTracker() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Interested");
  const [savedMessage, setSavedMessage] = useState("");

  const savedCount = getUnifiedProfile().jobTracker.length;

  function saveJobEntry() {
    addJobTrackerEntryToUnifiedProfile({
      id: `job-${Date.now()}`,
      jobTitle,
      company,
      status,
      savedAt: new Date().toISOString(),
    });

    setSavedMessage(
      "Job entry saved to your profile."
    );

    setJobTitle("");
    setCompany("");
    setStatus("Interested");
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Job Search Tracker"
        description="Track job leads, applications, interviews, and follow-ups."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <input
              value={jobTitle}
              onChange={(e) =>
                setJobTitle(e.target.value)
              }
              placeholder="Job title"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />

            <input
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              placeholder="Company"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border bg-background p-4 text-sm"
            >
              <option>Interested</option>
              <option>Applied</option>
              <option>Interview Scheduled</option>
              <option>Follow Up Needed</option>
              <option>Offer Received</option>
              <option>Not Selected</option>
            </select>

            <Button onClick={saveJobEntry}>
              Save to Profile
            </Button>

            {savedMessage && (
              <p className="text-sm font-medium text-primary">
                {savedMessage}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Saved entries in unified profile:{" "}
            {savedCount}
          </p>
        </div>
      </section>
    </>
  );
}

function CareerPlan() {
  const [targetRole, setTargetRole] = useState("");
  const [currentStrengths, setCurrentStrengths] =
    useState("");
  const [skillsToBuild, setSkillsToBuild] =
    useState("");
  const [trustTagsToEarn, setTrustTagsToEarn] =
    useState("");
  const [nextStep, setNextStep] = useState("");
  const [savedMessage, setSavedMessage] =
    useState("");

  useEffect(() => {
    const profile = getUnifiedProfile();

    if (profile.careerPlan) {
      setTargetRole(
        profile.careerPlan.targetRole || ""
      );

      setCurrentStrengths(
        profile.careerPlan.currentStrengths || ""
      );

      setSkillsToBuild(
        profile.careerPlan.skillsToBuild || ""
      );

      setTrustTagsToEarn(
        profile.careerPlan.trustTagsToEarn || ""
      );

      setNextStep(
        profile.careerPlan.nextStep || ""
      );
    }
  }, []);

  function saveCareerPlan() {
    saveCareerPlanToUnifiedProfile({
      targetRole,
      currentStrengths,
      skillsToBuild,
      trustTagsToEarn,
      nextStep,
    });

    setSavedMessage(
      "Career plan saved to your profile."
    );
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Career Plan"
        description="Build a simple career snapshot that connects your goals, strengths, skills, TrustTags, and next steps."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mt-5 space-y-4">
            <input
              value={targetRole}
              onChange={(e) =>
                setTargetRole(e.target.value)
              }
              placeholder="Target role"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />

            <textarea
              value={currentStrengths}
              onChange={(e) =>
                setCurrentStrengths(e.target.value)
              }
              placeholder="Current strengths"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />

            <textarea
              value={skillsToBuild}
              onChange={(e) =>
                setSkillsToBuild(e.target.value)
              }
              placeholder="Skills to build"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />

            <textarea
              value={trustTagsToEarn}
              onChange={(e) =>
                setTrustTagsToEarn(e.target.value)
              }
              placeholder="TrustTags to earn"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />

            <textarea
              value={nextStep}
              onChange={(e) =>
                setNextStep(e.target.value)
              }
              placeholder="Next step"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />

            <Button onClick={saveCareerPlan}>
              Save to Profile
            </Button>

            {savedMessage && (
              <p className="text-sm font-medium text-primary">
                {savedMessage}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Career Snapshot
          </h2>

          <div className="mt-5 rounded-xl border bg-card p-4 text-sm">
            <p>
              <strong>Target:</strong>{" "}
              {targetRole || "Not entered yet"}
            </p>

            <p className="mt-3">
              <strong>Strengths:</strong>{" "}
              {currentStrengths || "Not entered yet"}
            </p>

            <p className="mt-3">
              <strong>Skills to Build:</strong>{" "}
              {skillsToBuild || "Not entered yet"}
            </p>

            <p className="mt-3">
              <strong>TrustTags / Proof:</strong>{" "}
              {trustTagsToEarn || "Not entered yet"}
            </p>

            <p className="mt-3">
              <strong>Next Step:</strong>{" "}
              {nextStep || "Not entered yet"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function DefaultTool() {
  return (
    <ToolHeader
      label="Profile Tool"
      title="Profile Tool"
      description="Use this section to strengthen your ProofMode profile and prepare for better opportunities."
    />
  );
}
