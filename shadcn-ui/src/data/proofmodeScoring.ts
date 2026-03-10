import { trustTagRules } from "@/data/proofmodeConfig";
import { getAssessmentBySkillCode } from "@/data/proofmodeHelpers";

export interface ProofModeAnswerMap {
  [questionId: string]: string | string[];
}

export interface ProofModeScoreResult {
  skillCode: string;
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  scorePercent: number;
  passed: boolean;
}

function normalizeArray(value: string | string[]) {
  return Array.isArray(value) ? value.map(String) : [String(value)];
}

function answersMatch(
  userAnswer: string | string[] | undefined,
  correctAnswer: string | string[] | undefined
) {
  if (userAnswer === undefined || correctAnswer === undefined) return false;

  const user = normalizeArray(userAnswer).map((item) => item.toLowerCase().trim()).sort();
  const correct = normalizeArray(correctAnswer).map((item) => item.toLowerCase().trim()).sort();

  return JSON.stringify(user) === JSON.stringify(correct);
}

export function scoreAssessment(
  skillCode: string,
  answers: ProofModeAnswerMap
): ProofModeScoreResult | null {
  const assessment = getAssessmentBySkillCode(skillCode);

  if (!assessment) return null;

  let correctAnswers = 0;
  let earnedPoints = 0;
  const totalQuestions = assessment.questions.length;
  const totalPoints = assessment.questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

  for (const question of assessment.questions) {
    const userAnswer = answers[question.id];

    if (question.type === "short_answer") {
      const submitted = String(userAnswer || "").toLowerCase();
      const keywords = question.expectedKeywords || [];
      const matchedKeyword = keywords.some((keyword) =>
        submitted.includes(keyword.toLowerCase())
      );

      if (matchedKeyword) {
        correctAnswers += 1;
        earnedPoints += question.points;
      }

      continue;
    }

    if (answersMatch(userAnswer, question.correctAnswer)) {
      correctAnswers += 1;
      earnedPoints += question.points;
    }
  }

  const scorePercent =
    totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100);

  return {
    skillCode,
    totalQuestions,
    correctAnswers,
    totalPoints,
    earnedPoints,
    scorePercent,
    passed: scorePercent >= trustTagRules.passingScorePercent,
  };
}
