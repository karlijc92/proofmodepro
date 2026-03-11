import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldPlus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  proofModeCategories,
  proofModeSkills,
} from "@/data/proofmodeConfig";
import { skillHasAssessment } from "@/data/proofmodeHelpers";

interface SkillOption {
  id: string;
  title: string;
  description: string;
  hasAssessment: boolean;
}

interface CategoryOption {
  category: string;
  categoryKey: string;
  skills: SkillOption[];
}

export default function CreateTrustTagPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const navigate = useNavigate();

  const categories: CategoryOption[] = useMemo(() => {
    return proofModeCategories.map((category) => {
      const skills = proofModeSkills
        .filter((skill) => skill.category === category.key)
        .map((skill) => ({
          id: skill.code,
          title: skill.name,
          description: skillHasAssessment(skill.code)
            ? "Assessment available now."
            : "Assessment coming soon.",
          hasAssessment: skillHasAssessment(skill.code),
        }));

      return {
        category: category.label,
        categoryKey: category.key,
        skills,
      };
    });
  }, []);

  const availableSelectedCount = selectedSkills.filter((skillCode) =>
    skillHasAssessment(skillCode)
  ).length;

  const handleSkillSelection = (skillId: string, hasAssessment: boolean) => {
    if (!hasAssessment) return;

    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleStartAssessment = () => {
    const availableSkills = selectedSkills.filter((skillCode) =>
      skillHasAssessment(skillCode)
    );

    if (availableSkills.length > 0) {
      const assessmentId = availableSkills.join(",");
      navigate(`/assessment/${assessmentId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <ShieldPlus className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Create Your TrustTag
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Select the skills you want to get verified. You can choose multiple skills for a combined assessment.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Select Skills to Verify</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {categories.map((category) => (
                  <AccordionItem
                    key={category.categoryKey}
                    value={category.categoryKey}
                  >
                    <AccordionTrigger className="text-lg font-semibold">
                      {category.category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 mt-4">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className={`flex items-center space-x-3 p-3 rounded-md ${
                              skill.hasAssessment
                                ? "hover:bg-gray-100"
                                : "opacity-60"
                            }`}
                          >
                            <Checkbox
                              id={skill.id}
                              checked={selectedSkills.includes(skill.id)}
                              onCheckedChange={() =>
                                handleSkillSelection(skill.id, skill.hasAssessment)
                              }
                              disabled={!skill.hasAssessment}
                            />
                            <label
                              htmlFor={skill.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {skill.title}
                              <p className="text-xs text-muted-foreground">
                                {skill.description}
                              </p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={handleStartAssessment}
              disabled={availableSelectedCount === 0}
            >
              Start Combined Assessment ({availableSelectedCount} selected)
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
