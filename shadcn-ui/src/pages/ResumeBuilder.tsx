import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type ResumeData = {
  fullName: string;
  headline: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
};

const emptyResume: ResumeData = {
  fullName: "",
  headline: "",
  summary: "",
  skills: "",
  experience: "",
  education: "",
};

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeData>(emptyResume);

  useEffect(() => {
    const savedResume = localStorage.getItem("proofmode_resume_builder");

    if (savedResume) {
      try {
        setResume(JSON.parse(savedResume));
      } catch {
        setResume(emptyResume);
      }
    }
  }, []);

  const updateField = (field: keyof ResumeData, value: string) => {
    setResume((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveResume = () => {
    localStorage.setItem("proofmode_resume_builder", JSON.stringify(resume));
    alert("Resume saved to your profile.");
  };

  const clearResume = () => {
    localStorage.removeItem("proofmode_resume_builder");
    setResume(emptyResume);
    alert("Resume cleared.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-primary">Profile Tool</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Resume Builder
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Build a stronger resume draft using your experience, skills, and
            future ProofMode TrustTags. This tool helps users turn real work
            history into employer-ready language.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground">
              Resume Details
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill this out step by step. Use the examples if you are not sure
              what to write.
            </p>

            <div className="mt-6 space-y-5">
              <ResumeInput
                label="Full Name"
                value={resume.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="Your full name"
                help="Use the name you want employers, clients, schools, or programs to see."
              />

              <ResumeInput
                label="Resume Headline"
                value={resume.headline}
                onChange={(value) => updateField("headline", value)}
                placeholder="Example: Verified carpentry worker | Entry-level IT support | Customer service professional"
                help="This is a short one-line title that tells people what kind of work you do or want."
              />

              <ResumeTextArea
                label="Professional Summary"
                value={resume.summary}
                onChange={(value) => updateField("summary", value)}
                placeholder="Example: Reliable hands-on worker with experience in home repair, customer service, and problem solving. Strong record of completing tasks, learning quickly, and working well with others."
                help="Write 2–4 sentences about your strengths, work style, experience, and goals."
              />

              <ResumeTextArea
                label="Skills"
                value={resume.skills}
                onChange={(value) => updateField("skills", value)}
                placeholder="Example: Carpentry, drywall repair, customer service, scheduling, basic bookkeeping, troubleshooting, Microsoft Office"
                help="List practical skills, software skills, trade skills, communication skills, or verified ProofMode skills."
              />

              <ResumeTextArea
                label="Experience"
                value={resume.experience}
                onChange={(value) => updateField("experience", value)}
                placeholder={"Example:\nFreelance Repair Work — 2022–Present\n- Completed small home repair projects for clients\n- Communicated timelines, pricing, and project needs\n- Maintained quality and safety standards"}
                help="Include jobs, freelance work, volunteer work, family business work, projects, internships, or hands-on experience."
              />

              <ResumeTextArea
                label="Education / Training"
                value={resume.education}
                onChange={(value) => updateField("education", value)}
                placeholder="Example: High school diploma, trade school, online courses, certifications, workshops, self-taught training"
                help="Add school, training, certificates, online learning, or informal skill-building."
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={saveResume}>Save Resume to Profile</Button>
                <Button variant="outline" onClick={clearResume}>
                  Clear Resume
                </Button>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Writing Help
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Strong resumes use clear, simple proof of what you can do.
            </p>

            <div className="mt-5 space-y-4 text-sm">
              <TipCard
                title="Use action words"
                text="Try words like managed, repaired, assisted, organized, trained, built, cleaned, solved, tracked, supported, or completed."
              />

              <TipCard
                title="Include proof"
                text="Mention numbers when possible: customers helped, projects completed, years of experience, tools used, or results improved."
              />

              <TipCard
                title="Informal work counts"
                text="Freelance work, family business work, caregiving, repairs, tutoring, community work, and unpaid projects can still show real skills."
              />

              <TipCard
                title="ProofMode advantage"
                text="Later, verified TrustTags can be added automatically so your resume shows proof instead of only claims."
              />
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Resume Preview
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This is the saved profile version users can keep improving over
            time.
          </p>

          <div className="mt-6 rounded-2xl border bg-card p-5">
            <h3 className="text-2xl font-bold text-foreground">
              {resume.fullName || "Your Name"}
            </h3>

            <p className="mt-2 text-sm font-medium text-primary">
              {resume.headline || "Your resume headline will appear here"}
            </p>

            <PreviewSection
              title="Professional Summary"
              text={resume.summary}
              emptyText="Your summary will appear here."
            />

            <PreviewSection
              title="Skills"
              text={resume.skills}
              emptyText="Your skills will appear here."
            />

            <PreviewSection
              title="Experience"
              text={resume.experience}
              emptyText="Your experience will appear here."
            />

            <PreviewSection
              title="Education / Training"
              text={resume.education}
              emptyText="Your education or training will appear here."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ResumeInput({
  label,
  value,
  onChange,
  placeholder,
  help,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  help: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <p className="mt-1 text-xs text-muted-foreground">{help}</p>
      <input
        className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function ResumeTextArea({
  label,
  value,
  onChange,
  placeholder,
  help,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  help: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <p className="mt-1 text-xs text-muted-foreground">{help}</p>
      <textarea
        className="mt-2 min-h-32 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function TipCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </div>
  );
}

function PreviewSection({
  title,
  text,
  emptyText,
}: {
  title: string;
  text: string;
  emptyText: string;
}) {
  return (
    <div className="mt-5 border-t pt-4">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
        {text || emptyText}
      </p>
    </div>
  );
}
