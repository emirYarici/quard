import {COLORS} from '../constants/colors';
import {subjects} from '../constants/lessons';
import {Question} from '../types/question.types';

export function getIconColor(subjectId: number) {
  switch (subjectId) {
    case 0:
      return {iconColor: COLORS.secondarySurface};
    case 1:
      return {iconColor: COLORS.biologyIcon};
    case 2:
      return {iconColor: COLORS.chemistryIcon};
    case 3:
      return {iconColor: COLORS.philosophyIcon};
    case 4:
      return {iconColor: COLORS.physicsIcon};
    case 5:
      return {iconColor: COLORS.geographyIcon};
    case 6:
      return {iconColor: COLORS.turkishIcon};
    default:
      return {iconColor: COLORS.turkishIcon};
  }
}

export function filterQuestions(
  questions: Question[],
  selectedSubjectIds: number[],
  selectedSubSubjectIds: number[],
  selectedExamTypeIds: number[],
) {
  return questions.filter(
    question =>
      (!selectedExamTypeIds.length ||
        selectedExamTypeIds.some(
          examTypeId => examTypeId === question.examId,
        )) &&
      (!selectedSubjectIds.length ||
        selectedSubjectIds.some(
          subjectId => subjectId === question.subjectId,
        )) &&
      (!selectedSubSubjectIds.length ||
        selectedSubSubjectIds.some(
          subsubjectid => subsubjectid === question.subSubjectId,
        )),
  );
}
