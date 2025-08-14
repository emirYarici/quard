import {create} from 'zustand';

type QuestionFilterState = {
  selectedSubjectIds: number[];
  selectedSubSubjectIds: number[];
  selectedExamTypeIds: number[];
  hasSolution: boolean;
  selectSubjectId: (id: number) => void;
  selectSubSubjectId: (id: number) => void;
  selectExamType: (id: number) => void;
  toggleHasSolution: () => void;
  reset: () => void;
};

export const useQuestionFilterStore = create<QuestionFilterState>(set => ({
  selectedSubjectIds: [],
  selectedSubSubjectIds: [],
  selectedExamTypeIds: [],
  hasSolution: false, // default value

  selectSubjectId: id =>
    set(({selectedSubjectIds}) => {
      if (!selectedSubjectIds.includes(id)) {
        return {selectedSubjectIds: [...selectedSubjectIds, id]};
      }
      return {
        selectedSubjectIds: selectedSubjectIds.filter(item => item !== id),
      };
    }),

  selectSubSubjectId: id =>
    set(({selectedSubSubjectIds}) => {
      if (!selectedSubSubjectIds.includes(id)) {
        return {selectedSubSubjectIds: [...selectedSubSubjectIds, id]};
      }
      return {
        selectedSubSubjectIds: selectedSubSubjectIds.filter(
          item => item !== id,
        ),
      };
    }),

  selectExamType: id =>
    set(({selectedExamTypeIds}) => {
      if (!selectedExamTypeIds.includes(id)) {
        return {selectedExamTypeIds: [...selectedExamTypeIds, id]};
      }
      return {
        selectedExamTypeIds: selectedExamTypeIds.filter(item => item !== id),
      };
    }),

  toggleHasSolution: () => set(state => ({hasSolution: !state.hasSolution})),

  reset: () =>
    set({
      selectedExamTypeIds: [],
      selectedSubjectIds: [],
      selectedSubSubjectIds: [],
      hasSolution: false,
    }),
}));
