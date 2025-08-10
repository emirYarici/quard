import {View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {ScrollableQuestionList} from '../components/scrollable-question-list';
import {useEffect, useState} from 'react';

import React from 'react';
import {Question} from '../../types/question.types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sizes} from '../../constants/sizes';
import {getQuestionsByDate} from '../queries/question.queries';
export function DayDetailsContainer(prop: {
  route: {
    params: {date: string};
  };
}) {
  console.log('baksana emir', prop.route.params.date);
  const [questions, setQuestions] = useState<Question[]>([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const dateQuestions = await getQuestionsByDate(prop.route.params.date);

        setQuestions(dateQuestions);
      } catch (error) {
        console.error('Questions yüklenemedi:', error);
      }
    };
    loadQuestions();
  }, []);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: insets.top + sizes.padding,
      }}>
      <ScrollableQuestionList questions={questions} />
    </View>
  );
}
