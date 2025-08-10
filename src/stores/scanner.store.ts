import {create} from 'zustand';

type ScannerState = {
  selectedSubjectId: number;
  selectedSubSubjectId: number;
  saveAsImage: boolean;
  isTyt: boolean;
  selectSubjectId: (id: number) => void;
  selectSubSubjectId: (id: number) => void;
  toggleSaveAsImage: () => void;
  setTyt: () => void;
  setAyt: () => void;

  reset: () => void;
};

export const useScannerStore = create<ScannerState>(set => ({
  selectedSubjectId: -1,
  selectedSubSubjectId: -1,
  saveAsImage: false,
  isTyt: true,
  selectSubjectId: id => set(() => ({selectedSubjectId: id})),
  selectSubSubjectId: id => set(() => ({selectedSubSubjectId: id})),
  toggleSaveAsImage: () => set(state => ({saveAsImage: !state.saveAsImage})),
  setTyt: () => set(state => ({isTyt: true})),
  setAyt: () => set(state => ({isTyt: false})),

  reset: () => set({selectedSubSubjectId: -1, selectedSubjectId: -1}),
}));
