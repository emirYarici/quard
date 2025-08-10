import {create} from 'zustand';

type QuestionFilterState = {
  selectedSubjectIds: number[];
  selectedSubSubjectIds: number[];
  selectedExamTypeIds: number[];
  selectSubjectId: (id: number) => void;
  selectSubSubjectId: (id: number) => void;
  selectExamType: (id: number) => void;
  reset: () => void;
};

export const useQuestionFilterStore = create<QuestionFilterState>(set => ({
  selectedSubjectIds: [],
  selectedSubSubjectIds: [],
  selectedExamTypeIds: [],
  selectSubjectId: id =>
    set(({selectedSubjectIds}) => {
      if (!selectedSubjectIds.some(item => item === id)) {
        return {selectedSubjectIds: [...selectedSubjectIds, id]};
      } else {
        return {
          selectedSubjectIds: selectedSubjectIds.filter(item => item !== id),
        };
      }
    }),
  selectSubSubjectId: id =>
    set(({selectedSubSubjectIds}) => {
      if (!selectedSubSubjectIds.some(item => item === id)) {
        return {selectedSubSubjectIds: [...selectedSubSubjectIds, id]};
      } else {
        return {
          selectedSubSubjectIds: selectedSubSubjectIds.filter(
            item => item !== id,
          ),
        };
      }
    }),
  selectExamType: id =>
    set(({selectedExamTypeIds}) => {
      if (!selectedExamTypeIds.some(item => item === id)) {
        return {selectedExamTypeIds: [...selectedExamTypeIds, id]};
      } else {
        return {
          selectedExamTypeIds: selectedExamTypeIds.filter(item => item !== id),
        };
      }
    }),
  reset: () =>
    set({
      selectedExamTypeIds: [],
      selectedSubjectIds: [],
      selectedSubSubjectIds: [],
    }),
}));
