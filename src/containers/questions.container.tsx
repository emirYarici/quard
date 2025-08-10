import {Pressable, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import storage from '../../infra/storage';
import {COLORS} from '../../constants/colors';
import {Question} from '../../types/question.types';
import {useFocusEffect} from '@react-navigation/native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {sizes} from '../../constants/sizes';
import {ScrollableQuestionList} from '../components/scrollable-question-list';
import {filterQuestions} from '../../utils/question.utils';
import {useQuestionFilterStore} from '../stores/filter.store';

export default function QuestionsContainer() {
  const [questions, setQuestions] = useState<Question[] | null>([]);
  const [loading, setLoading] = useState(true);
  const {selectedSubjectIds, selectedSubSubjectIds, selectedExamTypeIds} =
    useQuestionFilterStore();
  const insets = useSafeAreaInsets();
  useFocusEffect(
    useCallback(() => {
      const loadQuestions = async () => {
        try {
          const questionsData = await storage.getQuestions();
          console.log('questionsdata', questionsData);

          setQuestions(
            filterQuestions(
              questionsData,
              selectedSubjectIds,
              selectedSubSubjectIds,
              selectedExamTypeIds,
            ),
          );
        } catch (error) {
          console.error('Questions yüklenemedi:', error);
        } finally {
          setLoading(false);
        }
      };

      loadQuestions();
    }, []),
  );

  if (loading) {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: COLORS.background,
        gap: sizes.padding,
      }}>
      <ScrollableQuestionList questions={questions} />
    </View>
  );
}
