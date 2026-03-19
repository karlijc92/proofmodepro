import { proofModeAssessments } from './proofmodeAssessments';

export interface ProofModeAssessmentOptionForPage {
  id: string;
  text: string;
}

export interface ProofModeAssessmentQuestionForPage {
  id: string;
  question: string;
  options: ProofModeAssessmentOptionForPage[];
  correctAnswerId: string;
  correctAnswerText: string;
}

const getCorrectAnswerId = (
  correctAnswer: string | string[] | undefined
): string | null => {
  if (!correctAnswer) return null;

  if (Array.isArray(correctAnswer)) {
    return correctAnswer.length > 0 ? String(correctAnswer[0]) : null;
  }

  return String(correctAnswer);
};

const getCorrectAnswerText = (
  correctAnswerId: string | null,
  options: { id: string; text: string }[] | undefined
): string | null => {
  if (!correctAnswerId || !options) return null;

  const match = options.find((option) => option.id === correctAnswerId);
  return match?.text ?? null;
};

export const getQuestionsForSkillCodes = (
  skillCodes: string[]
): ProofModeAssessmentQuestionForPage[] => {
  const normalizedCodes = skillCodes.map((code) => code.trim().toUpperCase());

  const matchingAssessments = proofModeAssessments.filter((assessment) =>
    normalizedCodes.includes(assessment.skillCode.toUpperCase())
  );

  const flattenedQuestions: ProofModeAssessmentQuestionForPage[] =
    matchingAssessments.flatMap((assessment) =>
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
          const correctAnswerId = getCorrectAnswerId(question.correctAnswer);
          const correctAnswerText = getCorrectAnswerText(
            correctAnswerId,
            question.options
          );

          return {
            id: question.id,
            question: question.question,
            options: question.options?.map((option) => ({
              id: option.id,
              text: option.text,
            })) ?? [],
            correctAnswerId: correctAnswerId ?? '',
            correctAnswerText: correctAnswerText ?? '',
          };
        })
        .filter(
          (question) =>
            question.id.trim().length > 0 &&
            question.question.trim().length > 0 &&
            question.options.length > 0 &&
            question.correctAnswerId.trim().length > 0 &&
            question.correctAnswerText.trim().length > 0
        )
    );

  return flattenedQuestions;
};
