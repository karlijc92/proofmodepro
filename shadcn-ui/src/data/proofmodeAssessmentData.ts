import { proofModeAssessments } from './proofmodeAssessments';

export interface ProofModeAssessmentQuestionForPage {
  question: string;
  options: string[];
  correctAnswer: string;
}

const getCorrectAnswerText = (
  correctAnswer: string | string[] | undefined,
  options: { id: string; text: string }[] | undefined
): string | null => {
  if (!correctAnswer || !options) return null;

  if (Array.isArray(correctAnswer)) {
    const firstMatch = options.find((option) => option.id === correctAnswer[0]);
    return firstMatch?.text ?? null;
  }

  const match = options.find((option) => option.id === correctAnswer);
  return match?.text ?? null;
};

export const getQuestionsForSkillCodes = (
  skillCodes: string[]
): ProofModeAssessmentQuestionForPage[] => {
  const normalizedCodes = skillCodes.map((code) => code.trim().toUpperCase());

  const matchingAssessments = proofModeAssessments.filter((assessment) =>
    normalizedCodes.includes(assessment.skillCode.toUpperCase())
  );

  const flattenedQuestions: ProofModeAssessmentQuestionForPage[] = matchingAssessments.flatMap(
    (assessment) =>
      assessment.questions
        .filter(
          (question) =>
            (question.type === 'multiple_choice' ||
              question.type === 'true_false' ||
              question.type === 'scenario') &&
            question.options &&
            question.options.length > 0
        )
        .map((question) => {
          const correctAnswerText = getCorrectAnswerText(
            question.correctAnswer,
            question.options
          );

          return {
            question: question.question,
            options: question.options?.map((option) => option.text) ?? [],
            correctAnswer: correctAnswerText ?? '',
          };
        })
        .filter(
          (question) =>
            question.question.trim().length > 0 &&
            question.options.length > 0 &&
            question.correctAnswer.trim().length > 0
        )
  );

  return flattenedQuestions;
};
