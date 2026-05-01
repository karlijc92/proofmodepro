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
            Build and save a simple resume draft connected to your ProofMode
            profile. Later, this tool can automatically pull in verified
            TrustTags and approved skills.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Resume Details
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill this out once and keep improving it as your verified skills
              grow.
            </p>

            <div className="mt-6 space-y-4">
              <ResumeInput
                label="Full Name"
                value={resume.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="Your full name"
              />

              <ResumeInput
                label="Headline"
                value={resume.headline}
                onChange={(value) => updateField("headline", value)}
                placeholder="Example: Verified carpenter | Entry-level IT support | Skilled trades worker"
              />

              <ResumeTextArea
                label="Professional Summary"
                value={resume.summary}
                onChange={(value) => updateField("summary", value)}
                placeholder="Write a short summary about your skills, experience, and work goals."
              />

              <ResumeTextArea
                label="Skills"
                value={resume.skills}
                onChange={(value) => updateField("skills", value)}
                placeholder="List your skills. Later this can pull from verified TrustTags."
              />

              <ResumeTextArea
                label="Experience"
                value={resume.experience}
                onChange={(value) => updateField("experience", value)}
                placeholder="List jobs, projects, volunteer work, freelance work, or hands-on experience."
              />

              <ResumeTextArea
                label="Education / Training"
                value={resume.education}
                onChange={(value) => updateField("education", value)}
                placeholder="List school, certifications, training, workshops, or self-taught learning."
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={saveResume}>Save Resume to Profile</Button>
                <Button variant="outline" onClick={clearResume}>
                  Clear Resume
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Resume Preview
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This preview helps users see what employers, schools, or workforce
              programs may later view.
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <textarea
        className="mt-2 min-h-28 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
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
