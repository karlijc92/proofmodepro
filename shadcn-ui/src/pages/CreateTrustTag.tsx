import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, ShieldPlus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Skill {
  id: string;
  title: string;
  description: string;
}

interface Category {
  category: string;
  skills: Skill[];
}

export default function CreateTrustTagPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/data/assessment-categories.json');
        if (!response.ok) {
          throw new Error('Failed to load assessment categories.');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSkillSelection = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleStartAssessment = () => {
    if (selectedSkills.length > 0) {
      const assessmentId = selectedSkills.join(',');
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

          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="ml-4 text-lg text-gray-600">Loading Skill Categories...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Select Skills to Verify</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {categories.map((category) => (
                      <AccordionItem key={category.category} value={category.category}>
                        <AccordionTrigger className="text-lg font-semibold">{category.category}</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-4 mt-4">
                            {category.skills.map((skill) => (
                              <div
                                key={skill.id}
                                className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100"
                              >
                                <Checkbox
                                  id={skill.id}
                                  checked={selectedSkills.includes(skill.id)}
                                  onCheckedChange={() => handleSkillSelection(skill.id)}
                                />
                                <label
                                  htmlFor={skill.id}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {skill.title}
                                  <p className="text-xs text-muted-foreground">{skill.description}</p>
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
                  disabled={selectedSkills.length === 0}
                >
                  Start Combined Assessment ({selectedSkills.length} selected)
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}