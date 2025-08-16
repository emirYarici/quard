import {ScrollView, View} from 'react-native';
import {COLORS} from '../../constants/colors';

import React, {useState} from 'react';

import {QuestionFilterHeader} from '../components/filter-container/question-filter-header';
import {ExamTypeSelector} from '../components/filter-container/exam-type-selector';
import {FilterSubjectComponent} from '../components/filter-container/filter-subject-component';
import {sizes} from '../../constants/sizes';
import {FilterSubsubjectComponent} from '../components/filter-container/filter-subsubject-component/filter-subsubject-component';
import {HasSolutionComponent} from '../components/filter-container/has-solution-component';
import {useQuestionFilterStore} from '../stores/filter.store';
export function QuestionFilterContainer() {
  const {
    selectedSubSubjectIds,
    selectedSubjectIds,
    selectedExamTypeIds,
    hasSolution,
  } = useQuestionFilterStore();

  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <QuestionFilterHeader />
      <ScrollView
        contentContainerStyle={{padding: sizes.padding, gap: sizes.padding}}>
        <HasSolutionComponent />
        <ExamTypeSelector />
        <FilterSubjectComponent />
        <FilterSubsubjectComponent />
      </ScrollView>
    </View>
  );
}
