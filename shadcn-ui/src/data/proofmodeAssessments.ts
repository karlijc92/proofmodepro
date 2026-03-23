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

const trueFalseOptions: ProofModeQuestionOption[] = [
  { id: "true", text: "True" },
  { id: "false", text: "False" },
];

const createQuestionId = (skillCode: string, number: number) =>
  `${skillCode}-${number}`;

const createSkilledTradesQuestions = (
  skillCode: string,
  skillName: string
): ProofModeQuestion[] => [
  {
    id: createQuestionId(skillCode, 1),
    type: "multiple_choice",
    question: `Which tool is most commonly used to verify that a surface is level during ${skillName.toLowerCase()} work?`,
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
    id: createQuestionId(skillCode, 2),
    type: "true_false",
    question: `Careful measurement and setup help reduce waste and errors in ${skillName.toLowerCase()} work.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 3),
    type: "scenario",
    question: `You begin a ${skillName.toLowerCase()} task and notice the mounting area is unstable. What should you do first?`,
    options: [
      { id: "a", text: "Ignore it and continue" },
      { id: "b", text: "Secure or correct the area before proceeding" },
      { id: "c", text: "Paint over it" },
      { id: "d", text: "Change tools without checking the issue" },
    ],
    correctAnswer: "b",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 4),
    type: "multiple_choice",
    question: `What is the main purpose of checking fit and alignment before finalizing a ${skillName.toLowerCase()} job?`,
    options: [
      { id: "a", text: "To improve accuracy and reduce rework" },
      { id: "b", text: "To make the job take longer" },
      { id: "c", text: "To avoid using tools" },
      { id: "d", text: "To skip safety steps" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 5),
    type: "multiple_choice",
    question: `Which behavior best supports quality during ${skillName.toLowerCase()} work?`,
    options: [
      { id: "a", text: "Using a consistent reference point and rechecking work" },
      { id: "b", text: "Estimating by eye only" },
      { id: "c", text: "Skipping setup checks" },
      { id: "d", text: "Ignoring small alignment issues" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 6),
    type: "true_false",
    question: `Using the wrong fastener, fitting, or material can weaken a completed ${skillName.toLowerCase()} installation.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 7),
    type: "scenario",
    question: `A part or material needed for your ${skillName.toLowerCase()} task appears damaged before installation. What is the best response?`,
    options: [
      { id: "a", text: "Install it anyway to save time" },
      { id: "b", text: "Evaluate and replace or correct it before use" },
      { id: "c", text: "Hide the damage and continue" },
      { id: "d", text: "Use tape and hope it works" },
    ],
    correctAnswer: "b",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 8),
    type: "multiple_choice",
    question: `What is the safest first step before using a powered tool during ${skillName.toLowerCase()} work?`,
    options: [
      { id: "a", text: "Remove all guards" },
      { id: "b", text: "Check the tool, work area, and setup" },
      { id: "c", text: "Start work before marking anything" },
      { id: "d", text: "Hold material by hand only" },
    ],
    correctAnswer: "b",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 9),
    type: "true_false",
    question: `Clean, clearly marked reference points usually improve accuracy and finish quality.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 10),
    type: "scenario",
    question: `You notice your ${skillName.toLowerCase()} installation is not sitting evenly after setup. What should you do?`,
    options: [
      { id: "a", text: "Force it into place and leave it" },
      { id: "b", text: "Adjust alignment before finalizing" },
      { id: "c", text: "Ignore the issue if it looks close" },
      { id: "d", text: "Remove one visible part only" },
    ],
    correctAnswer: "b",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 11),
    type: "multiple_choice",
    question: `Why is repeating the same proven process helpful in ${skillName.toLowerCase()} work?`,
    options: [
      { id: "a", text: "It improves consistency and repeatable quality" },
      { id: "b", text: "It removes the need for safety checks" },
      { id: "c", text: "It eliminates all measurements" },
      { id: "d", text: "It guarantees zero mistakes without review" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 12),
    type: "true_false",
    question: `Poor alignment early in a project can create larger fit problems later.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 13),
    type: "scenario",
    question: `A customer asks you to proceed with ${skillName.toLowerCase()} work on a visibly damaged surface. What is the best approach?`,
    options: [
      { id: "a", text: "Proceed immediately without mentioning the issue" },
      { id: "b", text: "Discuss the condition and recommend correction before proceeding" },
      { id: "c", text: "Ignore the damage and use more force" },
      { id: "d", text: "Leave without explanation" },
    ],
    correctAnswer: "b",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 14),
    type: "multiple_choice",
    question: `Why is securing material or fixtures before work often helpful?`,
    options: [
      { id: "a", text: "It improves stability, safety, and accuracy" },
      { id: "b", text: "It makes measuring unnecessary" },
      { id: "c", text: "It replaces all inspections" },
      { id: "d", text: "It eliminates cleanup" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 15),
    type: "scenario",
    question: `You finish a ${skillName.toLowerCase()} task but notice a small issue during final review. What is the best response?`,
    options: [
      { id: "a", text: "Correct it before considering the job complete" },
      { id: "b", text: "Ignore it if the customer has not seen it yet" },
      { id: "c", text: "Blame the materials and leave" },
      { id: "d", text: "Mark it finished without testing" },
    ],
    correctAnswer: "a",
    points: 1,
  },
];

