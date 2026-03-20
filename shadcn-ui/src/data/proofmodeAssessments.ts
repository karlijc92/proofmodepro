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
    questionCount: 15,
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
        type: "multiple_choice",
        question: "What is the main purpose of a stud finder during wall-mounted carpentry work?",
        options: [
          { id: "a", text: "To locate hidden framing members" },
          { id: "b", text: "To smooth wood surfaces" },
          { id: "c", text: "To cut trim at an angle" },
          { id: "d", text: "To mark paint colors" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "CARP-5",
        type: "multiple_choice",
        question: "Which measuring tool is most useful for checking a 90-degree corner?",
        options: [
          { id: "a", text: "Speed square" },
          { id: "b", text: "Putty knife" },
          { id: "c", text: "Pry bar" },
          { id: "d", text: "Nail set" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "CARP-6",
        type: "true_false",
        question: "Using the wrong fastener for the material can weaken the final installation.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "CARP-7",
        type: "scenario",
        question: "A board is slightly warped before installation. What is the best response?",
        options: [
          { id: "a", text: "Install it anyway without checking fit" },
          { id: "b", text: "Evaluate whether it can be corrected or replaced before use" },
          { id: "c", text: "Paint it first and hope it straightens" },
          { id: "d", text: "Cut all pieces to the same warped angle" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "CARP-8",
        type: "multiple_choice",
        question: "What is the safest first step before using a circular saw?",
        options: [
          { id: "a", text: "Remove the blade guard" },
          { id: "b", text: "Check the blade, guards, and work area" },
          { id: "c", text: "Hold the material by hand without support" },
          { id: "d", text: "Start cutting before marking the board" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "CARP-9",
        type: "true_false",
        question: "A clean, clearly marked cut line usually improves accuracy and finish quality.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "CARP-10",
        type: "scenario",
        question: "You notice a cabinet door is not hanging evenly after installation. What should you do?",
        options: [
          { id: "a", text: "Force it closed and leave it" },
          { id: "b", text: "Adjust alignment and hardware before finalizing" },
          { id: "c", text: "Sand the floor under it" },
          { id: "d", text: "Remove the handle only" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "CARP-11",
        type: "multiple_choice",
        question: "Which of the following is most important when laying out repeated cuts?",
        options: [
          { id: "a", text: "Using a consistent measurement reference" },
          { id: "b", text: "Changing tape measures each time" },
          { id: "c", text: "Estimating by eye" },
          { id: "d", text: "Skipping the first measurement" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "CARP-12",
        type: "true_false",
        question: "Poor alignment early in a project can create larger fit problems later.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "CARP-13",
        type: "scenario",
        question: "A customer asks you to install shelving on a visibly damaged wall area. What is the best approach?",
        options: [
          { id: "a", text: "Install it immediately without mentioning the damage" },
          { id: "b", text: "Discuss the condition, recommend repair, and document the issue before proceeding" },
          { id: "c", text: "Use extra screws and ignore the wall condition" },
          { id: "d", text: "Refuse all work without explanation" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "CARP-14",
        type: "multiple_choice",
        question: "Why is clamping material before cutting often helpful?",
        options: [
          { id: "a", text: "It makes the blade spin slower" },
          { id: "b", text: "It helps keep the workpiece stable and improves safety" },
          { id: "c", text: "It replaces the need for measuring" },
          { id: "d", text: "It eliminates all dust" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "CARP-15",
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
    questionCount: 15,
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
        type: "multiple_choice",
        question: "What is one common purpose of a welding clamp?",
        options: [
          { id: "a", text: "To polish the weld bead" },
          { id: "b", text: "To help secure material in position" },
          { id: "c", text: "To replace a welding helmet" },
          { id: "d", text: "To test gas flow" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "WELD-5",
        type: "true_false",
        question: "Inconsistent travel speed can affect bead appearance and weld quality.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "WELD-6",
        type: "scenario",
        question: "You begin welding and notice excessive spatter. What is the best first response?",
        options: [
          { id: "a", text: "Ignore it and finish as fast as possible" },
          { id: "b", text: "Pause and check settings, surface prep, and technique" },
          { id: "c", text: "Turn off ventilation" },
          { id: "d", text: "Use bare hands to steady the material" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "WELD-7",
        type: "multiple_choice",
        question: "Why is proper ventilation important during many welding tasks?",
        options: [
          { id: "a", text: "It improves paint color matching" },
          { id: "b", text: "It helps reduce exposure to fumes" },
          { id: "c", text: "It keeps the helmet from fogging for style reasons only" },
          { id: "d", text: "It eliminates all need for PPE" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "WELD-8",
        type: "true_false",
        question: "Surface rust, oil, or debris can interfere with weld quality.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "WELD-9",
        type: "scenario",
        question: "A coworker is about to weld without adequate eye protection. What should you do?",
        options: [
          { id: "a", text: "Ignore it because it is their choice" },
          { id: "b", text: "Stop and address the safety issue before work continues" },
          { id: "c", text: "Turn away and continue your own task" },
          { id: "d", text: "Increase amperage instead" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "WELD-10",
        type: "multiple_choice",
        question: "What does consistent joint preparation help improve?",
        options: [
          { id: "a", text: "Fit-up and weld consistency" },
          { id: "b", text: "Office paperwork only" },
          { id: "c", text: "Helmet battery life only" },
          { id: "d", text: "Paint drying speed" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "WELD-11",
        type: "true_false",
        question: "Skipping setup checks can increase the chance of defects or rework.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "WELD-12",
        type: "scenario",
        question: "You see that the joint has shifted slightly before the final pass. What is the best action?",
        options: [
          { id: "a", text: "Proceed anyway and hope it holds" },
          { id: "b", text: "Stop, correct alignment, and continue once stable" },
          { id: "c", text: "Add paint before welding" },
          { id: "d", text: "Skip the final pass" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "WELD-13",
        type: "multiple_choice",
        question: "Which behavior best supports welding quality control?",
        options: [
          { id: "a", text: "Checking finished welds for visible defects" },
          { id: "b", text: "Avoiding all inspections to save time" },
          { id: "c", text: "Changing settings randomly" },
          { id: "d", text: "Ignoring repeated problems" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "WELD-14",
        type: "multiple_choice",
        question: "What is the best reason to follow the same proven welding procedure on repeated work?",
        options: [
          { id: "a", text: "To improve consistency and repeatable quality" },
          { id: "b", text: "To make cleanup impossible" },
          { id: "c", text: "To avoid wearing PPE" },
          { id: "d", text: "To remove the need for inspection" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "WELD-15",
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
    questionCount: 15,
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
        type: "multiple_choice",
        question: "Which financial record is most useful for reviewing money coming in and going out?",
        options: [
          { id: "a", text: "Cash flow record" },
          { id: "b", text: "Paint inventory sheet" },
          { id: "c", text: "Website color palette" },
          { id: "d", text: "Shipping label only" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "BOOK-5",
        type: "true_false",
        question: "Reconciliation helps identify missing, duplicated, or incorrect transactions.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "BOOK-6",
        type: "scenario",
        question: "You notice a transaction appears twice in the ledger. What should you do first?",
        options: [
          { id: "a", text: "Delete both entries immediately" },
          { id: "b", text: "Investigate source records and confirm which entry is accurate" },
          { id: "c", text: "Ignore it until year-end" },
          { id: "d", text: "Print the ledger and restart the system" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "BOOK-7",
        type: "multiple_choice",
        question: "Why is categorizing transactions correctly important?",
        options: [
          { id: "a", text: "It helps produce more accurate reports" },
          { id: "b", text: "It makes invoices decorative" },
          { id: "c", text: "It removes the need for bank statements" },
          { id: "d", text: "It prevents all audits automatically" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "BOOK-8",
        type: "true_false",
        question: "Bookkeeping errors can affect budgeting, taxes, and management decisions.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "BOOK-9",
        type: "scenario",
        question: "A client asks for a quick profit picture, but several transactions have not been entered yet. What is the best response?",
        options: [
          { id: "a", text: "Provide a final answer without mentioning missing data" },
          { id: "b", text: "Explain that records should be updated first for a more reliable view" },
          { id: "c", text: "Estimate based on memory only" },
          { id: "d", text: "Refuse to help at all" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "BOOK-10",
        type: "multiple_choice",
        question: "Which practice best supports clean month-end bookkeeping?",
        options: [
          { id: "a", text: "Waiting several months to enter transactions" },
          { id: "b", text: "Reviewing accounts regularly and reconciling on schedule" },
          { id: "c", text: "Changing categories often without notes" },
          { id: "d", text: "Skipping bank review if balances seem close" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "BOOK-11",
        type: "true_false",
        question: "Strong bookkeeping supports better decision-making by owners and managers.",
        options: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
        correctAnswer: "true",
        points: 1,
      },
      {
        id: "BOOK-12",
        type: "scenario",
        question: "You find that a vendor payment was recorded in the wrong expense category. What should you do?",
        options: [
          { id: "a", text: "Leave it if the dollar amount is small" },
          { id: "b", text: "Correct the category and document the change appropriately" },
          { id: "c", text: "Move it to income" },
          { id: "d", text: "Delete the vendor from the system" },
        ],
        correctAnswer: "b",
        points: 1,
      },
      {
        id: "BOOK-13",
        type: "multiple_choice",
        question: "What is one major benefit of keeping source documents organized?",
        options: [
          { id: "a", text: "Easier verification and support for recorded transactions" },
          { id: "b", text: "Less need for accuracy" },
          { id: "c", text: "No need for reconciliation" },
          { id: "d", text: "Automatic business valuation" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "BOOK-14",
        type: "multiple_choice",
        question: "Which of the following best reflects strong bookkeeping practice?",
        options: [
          { id: "a", text: "Consistent entries, timely review, and accurate support records" },
          { id: "b", text: "Late entries with no backup documentation" },
          { id: "c", text: "Guessing missing amounts" },
          { id: "d", text: "Using one category for all expenses" },
        ],
        correctAnswer: "a",
        points: 1,
      },
      {
        id: "BOOK-15",
        type: "short_answer",
        question: "Why does reconciliation matter in bookkeeping?",
        expectedKeywords: ["accuracy", "errors", "matching", "records", "transactions"],
        points: 1,
      },
    ],
  },
];
