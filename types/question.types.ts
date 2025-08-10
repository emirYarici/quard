export type Question = {
  id: string;
  examId: number;
  imagePath?: string;
  fileName: string;
  ocrText: string;
  subjectId: number;
  subSubjectId: number;
  dateAdded: string;
  reviewCount: number;
  isMastered: boolean;
  notes: string[];
  solutionImagepath?: string;
  difficulty: number;
  tags: string[];
};

export type SubSubject = {
  label: string;
  subjectId: number;
  id: number;
  examId: number;
};
export type Subject = {
  label: string;
  value: string;
  id: number;
};
