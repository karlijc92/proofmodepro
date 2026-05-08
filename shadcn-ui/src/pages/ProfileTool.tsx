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

const PROFILE_JOB_TRACKER_KEY = "proofmode_profile_job_tracker";
const PROFILE_CAREER_PLAN_KEY = "proofmode_profile_career_plan";

function saveToProfile(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getSavedCount(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

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

const interviewFrameworks = [
  {
    title: "STAR Method",
    text: "Situation, Task, Action, Result. Use this when answering experience-based questions.",
  },
  {
    title: "Proof-Based Answer",
    text: "Skill, example, evidence, outcome. This works well for ProofMode users with informal or hands-on experience.",
  },
  {
    title: "Short Confidence Answer",
    text: "Direct answer, one example, clear result. Best for simple questions like strengths or why they should hire you.",
  },
];

const interviewMistakes = [
  "Giving only a one-sentence answer",
  "Talking generally without a real example",
  "Forgetting to explain what you personally did",
  "Not including the result or outcome",
  "Sounding apologetic about informal experience instead of proof-based",
];

const actionWords = [
  "organized",
  "improved",
  "completed",
  "supported",
  "managed",
  "repaired",
  "built",
  "tracked",
  "communicated",
  "resolved",
  "trained",
  "assisted",
  "documented",
  "coordinated",
  "verified",
];

const rolePlayScenarios = [
  "A customer says your work was done incorrectly.",
  "A supervisor asks why a task was not finished on time.",
  "A coworker is not doing their part and it is affecting your work.",
  "A client asks why they should trust your experience.",
  "An employer asks you to explain a gap or informal work history.",
];

type QuizAnswer = "hands-on" | "people" | "detail" | "creative" | "leadership";

const quizQuestions: {
  question: string;
  options: { label: string; value: QuizAnswer }[];
}[] = [
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
  {
    question: "What do people usually rely on you for?",
    options: [
      { label: "Getting practical tasks done", value: "hands-on" },
      { label: "Being patient, supportive, or easy to talk to", value: "people" },
      { label: "Noticing mistakes and keeping things organized", value: "detail" },
      { label: "Coming up with ideas or making something more appealing", value: "creative" },
      { label: "Taking charge and moving things forward", value: "leadership" },
    ],
  },
  {
    question: "Which proof would be easiest for you to show?",
    options: [
      { label: "Photos/videos of completed work", value: "hands-on" },
      { label: "References, customer feedback, or service examples", value: "people" },
      { label: "Spreadsheets, records, reports, checklists, or organized work", value: "detail" },
      { label: "Portfolio samples, designs, writing, or content", value: "creative" },
      { label: "Plans, projects managed, team results, or outcomes", value: "leadership" },
    ],
  },
  {
    question: "What type of job would you most likely stay motivated in?",
    options: [
      { label: "Trades, maintenance, automotive, repair, construction", value: "hands-on" },
      { label: "Caregiving, tutoring, customer service, coaching, support", value: "people" },
      { label: "Admin, operations, bookkeeping, compliance, project coordination", value: "detail" },
      { label: "Marketing, design, writing, social media, freelance creative work", value: "creative" },
      { label: "Management, entrepreneurship, team lead, program coordination", value: "leadership" },
    ],
  },
];

function isGibberish(text: string) {
  const cleaned = text.trim().toLowerCase();
  if (cleaned.length < 12) return true;

  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length < 3) return true;

  const letters = cleaned.match(/[a-z]/g)?.length ?? 0;
  const vowels = cleaned.match(/[aeiou]/g)?.length ?? 0;
  const numbers = cleaned.match(/[0-9]/g)?.length ?? 0;
  const strangeCharacters = cleaned.match(/[^a-z0-9\s.,!?'"()-]/g)?.length ?? 0;

  if (letters === 0) return true;
  if (numbers > letters) return true;
  if (strangeCharacters > 3) return true;
  if (letters > 15 && vowels / letters < 0.2) return true;

  const longNonsenseWords = words.filter(
    (word) => word.length > 14 && !/[aeiou]{2}/.test(word)
  );

  if (longNonsenseWords.length >= 1) return true;

  const readableWords = words.filter((word) =>
    [
      "i",
      "me",
      "my",
      "we",
      "work",
      "worked",
      "job",
      "team",
      "customer",
      "client",
      "help",
      "helped",
      "learn",
      "learned",
      "solve",
      "solved",
      "fix",
      "fixed",
      "build",
      "built",
      "manage",
      "managed",
      "organize",
      "organized",
      "because",
      "result",
      "time",
      "example",
      "experience",
      "skill",
      "strong",
      "hire",
      "trust",
    ].includes(word)
  );

  return words.length >= 5 && readableWords.length === 0 && cleaned.length < 80;
}

function buildAnswerFeedback(answer: string) {
  const trimmed = answer.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);

  if (!trimmed) {
    return {
      rating: "No answer entered",
      feedback:
        "Type an answer first so the tool can review it. A strong interview answer should include a real example, what you did, and what happened after.",
      improved:
        "Start with: “One example is when I…” Then explain the situation, your action, and the result.",
    };
  }

  if (isGibberish(trimmed)) {
    return {
      rating: "Needs work",
      feedback:
        "This does not read like a real interview answer yet. It looks random or unclear, so an employer would not understand your experience from this response.",
      improved:
        "Write 3–5 clear sentences. Example: “One example is when I helped fix a problem at work. I noticed what was wrong, communicated with the team, and completed my part. As a result, the work was finished on time.”",
    };
  }

  const hasExample =
    lower.includes("for example") ||
    lower.includes("one example") ||
    lower.includes("one time") ||
    lower.includes("in my") ||
    lower.includes("at my") ||
    lower.includes("when i") ||
    lower.includes("i worked") ||
    lower.includes("i helped") ||
    lower.includes("i had to") ||
    lower.includes("there was a time");

  const hasPersonalAction =
    lower.includes(" i ") ||
    lower.startsWith("i ") ||
    lower.includes(" my ") ||
    lower.includes(" me ");

  const hasAction = actionWords.some((word) => lower.includes(word));

  const hasResult =
    lower.includes("as a result") ||
    lower.includes("the result") ||
    lower.includes("because of that") ||
    lower.includes("this helped") ||
    lower.includes("it helped") ||
    lower.includes("improved") ||
    lower.includes("completed") ||
    lower.includes("finished") ||
    lower.includes("saved") ||
    lower.includes("increased") ||
    lower.includes("reduced") ||
    lower.includes("on time") ||
    lower.includes("better") ||
    lower.includes("successful") ||
    lower.includes("satisfied");

  const hasConfidence =
    lower.includes("strong") ||
    lower.includes("reliable") ||
    lower.includes("dependable") ||
    lower.includes("learn quickly") ||
    lower.includes("hard worker") ||
    lower.includes("good at") ||
    lower.includes("experience") ||
    lower.includes("skilled");

  if (words.length < 20) {
    return {
      rating: "Too short",
      feedback:
        "This is readable, but it is too short to be convincing in an interview. It needs more proof behind it.",
      improved:
        "Add one real example, what you personally did, and what changed after. Aim for at least 3 full sentences.",
    };
  }

  if (!hasPersonalAction) {
    return {
      rating: "Needs your personal role",
      feedback:
        "This answer may describe a situation, but it does not clearly show what you personally did. Employers need to hear your role, not just the general situation.",
      improved:
        "Add: “My role was…” or “I personally handled…” so the answer clearly proves your contribution.",
    };
  }

  if (!hasExample) {
    return {
      rating: "Good start",
      feedback:
        "Your answer is understandable, but it needs a specific example. Right now it sounds too general, so it may not fully prove your experience.",
      improved:
        "Add a real moment: “For example, when I was working on ___, I had to ___, so I ___.”",
    };
  }

  if (!hasAction) {
    return {
      rating: "Needs stronger action",
      feedback:
        "You gave some context, but your answer needs stronger action language. Make it clear what you did and how you handled the situation.",
      improved:
        "Use words like organized, repaired, managed, assisted, solved, built, tracked, trained, completed, improved, or communicated.",
    };
  }

  if (!hasResult) {
    return {
      rating: "Almost strong",
      feedback:
        "This has a real example and action, but it needs a result. The result is what makes the answer feel complete and believable.",
      improved:
        "End with the outcome: “As a result, the project was completed on time,” “the customer was satisfied,” or “the process improved.”",
    };
  }

  if (!hasConfidence) {
    return {
      rating: "Strong answer",
      feedback:
        "This is a strong interview answer because it includes an example, your action, and a result. It would be even better if you connected it directly to why you are a reliable person to hire.",
      improved:
        "Add one final confidence sentence: “That experience shows I am dependable, quick to learn, and able to solve problems under pressure.”",
    };
  }

  return {
    rating: "Excellent answer",
    feedback:
      "This is a strong answer. It gives a real example, explains your action, includes a result, and connects your experience to why an employer should trust you.",
    improved:
      "To make it even stronger, add numbers if possible, such as how many customers helped, how many tasks completed, how much time saved, or how the quality improved.",
  };
}

function buildRolePlayFeedback(response: string) {
  const lower = response.toLowerCase();

  if (isGibberish(response)) {
    return {
      rating: "Needs work",
      feedback:
        "This does not read like a real workplace response. A strong response should acknowledge the issue, stay calm, and give a next step.",
      improved:
        "Example: “I understand your concern. Let me look at what happened, fix what needs to be corrected, and follow up with you by the end of the day.”",
    };
  }

  const acknowledges =
    lower.includes("understand") ||
    lower.includes("i hear") ||
    lower.includes("concern") ||
    lower.includes("sorry") ||
    lower.includes("apologize");

  const nextStep =
    lower.includes("next") ||
    lower.includes("fix") ||
    lower.includes("follow up") ||
    lower.includes("check") ||
    lower.includes("review") ||
    lower.includes("resolve");

  const professional =
    !lower.includes("not my fault") &&
    !lower.includes("whatever") &&
    !lower.includes("you are wrong") &&
    !lower.includes("shut") &&
    !lower.includes("stupid");

  if (!professional) {
    return {
      rating: "Unprofessional tone",
      feedback:
        "The response may sound defensive or disrespectful. In a workplace situation, stay calm and focus on solving the problem.",
      improved:
        "Try: “I understand there is a concern. I’ll review what happened and help find the best next step.”",
    };
  }

  if (!acknowledges && !nextStep) {
    return {
      rating: "Needs structure",
      feedback:
        "Your response needs two things: acknowledge the issue and explain what you will do next.",
      improved:
        "Try: “I understand the concern. I’ll review the issue, correct what I can, and follow up with an update.”",
    };
  }

  if (!acknowledges) {
    return {
      rating: "Good action, missing empathy",
      feedback:
        "You included action, but you should first acknowledge the person’s concern so they feel heard.",
      improved:
        "Start with: “I understand why that would be frustrating.” Then explain your next step.",
    };
  }

  if (!nextStep) {
    return {
      rating: "Good tone, missing next step",
      feedback:
        "Your tone is respectful, but you need to say what you will do next. That makes the response feel reliable.",
      improved:
        "End with: “I’ll check what happened and follow up with a solution.”",
    };
  }

  return {
    rating: "Strong workplace response",
    feedback:
      "This response works because it is calm, respectful, and action-focused. That is exactly what employers want in difficult situations.",
    improved:
      "To make it stronger, add a timeline: “I’ll follow up by tomorrow” or “I’ll update you after I review it.”",
  };
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

function FeedbackBox({
  rating,
  feedback,
  improved,
}: {
  rating: string;
  feedback: string;
  improved: string;
}) {
  return (
    <div className="mt-5 rounded-xl border bg-card p-4 text-sm">
      <p className="font-semibold text-foreground">{rating}</p>
      <p className="mt-2 text-muted-foreground">{feedback}</p>
      <p className="mt-4 font-medium text-foreground">How to improve it:</p>
      <p className="mt-1 text-muted-foreground">{improved}</p>
    </div>
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
            Write what the proof shows, which skill it supports, and why it matters.
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
  const [review, setReview] =
    useState<ReturnType<typeof buildAnswerFeedback> | null>(null);

  function nextQuestion() {
    setQuestionIndex((current) => (current + 1) % interviewQuestions.length);
    setAnswer("");
    setReview(null);
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Interview Prep"
        description="Practice interview questions, learn how to structure strong answers, and get feedback that explains what is missing."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Mock Interview Question
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Question {questionIndex + 1} of {interviewQuestions.length}
          </p>

          <p className="mt-4 rounded-xl border bg-background p-4 text-sm font-medium">
            {interviewQuestions[questionIndex]}
          </p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer using a real example, what you did, and the result..."
            className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
            rows={7}
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setReview(buildAnswerFeedback(answer))}>
              Review My Answer
            </Button>
            <Button variant="outline" onClick={nextQuestion}>
              New Question
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Answer Review
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Strong interview answers include a real example, your action, and the result.
          </p>

          {review && <FeedbackBox {...review} />}

          <div className="mt-6 rounded-xl border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">
              Answer Frameworks
            </p>
            <div className="mt-3 space-y-3">
              {interviewFrameworks.map((item) => (
                <div key={item.title} className="text-sm">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">
              Mistakes to Avoid
            </p>
            <div className="mt-3 space-y-2">
              {interviewMistakes.map((mistake) => (
                <p key={mistake} className="text-sm text-muted-foreground">
                  • {mistake}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">
              Useful Action Words
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {actionWords.join(", ")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function RolePlayPractice() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [review, setReview] =
    useState<ReturnType<typeof buildRolePlayFeedback> | null>(null);

  function nextScenario() {
    setScenarioIndex((current) => (current + 1) % rolePlayScenarios.length);
    setResponse("");
    setReview(null);
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Role Play Practice"
        description="Practice real workplace conversations and get feedback on tone, professionalism, clarity, and next steps."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Workplace Scenario
          </h2>
          <p className="mt-4 rounded-xl border bg-background p-4 text-sm font-medium">
            {rolePlayScenarios[scenarioIndex]}
          </p>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type what you would say in this situation..."
            className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
            rows={7}
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setReview(buildRolePlayFeedback(response))}>
              Review Response
            </Button>
            <Button variant="outline" onClick={nextScenario}>
              Try Another Scenario
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Workplace Feedback
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Good role play responses stay calm, acknowledge the issue, and give a clear next step.
          </p>

          {review && <FeedbackBox {...review} />}
        </div>
      </section>
    </>
  );
}

function SkillQuizzes() {
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({});
  const [result, setResult] = useState("");

  function getResult() {
    if (Object.keys(answers).length < quizQuestions.length) {
      setResult("Answer all questions first so your result is more accurate.");
      return;
    }

    const scores: Record<QuizAnswer, number> = {
      "hands-on": 0,
      people: 0,
      detail: 0,
      creative: 0,
      leadership: 0,
    };

    Object.values(answers).forEach((answer) => {
      scores[answer] += 1;
    });

    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as QuizAnswer;

    const results: Record<QuizAnswer, string> = {
      "hands-on":
        "Your strongest fit appears to be hands-on, practical work. You may do well in skilled trades, repair, maintenance, automotive, construction, or other work where finished results can be clearly shown through evidence.",
      people:
        "Your strongest fit appears to be people-centered work. You may do well in customer service, caregiving, tutoring, support roles, coaching, community work, or jobs where communication and patience matter.",
      detail:
        "Your strongest fit appears to be organized, detail-focused work. You may do well in operations, admin, bookkeeping, compliance, project coordination, records, quality control, or tracking-based roles.",
      creative:
        "Your strongest fit appears to be creative or portfolio-based work. You may do well in design, content, writing, marketing, freelance services, social media, or work where examples and samples show your ability.",
      leadership:
        "Your strongest fit appears to be leadership or growth-focused work. You may do well in management, program coordination, entrepreneurship, team lead roles, operations leadership, or client/project management.",
    };

    setResult(results[top]);
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Skill & Career Quizzes"
        description="Take a short career-fit quiz to understand your strengths, possible job paths, and what kind of proof you should build."
      />

      <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">
          Career Fit Quiz
        </h2>

        <div className="mt-5 space-y-5">
          {quizQuestions.map((item, index) => (
            <div key={item.question} className="rounded-xl border bg-background p-4">
              <p className="text-sm font-semibold text-foreground">{item.question}</p>
              <div className="mt-3 space-y-2">
                {item.options.map((option) => (
                  <label
                    key={option.label}
                    className="flex cursor-pointer gap-3 rounded-lg border bg-card p-3 text-sm"
                  >
                    <input
                      type="radio"
                      name={`quiz-${index}`}
                      checked={answers[index] === option.value}
                      onChange={() =>
                        setAnswers((current) => ({
                          ...current,
                          [index]: option.value,
                        }))
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-6" onClick={getResult}>
          See My Result
        </Button>

        {result && (
          <div className="mt-5 rounded-xl border bg-background p-4 text-sm font-medium text-foreground">
            {result}
          </div>
        )}
      </section>
    </>
  );
}

function JobTracker() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Interested");
  const [savedMessage, setSavedMessage] = useState("");

  function saveJobEntry() {
    const entry = {
      id: `job-${Date.now()}`,
      jobTitle,
      company,
      status,
      savedAt: new Date().toISOString(),
    };

    const raw = localStorage.getItem(PROFILE_JOB_TRACKER_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const updated = [...existing, entry];

    saveToProfile(PROFILE_JOB_TRACKER_KEY, updated);
    setSavedMessage(`Saved to profile. Total saved job entries: ${updated.length}.`);
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Job Search Tracker"
        description="Track job leads, applications, interviews, and follow-ups so opportunities do not get lost."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Add Job Lead</h2>

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
              <option>Offer Received</option>
              <option>Not Selected</option>
            </select>

            <Button onClick={saveJobEntry}>Save to Profile</Button>

            {savedMessage && (
              <p className="text-sm font-medium text-primary">{savedMessage}</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Current Entry</h2>
          <div className="mt-5 rounded-xl border bg-card p-4 text-sm">
            <p><strong>Job:</strong> {jobTitle || "Not entered yet"}</p>
            <p className="mt-2"><strong>Company:</strong> {company || "Not entered yet"}</p>
            <p className="mt-2"><strong>Status:</strong> {status}</p>
            <p className="mt-4 text-muted-foreground">
              Saved profile entries on this device: {getSavedCount(PROFILE_JOB_TRACKER_KEY)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function CareerPlan() {
  const [targetRole, setTargetRole] = useState("");
  const [currentStrengths, setCurrentStrengths] = useState("");
  const [skillsToBuild, setSkillsToBuild] = useState("");
  const [trustTagsToEarn, setTrustTagsToEarn] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function saveCareerPlan() {
    const plan = {
      targetRole,
      currentStrengths,
      skillsToBuild,
      trustTagsToEarn,
      nextStep,
      savedAt: new Date().toISOString(),
    };

    saveToProfile(PROFILE_CAREER_PLAN_KEY, plan);
    setSavedMessage("Career plan saved to profile on this device.");
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
          <h2 className="text-xl font-semibold text-foreground">
            Build Your Career Snapshot
          </h2>

          <div className="mt-5 space-y-4">
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Target job, client type, or opportunity"
              className="w-full rounded-xl border bg-background p-4 text-sm"
            />
            <textarea
              value={currentStrengths}
              onChange={(e) => setCurrentStrengths(e.target.value)}
              placeholder="Current strengths or experience you already have"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />
            <textarea
              value={skillsToBuild}
              onChange={(e) => setSkillsToBuild(e.target.value)}
              placeholder="Skills you need to improve or prove"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />
            <textarea
              value={trustTagsToEarn}
              onChange={(e) => setTrustTagsToEarn(e.target.value)}
              placeholder="TrustTags or proof you should build next"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />
            <textarea
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              placeholder="Your next action step"
              className="w-full rounded-xl border bg-background p-4 text-sm"
              rows={3}
            />

            <Button onClick={saveCareerPlan}>Save to Profile</Button>

            {savedMessage && (
              <p className="text-sm font-medium text-primary">{savedMessage}</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Career Snapshot</h2>
          <div className="mt-5 rounded-xl border bg-card p-4 text-sm">
            <p><strong>Target:</strong> {targetRole || "Not entered yet"}</p>
            <p className="mt-3"><strong>Strengths:</strong> {currentStrengths || "Not entered yet"}</p>
            <p className="mt-3"><strong>Skills to Build:</strong> {skillsToBuild || "Not entered yet"}</p>
            <p className="mt-3"><strong>TrustTags / Proof:</strong> {trustTagsToEarn || "Not entered yet"}</p>
            <p className="mt-3"><strong>Next Step:</strong> {nextStep || "Not entered yet"}</p>
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
