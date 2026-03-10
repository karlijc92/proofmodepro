import { proofModeSkills } from "@/data/proofmodeConfig";
import { proofModeAssessments } from "@/data/proofmodeAssessments";

export function getAssessmentBySkillCode(skillCode: string) {
  return proofModeAssessments.find(
    (assessment) => assessment.skillCode === skillCode
  );
}

export function skillHasAssessment(skillCode: string) {
  return proofModeAssessments.some(
    (assessment) => assessment.skillCode === skillCode
  );
}

export function getSkillsWithAssessmentStatus() {
  return proofModeSkills.map((skill) => ({
    ...skill,
    hasAssessment: skillHasAssessment(skill.code),
    assessment: getAssessmentBySkillCode(skill.code) || null,
  }));
}

export function getAssessmentCoverageSummary() {
  const totalSkills = proofModeSkills.length;
  const skillsWithAssessments = proofModeSkills.filter((skill) =>
    skillHasAssessment(skill.code)
  ).length;

  return {
    totalSkills,
    skillsWithAssessments,
    skillsWithoutAssessments: totalSkills - skillsWithAssessments,
    coveragePercent:
      totalSkills === 0
        ? 0
        : Math.round((skillsWithAssessments / totalSkills) * 100),
  };
}
