export type ProofModeQuestionType =
  | "multiple_choice"
  | "true_false"
  | "scenario"
  | "short_answer";

export interface ProofModeQuestionOption {
  id: string;
  text: string;
}

export interface ProofModeQuestion {
  id: string;
  type: ProofModeQuestionType;
  question: string;
  options?: ProofModeQuestionOption[];
  correctAnswer?: string | string[];
  expectedKeywords?: string[];
  points: number;
}

export interface ProofModeAssessment {
  skillCode: string;
  skillName: string;
  categoryKey: string;
  questionCount: number;
  questions: ProofModeQuestion[];
}

export const proofModeAssessments: ProofModeAssessment[] = [
  {
    skillCode: "CARP",
    skillName: "Carpentry",
    categoryKey: "skilled_trades",
    questionCount: 4,
    questions: [
      {
        id: "CARP-1",
        type: "multiple_choice",
        question: "Which tool is most commonly used to verify that a surface is level?",
        options: [
          { id: "a", text: "Chisel" },
          { id: "b", text: "Level" },
          { id: "c", text: "Mallet" },
          { id: "d", text: "Clamp" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "CARP-2",
        type: "true_false",
        question: "Measuring twice before cutting helps reduce material waste and fitting errors.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "CARP-3",
        type: "scenario",
        question: "You are installing a shelf and discover the wall anchors are loose. What should you do first?",
        options: [
          { id: "a", text: "Ignore it and continue tightening" },
          { id: "b", text: "Remove the shelf and secure the mounting properly" },
          { id: "c", text: "Use tape to hold it in place" },
          { id: "d", text: "Cut a new shelf board" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "CARP-4",
        type: "short_answer",
        question: "Briefly explain why square measurements matter in carpentry work.",
        expectedKeywords: ["alignment", "fit", "accuracy", "installation", "structure"],
        points: 1,
      },
    ],
  },
  {
    skillCode: "WELD",
    skillName: "Welding",
    categoryKey: "skilled_trades",
    questionCount: 4,
    questions: [
      {
        id: "WELD-1",
        type: "multiple_choice",
        question: "Which safety item is essential before beginning most welding tasks?",
        options: [
          { id: "a", text: "Safety glasses only" },
          { id: "b", text: "Welding helmet and proper protective gear" },
          { id: "c", text: "Dust mask only" },
          { id: "d", text: "Rubber sandals" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "WELD-2",
        type: "true_false",
        question: "A clean work surface can help improve weld quality.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "WELD-3",
        type: "scenario",
        question: "You notice contamination near the weld seam. What is the best next step?",
        options: [
          { id: "a", text: "Weld over it quickly" },
          { id: "b", text: "Clean the area before continuing" },
          { id: "c", text: "Lower visibility by dimming lights" },
          { id: "d", text: "Skip the joint" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "WELD-4",
        type: "short_answer",
        question: "Why is consistent technique important in welding?",
        expectedKeywords: ["strength", "quality", "consistency", "safety", "penetration"],
        points: 1,
      },
    ],
  },
  {
    skillCode: "BOOK",
    skillName: "Bookkeeping",
    categoryKey: "finance_bookkeeping",
    questionCount: 4,
    questions: [
      {
        id: "BOOK-1",
        type: "multiple_choice",
        question: "What is the main purpose of bookkeeping?",
        options: [
          { id: "a", text: "To design websites" },
          { id: "b", text: "To record and organize financial transactions" },
          { id: "c", text: "To repair hardware" },
          { id: "d", text: "To create marketing videos" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "BOOK-2",
        type: "true_false",
        question: "Keeping accurate records helps a business monitor cash flow and prepare reports.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "BOOK-3",
        type: "scenario",
        question: "A receipt is missing for a business expense. What is the best response?",
        options: [
          { id: "a", text: "Ignore the transaction" },
          { id: "b", text: "Create documentation and follow the business recordkeeping process" },
          { id: "c", text: "Guess the amount and move on" },
          { id: "d", text: "Delete the expense entirely" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "BOOK-4",
        type: "short_answer",
        question: "Why does reconciliation matter in bookkeeping?",
        expectedKeywords: ["accuracy", "errors", "matching", "records", "transactions"],
        points: 1,
      },
    ],
  },
];
