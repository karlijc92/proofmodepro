// ONLY showing changed parts to keep this readable
// (Everything else stays exactly as your current file)

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

/* =========================
   LOCAL SAVE HELPERS
========================= */
function saveToProfile(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromProfile(key: string) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

/* =========================
   INTERVIEW PREP (UPGRADED)
========================= */
function InterviewPrep() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState<any>(null);

  function nextQuestion() {
    setQuestionIndex((prev) => (prev + 1) % interviewQuestions.length);
    setAnswer("");
    setReview(null);
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Interview Prep"
        description="Practice multiple interview questions and improve answers using structured feedback."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Question {questionIndex + 1} of {interviewQuestions.length}
          </h2>

          <p className="mt-4 rounded-xl border bg-background p-4 text-sm font-medium">
            {interviewQuestions[questionIndex]}
          </p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer using real experience, what you did, and the result..."
            className="mt-5 w-full rounded-xl border bg-background p-4 text-sm"
            rows={7}
          />

          <div className="mt-4 flex gap-3">
            <Button onClick={() => setReview(buildAnswerFeedback(answer))}>
              Review Answer
            </Button>
            <Button variant="outline" onClick={nextQuestion}>
              Next Question
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Answer Feedback
          </h2>

          {review && <FeedbackBox {...review} />}
        </div>
      </section>
    </>
  );
}

/* =========================
   JOB TRACKER (SAVE ADDED)
========================= */
function JobTracker() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Interested");

  function save() {
    const data = { jobTitle, company, status };
    saveToProfile("job_tracker", data);
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
          <div className="mt-5 space-y-4">
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job title" className="w-full border p-4 rounded-xl" />
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="w-full border p-4 rounded-xl" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-4 rounded-xl">
              <option>Interested</option>
              <option>Applied</option>
              <option>Interview Scheduled</option>
              <option>Follow Up Needed</option>
            </select>

            <Button onClick={save}>Save to Profile</Button>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================
   CAREER PLAN (SAVE ADDED)
========================= */
function CareerPlan() {
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");
  const [next, setNext] = useState("");

  function save() {
    saveToProfile("career_plan", {
      targetRole,
      skills,
      next,
    });
  }

  return (
    <>
      <ToolHeader
        label="Job Tool"
        title="Career Plan"
        description="Plan your next opportunity and track your growth."
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="Target role" className="w-full border p-4 rounded-xl mt-4" />
          <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills to improve" className="w-full border p-4 rounded-xl mt-4" />
          <textarea value={next} onChange={(e) => setNext(e.target.value)} placeholder="Next step" className="w-full border p-4 rounded-xl mt-4" />

          <Button className="mt-4" onClick={save}>
            Save to Profile
          </Button>
        </div>
      </section>
    </>
  );
}