const createAutomotiveQuestions = (
  skillCode: string,
  skillName: string
): ProofModeQuestion[] => [
  {
    id: createQuestionId(skillCode, 1),
    type: "multiple_choice",
    question: `What is an important first step before performing ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "Secure the vehicle and prepare the work area" },
      { id: "b", text: "Remove random parts first" },
      { id: "c", text: "Ignore safety equipment" },
      { id: "d", text: "Start without checking anything" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 2),
    type: "true_false",
    question: `Using the correct parts, tools, and service steps matters in ${skillName.toLowerCase()}.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 3),
    type: "scenario",
    question: `You begin a ${skillName.toLowerCase()} service and notice a damaged component nearby. What should you do?`,
    options: [
      { id: "a", text: "Ignore it and continue" },
      { id: "b", text: "Inspect and address the issue before continuing" },
      { id: "c", text: "Hit it with a tool" },
      { id: "d", text: "Close the hood and leave" },
    ],
    correctAnswer: "b",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 4),
    type: "multiple_choice",
    question: `Why is verifying service specifications important during ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "To support correct and reliable work" },
      { id: "b", text: "To make the job take longer" },
      { id: "c", text: "To avoid checking the vehicle" },
      { id: "d", text: "To skip final inspection" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 5),
    type: "multiple_choice",
    question: `Which behavior best supports quality in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "Following correct service steps and checking work" },
      { id: "b", text: "Guessing settings or torque values" },
      { id: "c", text: "Skipping the inspection" },
      { id: "d", text: "Rushing because the issue seems simple" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 6),
    type: "true_false",
    question: `Skipping a final inspection can leave service mistakes unnoticed.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 7),
    type: "scenario",
    question: `You complete the main ${skillName.toLowerCase()} task and notice an unusual sign during review. What should you do?`,
    options: [
      { id: "a", text: "Check the work and verify the condition before release" },
      { id: "b", text: "Ignore it if the vehicle still starts" },
      { id: "c", text: "Erase any warning sign without checking" },
      { id: "d", text: "Drive it hard to see what happens" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 8),
    type: "multiple_choice",
    question: `What does a clean work area help reduce during ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "Service errors and safety issues" },
      { id: "b", text: "The need for tools" },
      { id: "c", text: "The need for parts" },
      { id: "d", text: "Vehicle weight" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 9),
    type: "true_false",
    question: `Routine inspection and maintenance can help prevent larger vehicle problems.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 10),
    type: "scenario",
    question: `A warning light or symptom remains after ${skillName.toLowerCase()} service. What is the best first response?`,
    options: [
      { id: "a", text: "Stop and verify the work before releasing the vehicle" },
      { id: "b", text: "Ignore it if the car is moving" },
      { id: "c", text: "Tell the customer it will go away" },
      { id: "d", text: "Disconnect the battery without checking" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 11),
    type: "multiple_choice",
    question: `Why is proper tool use important in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It supports safety and helps avoid damage" },
      { id: "b", text: "It replaces service procedures" },
      { id: "c", text: "It makes inspections optional" },
      { id: "d", text: "It eliminates all maintenance needs" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 12),
    type: "true_false",
    question: `Incorrect installation or adjustment can create performance and safety problems.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 13),
    type: "scenario",
    question: `A customer asks for ${skillName.toLowerCase()} work, but the vehicle shows another related issue. What is the best approach?`,
    options: [
      { id: "a", text: "Mention the issue and recommend proper review before or during service" },
      { id: "b", text: "Ignore it to save time" },
      { id: "c", text: "Do unrelated work only" },
      { id: "d", text: "Guess the cause and send it out" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 14),
    type: "multiple_choice",
    question: `Which of the following best reflects strong basic vehicle service practice?`,
    options: [
      { id: "a", text: "Consistent service steps, review, and verification before completion" },
      { id: "b", text: "Fast work with no recheck" },
      { id: "c", text: "Changing steps every time without reason" },
      { id: "d", text: "Ignoring minor concerns completely" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 15),
    type: "scenario",
    question: `You finish a ${skillName.toLowerCase()} job and find a small issue during final review. What should you do?`,
    options: [
      { id: "a", text: "Correct it before considering the service complete" },
      { id: "b", text: "Let the customer discover it later" },
      { id: "c", text: "Ignore it because most of the job is done" },
      { id: "d", text: "Mark it complete anyway" },
    ],
    correctAnswer: "a",
    points: 1,
  },
];

const createITTechQuestions = (
  skillCode: string,
  skillName: string
): ProofModeQuestion[] => [
  {
    id: createQuestionId(skillCode, 1),
    type: "multiple_choice",
    question: `What is an important first step before beginning ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "Review the issue and prepare the correct tools or access" },
      { id: "b", text: "Randomly replace parts first" },
      { id: "c", text: "Ignore the reported problem" },
      { id: "d", text: "Skip all diagnostics" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 2),
    type: "true_false",
    question: `Accurate troubleshooting helps reduce repeat issues in ${skillName.toLowerCase()}.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 3),
    type: "scenario",
    question: `A user reports a problem during ${skillName.toLowerCase()} work, but the issue is not immediately obvious. What should you do first?`,
    options: [
      { id: "a", text: "Gather details and verify the issue before making changes" },
      { id: "b", text: "Erase settings immediately" },
      { id: "c", text: "Replace unrelated hardware" },
      { id: "d", text: "Ignore the report" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 4),
    type: "multiple_choice",
    question: `Why is documentation helpful during ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It supports repeatable work and easier troubleshooting" },
      { id: "b", text: "It makes systems slower" },
      { id: "c", text: "It replaces testing" },
      { id: "d", text: "It removes the need for communication" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 5),
    type: "multiple_choice",
    question: `Which behavior best supports good technical work in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "Testing changes before declaring the issue resolved" },
      { id: "b", text: "Changing multiple settings at random" },
      { id: "c", text: "Skipping verification" },
      { id: "d", text: "Ignoring error details" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 6),
    type: "true_false",
    question: `Making unverified changes can create new technical problems.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 7),
    type: "scenario",
    question: `You resolve one issue during ${skillName.toLowerCase()}, but another related problem appears. What should you do?`,
    options: [
      { id: "a", text: "Check whether the changes caused the new problem and continue methodically" },
      { id: "b", text: "Ignore it because the first issue improved" },
      { id: "c", text: "Restart without testing anything" },
      { id: "d", text: "Guess and close the task" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 8),
    type: "multiple_choice",
    question: `What is the value of using a consistent process during ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It improves accuracy, speed, and repeatability" },
      { id: "b", text: "It prevents all future issues automatically" },
      { id: "c", text: "It removes the need for communication" },
      { id: "d", text: "It means no testing is needed" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 9),
    type: "true_false",
    question: `Clear communication with the user or client improves technical support outcomes.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 10),
    type: "scenario",
    question: `You complete ${skillName.toLowerCase()} work, but the user says the issue still appears sometimes. What should you do?`,
    options: [
      { id: "a", text: "Recheck the issue conditions and verify before closing the task" },
      { id: "b", text: "Tell them to ignore it" },
      { id: "c", text: "Delete settings without checking" },
      { id: "d", text: "Close the ticket immediately" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 11),
    type: "multiple_choice",
    question: `Why is verifying compatibility important in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It helps avoid installation, setup, or performance issues" },
      { id: "b", text: "It makes all backups unnecessary" },
      { id: "c", text: "It replaces troubleshooting" },
      { id: "d", text: "It guarantees zero user error" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 12),
    type: "true_false",
    question: `Skipping checks after making technical changes can leave problems unresolved.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 13),
    type: "scenario",
    question: `A customer asks you to rush ${skillName.toLowerCase()} and skip testing. What is the best response?`,
    options: [
      { id: "a", text: "Explain that testing is needed to confirm a reliable result" },
      { id: "b", text: "Skip testing and hope it works" },
      { id: "c", text: "Change unrelated settings instead" },
      { id: "d", text: "Mark it complete immediately" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 14),
    type: "multiple_choice",
    question: `Which of the following best reflects strong technical practice?`,
    options: [
      { id: "a", text: "Methodical diagnosis, careful changes, and final verification" },
      { id: "b", text: "Random changes and no review" },
      { id: "c", text: "Immediate replacement without diagnosis" },
      { id: "d", text: "Ignoring user details" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 15),
    type: "scenario",
    question: `You complete ${skillName.toLowerCase()} and see one final warning or concern during review. What should you do?`,
    options: [
      { id: "a", text: "Investigate it before considering the work complete" },
      { id: "b", text: "Ignore it because the main issue improved" },
      { id: "c", text: "Hide it from the user" },
      { id: "d", text: "Mark the task done immediately" },
    ],
    correctAnswer: "a",
    points: 1,
  },
];

