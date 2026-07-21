import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import {
  emptyResumeData,
  getResume,
  saveResumeToUnifiedProfile,
  clearResumeFromUnifiedProfile,
  ProofModeResumeData,
} from "@/data/proofmodeProfileStore";

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ProofModeResumeData>(emptyResumeData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResume()
      .then((data) => setResume(data))
      .catch((error) => console.error("Failed to load resume:", error))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (field: keyof ProofModeResumeData, value: string) => {
    setResume((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveResume = async () => {
    try {
      await saveResumeToUnifiedProfile(resume);
      alert("Resume saved to your profile.");
    } catch (error) {
      console.error("Failed to save resume:", error);
      alert("Something went wrong saving your resume. Please try again.");
    }
  };

  const clearResume = async () => {
    try {
      await clearResumeFromUnifiedProfile();
      setResume(emptyResumeData);
      alert("Resume cleared.");
    } catch (error) {
      console.error("Failed to clear resume:", error);
      alert("Something went wrong clearing your resume. Please try again.");
    }
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

        {loading ? (
          <p className="mt-8 text-sm text-muted-foreground">Loading your resume...</p>
        ) : (
          <>
            <section className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
                <h2 className="text-xl font-semibold text-foreground">
                  Resume Details
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Fill this out step by step. Use the examples if you are not
                  sure what to write.
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
