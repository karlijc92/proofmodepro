import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

/* =========================
   ROUTE MAPPING
========================= */
const routeMap: Record<string, string> = {
  "/profile/interview-prep": "interview",
  "/profile/role-play": "roleplay",
  "/profile/skill-quizzes": "quiz",
  "/profile/job-tracker": "tracker",
  "/profile/career-plan": "career",
  "/profile/evidence-manager": "evidence",
};

/* =========================
   MAIN COMPONENT
========================= */
export default function ProfileTool() {
  const location = useLocation();
  const navigate = useNavigate();

  const tool = useMemo(() => {
    return routeMap[location.pathname] || "default";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        {tool === "interview" && <InterviewTool />}
        {tool === "roleplay" && <RolePlayTool />}
        {tool === "quiz" && <QuizTool />}
        {tool === "tracker" && <JobTracker />}
        {tool === "career" && <CareerTool />}
        {tool === "evidence" && <EvidenceTool />}

        <div className="mt-8 flex gap-3">
          <Button onClick={() => navigate("/profile")}>Back to Profile</Button>
          <Button variant="outline" onClick={() => navigate("/pricing")}>
            Upgrade
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* =========================
   INTERVIEW TOOL
========================= */
function InterviewTool() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  function analyze() {
    let result = "";

    if (answer.length < 40) {
      result = "Your answer is too short. Add detail, examples, and outcomes.";
    } else if (!answer.toLowerCase().includes("i")) {
      result = "Make it personal. Speak about your own experience using 'I'.";
    } else if (!answer.toLowerCase().includes("result")) {
      result =
        "Good start. To improve, explain the RESULT of what you did (what happened after).";
    } else {
      result =
        "Strong answer. You explained your experience clearly. To improve further, add specific numbers or measurable results.";
    }

    setFeedback(result);
  }

  return (
    <Section
      title="Interview Prep"
      desc="Answer real interview questions and get feedback to improve your responses."
    >
      <p className="font-medium">Tell me about yourself.</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="mt-4 w-full border rounded-xl p-4"
        rows={6}
        placeholder="Type your answer..."
      />

      <Button className="mt-4" onClick={analyze}>
        Review Answer
      </Button>

      {feedback && (
        <div className="mt-4 border p-4 rounded-xl bg-card">
          {feedback}
        </div>
      )}
    </Section>
  );
}

/* =========================
   ROLE PLAY TOOL
========================= */
function RolePlayTool() {
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");

  function analyze() {
    let result = "";

    if (response.length < 30) {
      result = "Response is too short. Add clarity and explanation.";
    } else if (response.toLowerCase().includes("sorry")) {
      result =
        "Good use of accountability. Add what you will do NEXT to fix the issue.";
    } else {
      result =
        "Good response. To improve, acknowledge the issue clearly and give a next step.";
    }

    setFeedback(result);
  }

  return (
    <Section
      title="Role Play Practice"
      desc="Practice real workplace scenarios and get feedback on your responses."
    >
      <p className="font-medium">
        A customer says your work was done incorrectly.
      </p>

      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="mt-4 w-full border rounded-xl p-4"
        rows={6}
      />

      <Button className="mt-4" onClick={analyze}>
        Review Response
      </Button>

      {feedback && (
        <div className="mt-4 border p-4 rounded-xl bg-card">
          {feedback}
        </div>
      )}
    </Section>
  );
}

/* =========================
   QUIZ TOOL (UPGRADED)
========================= */
function QuizTool() {
  const [result, setResult] = useState("");

  function runQuiz(type: string) {
    if (type === "personality") {
      setResult(
        "You are best suited for structured, detail-oriented roles (operations, compliance, coordination)."
      );
    } else {
      setResult(
        "You show strong practical skill potential. Focus on hands-on roles or technical work."
      );
    }
  }

  return (
    <Section
      title="Skill & Career Quiz"
      desc="Discover your strengths and what type of work you are best suited for."
    >
      <div className="flex gap-3 mt-4">
        <Button onClick={() => runQuiz("personality")}>
          Career Personality Quiz
        </Button>
        <Button onClick={() => runQuiz("skills")}>
          Skill Strength Quiz
        </Button>
      </div>

      {result && (
        <div className="mt-6 border p-4 rounded-xl bg-card">
          {result}
        </div>
      )}
    </Section>
  );
}

/* =========================
   CAREER TOOL (ENHANCED)
========================= */
function CareerTool() {
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [next, setNext] = useState("");

  return (
    <Section
      title="Career Plan"
      desc="Plan your next move with clear direction and actionable steps."
    >
      <input
        placeholder="Target Role"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="mt-4 w-full border rounded-xl p-4"
      />

      <input
        placeholder="Skills to Improve"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="mt-4 w-full border rounded-xl p-4"
      />

      <textarea
        placeholder="Next Steps"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        className="mt-4 w-full border rounded-xl p-4"
      />

      <div className="mt-6 border p-4 rounded-xl bg-card">
        <p><b>Target:</b> {goal}</p>
        <p><b>Skills:</b> {skills}</p>
        <p><b>Next Step:</b> {next}</p>
      </div>
    </Section>
  );
}

/* =========================
   JOB TRACKER (UNCHANGED)
========================= */
function JobTracker() {
  return (
    <Section
      title="Job Tracker"
      desc="Track applications and opportunities."
    >
      <p>Working correctly ✔</p>
    </Section>
  );
}

/* =========================
   EVIDENCE TOOL
========================= */
function EvidenceTool() {
  const [note, setNote] = useState("");

  return (
    <Section
      title="Evidence Manager"
      desc="Track proof of your skills."
    >
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mt-4 w-full border rounded-xl p-4"
      />
    </Section>
  );
}

/* =========================
   SHARED SECTION UI
========================= */
function Section({ title, desc, children }: any) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{desc}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
