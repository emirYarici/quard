import {Image, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Question} from '../../../types/question.types';
import {sizes} from '../../../constants/sizes';
import {COLORS} from '../../../constants/colors';
import {QuestionHeader} from './components/question-header';
import {subjects, subSubjects} from '../../../constants/lessons';
import {QuestionFooter} from './components/question-footer';
import {giveDateShortFormat} from '../../../utils/date-utils';
import {SizeUtils} from '../../../utils/size-utils';
import {getIconColor} from '../../../utils/question.utils';
export function MidSizedQuestionCard({question}: {question: Question}) {
  const {iconColor} = useMemo(() => {
    return getIconColor(question.subjectId);
  }, [question]);
  const subjectName = subjects.find(
    subject => subject.subjectId === question.subjectId,
  )?.label;
  const subSubjectName = subSubjects.find(
    subject => subject.subSubjectId === question.subSubjectId,
  )?.label;
  const formatted = giveDateShortFormat(question.dateAdded);
  return (
    <View
      style={{
        width: '100%',
        gap: SizeUtils.responsiveHeight(5),
      }}>
      <Text
        style={{
          paddingLeft: sizes.padding,
          color: COLORS.secondaryMuted,
          fontSize: SizeUtils.responsiveFontSize(24),
        }}>
        {formatted}
      </Text>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderRadius: sizes.radius,
          backgroundColor: COLORS.surface,
          padding: sizes.padding,
          width: '100%',
          gap: 5,
        }}>
        <QuestionHeader
          iconbg={iconColor}
          header={subjectName?.toUpperCase()}
          fontSize={36}
          iconSize={15}
        />
        <View
          style={{
            padding: 2,
            backgroundColor: COLORS.secondarySurface,
            borderRadius: sizes.radius,
            overflow: 'hidden',
          }}>
          <Image
            style={{width: '100%', aspectRatio: 1.5}}
            source={{
              uri: question.imagePath,
            }}
          />
        </View>

        <QuestionFooter
          textColor={iconColor}
          subSubjectHeader={subSubjectName?.toUpperCase()}
        />
      </View>
    </View>
  );
}