const createDigitalFreelanceQuestions = (
  skillCode: string,
  skillName: string
): ProofModeQuestion[] => [
  {
    id: createQuestionId(skillCode, 1),
    type: "multiple_choice",
    question: `What is an important first step before starting ${skillName.toLowerCase()} work for a client?`,
    options: [
      { id: "a", text: "Clarify the goal, scope, and deliverables" },
      { id: "b", text: "Start designing without direction" },
      { id: "c", text: "Ignore the brief" },
      { id: "d", text: "Send a final file immediately" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 2),
    type: "true_false",
    question: `Clear communication helps reduce revisions and misunderstandings in ${skillName.toLowerCase()}.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 3),
    type: "scenario",
    question: `A client gives unclear instructions for ${skillName.toLowerCase()}. What should you do first?`,
    options: [
      { id: "a", text: "Ask clarifying questions before moving forward" },
      { id: "b", text: "Guess and hope it matches" },
      { id: "c", text: "Ignore their goal" },
      { id: "d", text: "Submit random work" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 4),
    type: "multiple_choice",
    question: `Why is version review important in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It helps catch issues before final delivery" },
      { id: "b", text: "It makes deadlines impossible" },
      { id: "c", text: "It replaces the client brief" },
      { id: "d", text: "It removes the need for organization" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 5),
    type: "multiple_choice",
    question: `Which behavior best supports strong ${skillName.toLowerCase()} work?`,
    options: [
      { id: "a", text: "Following the brief and checking quality before delivery" },
      { id: "b", text: "Sending unfinished work without review" },
      { id: "c", text: "Ignoring feedback" },
      { id: "d", text: "Changing goals without approval" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 6),
    type: "true_false",
    question: `Skipping quality checks can lead to avoidable client revisions.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 7),
    type: "scenario",
    question: `You complete most of a ${skillName.toLowerCase()} task but notice a mismatch with the client brief. What should you do?`,
    options: [
      { id: "a", text: "Correct it before final delivery" },
      { id: "b", text: "Send it anyway" },
      { id: "c", text: "Ignore the original request" },
      { id: "d", text: "Blame the client" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 8),
    type: "multiple_choice",
    question: `What helps keep freelance digital work organized?`,
    options: [
      { id: "a", text: "Clear file naming, structured steps, and tracked revisions" },
      { id: "b", text: "Saving random versions everywhere" },
      { id: "c", text: "Ignoring deadlines" },
      { id: "d", text: "Skipping backup or exports" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 9),
    type: "true_false",
    question: `Strong client communication supports better outcomes and fewer delays.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 10),
    type: "scenario",
    question: `A client asks for a quick final delivery, but you have not done a final check on the ${skillName.toLowerCase()} work. What is the best response?`,
    options: [
      { id: "a", text: "Do a final review before delivering" },
      { id: "b", text: "Send it without checking" },
      { id: "c", text: "Delete the draft and restart" },
      { id: "d", text: "Ignore the request completely" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 11),
    type: "multiple_choice",
    question: `Why is it important to keep work aligned with the agreed goal in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It improves relevance, quality, and client satisfaction" },
      { id: "b", text: "It makes feedback impossible" },
      { id: "c", text: "It removes the need for revisions entirely" },
      { id: "d", text: "It guarantees payment regardless of quality" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 12),
    type: "true_false",
    question: `Small mistakes in digital freelance work can still affect the final client experience.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 13),
    type: "scenario",
    question: `A client requests a change that affects the scope of your ${skillName.toLowerCase()} work. What should you do?`,
    options: [
      { id: "a", text: "Clarify the change and confirm expectations before continuing" },
      { id: "b", text: "Ignore the request" },
      { id: "c", text: "Deliver old work only" },
      { id: "d", text: "Pretend the change was made" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 14),
    type: "multiple_choice",
    question: `Which of the following best reflects strong digital freelance practice?`,
    options: [
      { id: "a", text: "Clear scope, organized workflow, quality review, and communication" },
      { id: "b", text: "No brief, no review, and no file organization" },
      { id: "c", text: "Frequent guessing and missed checks" },
      { id: "d", text: "Skipping deadlines and revisions" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 15),
    type: "scenario",
    question: `You are about to deliver ${skillName.toLowerCase()} work and spot one final issue. What should you do?`,
    options: [
      { id: "a", text: "Fix it before delivery" },
      { id: "b", text: "Deliver it anyway and hope it is unnoticed" },
      { id: "c", text: "Blame the software" },
      { id: "d", text: "Ignore the final review" },
    ],
    correctAnswer: "a",
    points: 1,
  },
];

const createFinanceBookkeepingQuestions = (
  skillCode: string,
  skillName: string
): ProofModeQuestion[] => [
  {
    id: createQuestionId(skillCode, 1),
    type: "multiple_choice",
    question: `What is the main purpose of ${skillName.toLowerCase()} work?`,
    options: [
      { id: "a", text: "To maintain accurate financial records and support decisions" },
      { id: "b", text: "To design marketing graphics" },
      { id: "c", text: "To repair hardware" },
      { id: "d", text: "To edit videos only" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 2),
    type: "true_false",
    question: `Accurate records support reporting, planning, and financial review in ${skillName.toLowerCase()}.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 3),
    type: "scenario",
    question: `A supporting document is missing during ${skillName.toLowerCase()} work. What is the best first response?`,
    options: [
      { id: "a", text: "Document the issue and follow the recordkeeping process" },
      { id: "b", text: "Guess the amount and move on" },
      { id: "c", text: "Delete the transaction without review" },
      { id: "d", text: "Ignore the missing record completely" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 4),
    type: "multiple_choice",
    question: `Why is correct categorization important in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It improves accuracy and reporting usefulness" },
      { id: "b", text: "It removes the need for reconciliation" },
      { id: "c", text: "It prevents all audits automatically" },
      { id: "d", text: "It makes source documents unnecessary" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 5),
    type: "multiple_choice",
    question: `Which behavior best supports strong ${skillName.toLowerCase()} practice?`,
    options: [
      { id: "a", text: "Timely entries, review, and accurate supporting records" },
      { id: "b", text: "Late entries and missing backup" },
      { id: "c", text: "Guessing missing information" },
      { id: "d", text: "Using one category for everything" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 6),
    type: "true_false",
    question: `Reconciliation helps identify errors, omissions, and duplicate transactions.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 7),
    type: "scenario",
    question: `You notice a transaction appears incorrect during ${skillName.toLowerCase()} review. What should you do first?`,
    options: [
      { id: "a", text: "Verify source records and correct it appropriately" },
      { id: "b", text: "Ignore it if the amount is small" },
      { id: "c", text: "Delete everything in the account" },
      { id: "d", text: "Move it randomly to another category" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 8),
    type: "multiple_choice",
    question: `What is one major benefit of organized source documents?`,
    options: [
      { id: "a", text: "Easier verification and support for recorded transactions" },
      { id: "b", text: "Less need for accuracy" },
      { id: "c", text: "No need for account review" },
      { id: "d", text: "Automatic valuation of the business" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 9),
    type: "true_false",
    question: `Bookkeeping or accounting errors can affect taxes, budgeting, and business decisions.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 10),
    type: "scenario",
    question: `A client requests a quick answer, but records are incomplete during ${skillName.toLowerCase()} work. What is the best response?`,
    options: [
      { id: "a", text: "Explain that records should be updated first for a reliable answer" },
      { id: "b", text: "Provide a final answer based on memory only" },
      { id: "c", text: "Ignore the request" },
      { id: "d", text: "Guess and mark it final" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 11),
    type: "multiple_choice",
    question: `Why is regular review important in ${skillName.toLowerCase()}?`,
    options: [
      { id: "a", text: "It helps catch problems before they grow" },
      { id: "b", text: "It removes the need for source records" },
      { id: "c", text: "It replaces month-end tasks completely" },
      { id: "d", text: "It prevents all business losses automatically" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 12),
    type: "true_false",
    question: `Skipping review and reconciliation can make reporting less reliable.`,
    options: trueFalseOptions,
    correctAnswer: "true",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 13),
    type: "scenario",
    question: `A transaction was posted to the wrong category during ${skillName.toLowerCase()} work. What should you do?`,
    options: [
      { id: "a", text: "Correct the category and document the change appropriately" },
      { id: "b", text: "Leave it if no one notices" },
      { id: "c", text: "Delete the vendor or customer" },
      { id: "d", text: "Move it to income without review" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 14),
    type: "multiple_choice",
    question: `Which of the following best reflects strong finance or bookkeeping practice?`,
    options: [
      { id: "a", text: "Consistent records, timely review, and accurate support" },
      { id: "b", text: "Late entries with no backup" },
      { id: "c", text: "Frequent guessing" },
      { id: "d", text: "Minimal review and no documentation" },
    ],
    correctAnswer: "a",
    points: 1,
  },
  {
    id: createQuestionId(skillCode, 15),
    type: "scenario",
    question: `You are about to finalize ${skillName.toLowerCase()} work and spot one unresolved issue. What should you do?`,
    options: [
      { id: "a", text: "Resolve or document it before finalizing the work" },
      { id: "b", text: "Ignore it and close the task" },
      { id: "c", text: "Hide it in another account" },
      { id: "d", text: "Guess and move on" },
    ],
    correctAnswer: "a",
    points: 1,
  },
];

const buildAssessment = (
  skillCode: string,
  skillName: string,
  categoryKey: string
): ProofModeAssessment => {
  let questions: ProofModeQuestion[] = [];

  if (categoryKey === "skilled_trades") {
    questions = createSkilledTradesQuestions(skillCode, skillName);
  } else if (categoryKey === "automotive") {
    questions = createAutomotiveQuestions(skillCode, skillName);
  } else if (categoryKey === "it_tech") {
    questions = createITTechQuestions(skillCode, skillName);
  } else if (categoryKey === "digital_freelance") {
    questions = createDigitalFreelanceQuestions(skillCode, skillName);
  } else if (categoryKey === "finance_bookkeeping") {
    questions = createFinanceBookkeepingQuestions(skillCode, skillName);
  }

  return {
    skillCode,
    skillName,
    categoryKey,
    questionCount: questions.length,
    questions,
  };
};

export const proofModeAssessments: ProofModeAssessment[] = [
  // Skilled Trades
  buildAssessment("CARP", "Carpentry", "skilled_trades"),
  buildAssessment("WELD", "Welding", "skilled_trades"),
  buildAssessment("PLMB", "Plumbing Repair", "skilled_trades"),
  buildAssessment("ELEC", "Electrical Fixture Installation", "skilled_trades"),
  buildAssessment("CONC", "Concrete Work", "skilled_trades"),

  // Automotive
  buildAssessment("OILM", "Oil Change & Basic Maintenance", "automotive"),
  buildAssessment("BRKE", "Brake Replacement", "automotive"),
  buildAssessment("TIRE", "Tire Installation & Balancing", "automotive"),
  buildAssessment("ENGD", "Engine Diagnostics", "automotive"),
  buildAssessment("BATT", "Battery Replacement", "automotive"),

  // IT / Tech
  buildAssessment("HARD", "Computer Hardware Repair", "it_tech"),
  buildAssessment("LAPR", "Laptop Repair", "it_tech"),
  buildAssessment("NETW", "Network Setup", "it_tech"),
  buildAssessment("WIFI", "WiFi Installation", "it_tech"),
  buildAssessment("SOFT", "Software Troubleshooting", "it_tech"),

  // Digital Freelance
  buildAssessment("WEBB", "Website Setup", "digital_freelance"),
  buildAssessment("GRPH", "Graphic Design", "digital_freelance"),
  buildAssessment("VIDE", "Video Editing", "digital_freelance"),
  buildAssessment("SOCM", "Social Media Management", "digital_freelance"),
  buildAssessment("ANLY", "Google Analytics Setup", "digital_freelance"),

  // Finance & Bookkeeping
  buildAssessment("BOOK", "Bookkeeping", "finance_bookkeeping"),
  buildAssessment("QKBS", "QuickBooks Management", "finance_bookkeeping"),
  buildAssessment("PAYR", "Payroll Processing", "finance_bookkeeping"),
  buildAssessment("INVC", "Invoice Management", "finance_bookkeeping"),
  buildAssessment("ACCT", "Basic Accounting Principles", "finance_bookkeeping"),
];
