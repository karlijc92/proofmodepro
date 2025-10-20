import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Skill {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Category {
  category: string;
  skills: Skill[];
}

interface CombinedAssessment {
  id: string;
  title: string;
  questions: Question[];
}

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function AssessmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<CombinedAssessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndCreateAssessment = async () => {
      if (!id) {
        setError('No assessment ID provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/data/assessment-categories.json');
        if (!response.ok) {
          throw new Error('Failed to load assessment data.');
        }
        const categories: Category[] = await response.json();
        const selectedSkillIds = id.split(',');
        
        const allQuestions: Question[] = [];
        const selectedSkills: Skill[] = [];

        categories.forEach(category => {
          category.skills.forEach(skill => {
            if (selectedSkillIds.includes(skill.id)) {
              selectedSkills.push(skill);
              allQuestions.push(...skill.questions);
            }
          });
        });

        if (selectedSkills.length === 0) {
          throw new Error('Selected skills not found.');
        }

        // Shuffle and sample questions to be between 8 and 20
        const shuffledQuestions = shuffleArray(allQuestions);
        const totalQuestions = Math.min(20, Math.max(8, shuffledQuestions.length));
        const sampledQuestions = shuffledQuestions.slice(0, totalQuestions);

        const combinedAssessment: CombinedAssessment = {
          id,
          title: selectedSkills.length > 1 ? 'Combined Skills Assessment' : selectedSkills[0].title,
          questions: sampledQuestions,
        };

        setAssessment(combinedAssessment);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndCreateAssessment();
  }, [id]);

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestionIndex < (assessment?.questions.length ?? 0) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Pass the original assessment object which includes all questions for scoring
        const originalAssessmentData = {
            id: assessment?.id,
            title: assessment?.title,
            questions: assessment?.questions
        }
        navigate(`/assessment/${id}/results`, { state: { answers: newAnswers, assessment: originalAssessmentData } });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="mt-4 text-lg text-gray-600">Loading Assessment...</p>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg text-red-600">{error || 'Could not load the assessment.'}</p>
        <Button onClick={() => navigate('/create-trust-tag')} className="mt-4">Back to Skill Selection</Button>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{assessment.title}</CardTitle>
            <CardDescription>Question {currentQuestionIndex + 1} of {assessment.questions.length}</CardDescription>
            <Progress value={progress} className="w-full mt-2" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg mb-4">{currentQuestion.question}</p>
            <RadioGroup value={selectedAnswer ?? ''} onValueChange={setSelectedAnswer}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-100">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNextQuestion} disabled={!selectedAnswer} className="w-full">
              {currentQuestionIndex < assessment.questions.length - 1 ? 'Next Question' : 'Finish Assessment'}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}