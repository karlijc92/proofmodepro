import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

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
  "Describe a time you solved a problem at work.",
  "What is one skill you are strongest in, and how have you used it?",
  "Why should an employer or client trust your experience?",
];

const rolePlayScenarios = [
  "A customer is upset and says the work was not done correctly.",
  "A supervisor asks why a task was not finished on time.",
  "A coworker is not doing their part and it is affecting your work.",
  "A client asks you to explain your experience before hiring you.",
];

const quizQuestions = [
  {
    question: "What is the strongest way to prove a skill?",
    answer: "Use real examples, evidence, and clear results.",
  },
  {
    question: "What should you do before an interview?",
    answer: "Prepare examples from your actual experience.",
  },
  {
    question: "Why are TrustTags useful?",
    answer: "They help turn skills into proof employers can understand.",
  },
];

export default function ProfileTool() {
  const location = useLocation();
  const navigate = useNavigate();

  const tool = useMemo<ToolKey>(() => {
    return routeToTool[location.pathname] || "default";
  }, [location.pathname]);

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
      <p className="text-sm font-medium text-primary">{label}</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
    </section>
  );
}

function EvidenceManager() {
  const [evidenceNote, setEvidenceNote] = useState("");

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
          <p className="mt-2 text-sm text-muted-foreground">
            Write down what the proof shows, what skill it supports, and why it matters.
          </p>

          <textarea
            value={evidenceNote}
            onChange={(e) => setEvidenceNote(e.target.value)}
            placeholder="Example: Photo of completed flooring project. Shows measuring, cutting, installation, and finishing work."
            className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
            rows={7}
          />
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
              <div key={item} className="rounded-xl border bg-card p-4 text-sm font-medium">
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
  const [feedback, setFeedback] = useState("");

  const question = interviewQuestions[questionIndex];

  function reviewAnswer() {
    const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < 20) {
      setFeedback(
        "This answer is too short. Add a real example, explain what you did, and include the result."
      );
      return;
    }

    if (!answer.toLowerCase().includes("example") && !answer.toLowerCase().includes("time")) {
      setFeedback(
        "Good start. To make it stronger, include a specific example from your real experience."
      );
      return;
    }

    setFeedback(
      "Strong answer. You gave enough detail. To improve it further, add a clear result, number, outcome, or lesson learned."
    );
  }

  function nextQuestion() {
    setQuestionIndex((current) => (current + 1) % interviewQuestions.length);
    setAnswer("");
    setFeedback("");
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Interview Prep"
        description="Practice mock interview questions, type your answer, and get simple feedback on how to improve it."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Mock Interview Question
          </h2>
          <p className="mt-4 rounded-xl border bg-background p-4 text-sm font-medium">
            {question}
          </p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your interview answer here..."
            className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
            rows={7}
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button onClick={reviewAnswer}>Review My Answer</Button>
            <Button variant="outline" onClick={nextQuestion}>
              New Question
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Answer Feedback
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Feedback will appear here after you review your answer.
          </p>

          {feedback && (
            <div className="mt-5 rounded-xl border bg-card p-4 text-sm font-medium text-foreground">
              {feedback}
            </div>
          )}

          <div className="mt-6 rounded-xl border bg-card p-4 text-sm text-muted-foreground">
            Strong answers usually include: situation, action, result, and what you learned.
          </div>
        </div>
      </section>
    </>
  );
}

function RolePlayPractice() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [response, setResponse] = useState("");

  const scenario = rolePlayScenarios[scenarioIndex];

  function nextScenario() {
    setScenarioIndex((current) => (current + 1) % rolePlayScenarios.length);
    setResponse("");
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Role Play Practice"
        description="Practice real workplace conversations so you can respond with confidence and professionalism."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Workplace Scenario
          </h2>
          <p className="mt-4 rounded-xl border bg-background p-4 text-sm font-medium">
            {scenario}
          </p>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type what you would say in this situation..."
            className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
            rows={7}
          />

          <Button className="mt-4" onClick={nextScenario}>
            Try Another Scenario
          </Button>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Response Tips
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "Stay calm and respectful.",
              "Acknowledge the problem clearly.",
              "Explain what action you will take.",
              "Avoid blaming or overexplaining.",
              "End with a next step.",
            ].map((tip) => (
              <div key={tip} className="rounded-xl border bg-card p-4 text-sm font-medium">
                {tip}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SkillQuizzes() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Skill Quizzes"
        description="Use quick readiness questions to prepare before assessments and strengthen your profile."
      />

      <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">
          Readiness Check
        </h2>

        <div className="mt-5 space-y-4">
          {quizQuestions.map((item, index) => (
            <div key={item.question} className="rounded-xl border bg-background p-4">
              <p className="text-sm font-medium text-foreground">{item.question}</p>
              <Button
                variant="outline"
                className="mt-3"
                onClick={() => setSelected(index)}
              >
                Show Suggested Answer
              </Button>

              {selected === index && (
                <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function JobTracker() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Interested");

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Job Search Tracker"
        description="Track job leads, applications, interviews, and follow-ups so opportunities do not get lost."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Add Job Lead
          </h2>

          <div className="mt-5 space-y-4">
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job title"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
            </select>
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Current Entry
          </h2>

          <div className="mt-5 rounded-xl border bg-card p-4 text-sm">
            <p><strong>Job:</strong> {jobTitle || "Not entered yet"}</p>
            <p className="mt-2"><strong>Company:</strong> {company || "Not entered yet"}</p>
            <p className="mt-2"><strong>Status:</strong> {status}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function CareerPlan() {
  const [targetRole, setTargetRole] = useState("");
  const [skillGoal, setSkillGoal] = useState("");
  const [nextStep, setNextStep] = useState("");

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Career Plan"
        description="Create a simple plan for your next opportunity, the skills you need, and the proof you should build."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Build Your Plan
          </h2>

          <div className="mt-5 space-y-4">
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Target job or opportunity"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />
            <input
              value={skillGoal}
              onChange={(e) => setSkillGoal(e.target.value)}
              placeholder="Skill to improve or verify"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />
            <textarea
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              placeholder="What is your next step?"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={5}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Career Snapshot
          </h2>

          <div className="mt-5 rounded-xl border bg-card p-4 text-sm">
            <p><strong>Target:</strong> {targetRole || "Not entered yet"}</p>
            <p className="mt-2"><strong>Skill Goal:</strong> {skillGoal || "Not entered yet"}</p>
            <p className="mt-2"><strong>Next Step:</strong> {nextStep || "Not entered yet"}</p>
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
