import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Award, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { processProofModeSubmission } from '@/data/proofmodeProcessor';
import { getAssessmentBySkillCode } from '@/data/proofmodeHelpers';

interface AssessmentAnswer {
  questionId: string;
  answerId: string;
  answerText: string;
}

interface AssessmentQuestionOption {
  id: string;
  text: string;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: AssessmentQuestionOption[];
  correctAnswerId: string;
  correctAnswerText: string;
}

interface AssessmentData {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

interface UploadedEvidenceItem {
  id: string;
  name: string;
  typeLabel: string;
  sizeLabel: string;
}

export default function AssessmentResultsPage() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null);

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

  const { answers, assessment, uploadedEvidence } = location.state as {
    answers: AssessmentAnswer[];
    assessment: AssessmentData;
    uploadedEvidence?: UploadedEvidenceItem[];
  };

  const selectedSkillCodes = useMemo(() => {
    return assessment.id
      .split(',')
      .map((code) => code.trim())
      .filter(Boolean);
  }, [assessment.id]);

  const primarySkillCode = selectedSkillCodes[0] || '';

  const correctAnswersCount = useMemo(() => {
    return assessment.questions.reduce((count, question) => {
      const userAnswer = answers.find((answer) => answer.questionId === question.id);
      return userAnswer?.answerId === question.correctAnswerId ? count + 1 : count;
    }, 0);
  }, [answers, assessment.questions]);

  const score = Math.round((correctAnswersCount / assessment.questions.length) * 100);
  const passed = score >= 80;

  const handleSaveTrustTag = async () => {
    if (!primarySkillCode) {
      toast.error('Could not save TrustTag', {
        description: 'No skill code was found for this assessment.',
      });
      return;
    }

    const fullAssessment = getAssessmentBySkillCode(primarySkillCode);

    if (!fullAssessment) {
      toast.error('Could not save TrustTag', {
        description: 'The assessment data for this skill could not be found.',
      });
      return;
    }

    setIsSaving(true);

    try {
      const answerMap = answers.reduce<Record<string, string>>((acc, answer) => {
        acc[answer.questionId] = answer.answerId;
        return acc;
      }, {});

      const evidenceItemsForSubmission = (uploadedEvidence || []).map((item) => ({
        id: item.id,
        name: item.name,
        type: item.typeLabel,
        sizeLabel: item.sizeLabel,
      }));

      const result = processProofModeSubmission({
        profileId: 'internal-demo-profile',
        skillCode: primarySkillCode,
        answers: answerMap,
        evidenceItems: evidenceItemsForSubmission,
        existingRecordCount: 0,
        submittedAt: new Date().toISOString(),
      });

      if (!result.scoreResult || !result.eligibilityResult) {
        toast.error('Could not save TrustTag', {
          description: 'The submission could not be processed.',
        });
        return;
      }

      if (!result.record) {
        toast.warning('Assessment processed', {
          description: 'You passed scoring, but no TrustTag record was created yet.',
        });
        return;
      }

      setSavedRecordId(result.record.id);

      toast.success('TrustTag created', {
        description: 'Your assessment and uploaded evidence were saved.',
      });
    } catch (error) {
      toast.error('Could not save TrustTag', {
        description: 'Something went wrong while creating your TrustTag.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleViewMyTrustTags = () => {
    navigate('/profile-preview');
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
                  <p className="mt-4 text-green-600 font-semibold">
                    Congratulations! You have passed this assessment.
                  </p>

                  {savedRecordId ? (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-600">TrustTag saved successfully.</p>
                      <p className="text-sm text-gray-500">Record ID: {savedRecordId}</p>

                      <div className="flex flex-col items-center gap-2">
                        <Button disabled>
                          TrustTag Saved
                        </Button>

                        <Button variant="outline" onClick={handleViewMyTrustTags}>
                          View My TrustTags
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={handleSaveTrustTag} className="mt-4" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving TrustTag...
                        </>
                      ) : (
                        'Save TrustTag'
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <p className="mt-4 text-red-600 font-semibold">
                  You did not pass. A score of 80% or higher is required.
                </p>
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
              {assessment.questions.map((question) => {
                const userAnswer = answers.find((answer) => answer.questionId === question.id);
                const isCorrect = userAnswer?.answerId === question.correctAnswerId;

                return (
                  <Card key={question.id} className={isCorrect ? 'border-green-200' : 'border-red-200'}>
                    <CardHeader>
                      <CardTitle className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                        )}
                        <span className="flex-1">{question.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Your answer:{' '}
                        <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                          {userAnswer?.answerText || 'No answer selected'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p>
                          Correct answer:{' '}
                          <span className="text-green-700">{question.correctAnswerText}</span>
                        </p>
                      )}
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
