import { useLocation, Link, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface AssessmentData {
  id: string;
  title: string;
  questions: Question[];
}

export default function AssessmentResultsPage() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  
  if (!location.state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>No results to display. Please take an assessment first.</p>
        <Button asChild className="mt-4">
          <Link to="/create-trust-tag">Back to Skill Selection</Link>
        </Button>
      </div>
    );
  }

  const { answers, assessment } = location.state as { answers: string[]; assessment: AssessmentData };

  const correctAnswersCount = assessment.questions.reduce((count, question, index) => {
    return question.correctAnswer === answers[index] ? count + 1 : count;
  }, 0);

  const score = Math.round((correctAnswersCount / assessment.questions.length) * 100);
  const passed = score >= 80;

  const handleAddToProfile = () => {
    // Placeholder for Phase 2: Supabase integration
    toast.info('Coming Soon!', {
      description: 'This feature will be available soon to add your verified skill to your profile.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Award className={`mx-auto h-16 w-16 ${passed ? 'text-green-500' : 'text-gray-400'}`} />
              <CardTitle className="text-3xl font-bold mt-4">{assessment.title}</CardTitle>
              <CardDescription className="text-xl text-gray-600">Assessment Complete</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold">{score}%</p>
              <p className="mt-2 text-lg">
                You correctly answered {correctAnswersCount} out of {assessment.questions.length} questions.
              </p>
              {passed ? (
                <>
                  <p className="mt-4 text-green-600 font-semibold">Congratulations! You have passed this assessment.</p>
                  <Button onClick={handleAddToProfile} className="mt-4">
                    Add to Profile & Download TrustTag
                  </Button>
                </>
              ) : (
                <p className="mt-4 text-red-600 font-semibold">You did not pass. A score of 80% or higher is required.</p>
              )}
              <div className="flex gap-4 justify-center mt-6">
                <Button asChild>
                  <Link to="/create-trust-tag">Choose Another Assessment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={`/assessment/${id}`}>Try Again</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Review Your Answers</h2>
            <div className="space-y-6">
              {assessment.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = question.correctAnswer === userAnswer;
                return (
                  <Card key={index} className={isCorrect ? 'border-green-200' : 'border-red-200'}>
                    <CardHeader>
                      <CardTitle className="flex items-start gap-3">
                        {isCorrect ? <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" /> : <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />}
                        <span className="flex-1">{question.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userAnswer}</span></p>
                      {!isCorrect && <p>Correct answer: <span className="text-green-700">{question.correctAnswer}</span></p>}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}