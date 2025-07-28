import {create} from 'zustand';

type ScannerState = {
  selectedSubjectId: number;
  selectedSubSubjectId: number;
  saveAsImage: boolean;
  selectSubjectId: (id: number) => void;
  selectSubSubjectId: (id: number) => void;
  toggleSaveAsImage: () => void;
  reset: () => void;
};

export const useScannerStore = create<ScannerState>(set => ({
  selectedSubjectId: -1,
  selectedSubSubjectId: -1,
  saveAsImage: false,
  selectSubjectId: id => set(() => ({selectedSubjectId: id})),
  selectSubSubjectId: id => set(() => ({selectedSubSubjectId: id})),
  toggleSaveAsImage: () => set(state => ({saveAsImage: !state.saveAsImage})),
  reset: () => set({selectedSubSubjectId: -1, selectedSubjectId: -1}),
}));
