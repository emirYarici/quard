import {Image, Pressable, Text, View} from 'react-native';
import {Question} from '../../../types/question.types';
import {memo, useMemo} from 'react';
import {COLORS} from '../../../constants/colors';
import {subjects, subSubjects} from '../../../constants/lessons';
import {QuestionHeader} from './components/question-header';
import React from 'react';
import {QuestionFooter} from './components/question-footer';
import {SolutionSwitch} from './components/solution-switch';
import {sizes} from '../../../constants/sizes';
import {giveDateShortFormat} from '../../../utils/date-utils';
import {SizeUtils} from '../../../utils/size-utils';
import {useNavigation} from '@react-navigation/native';
export const SmallSizedQuestionCard = memo(
  ({question}: {question: Question}) => {
    const navigation = useNavigation();
    const {iconColor} = useMemo(() => {
      switch (question.subjectId) {
        case 0:
          return {iconColor: COLORS.mathIcon};
        case 1:
          return {iconColor: COLORS.biologyIcon};
        case 2:
          return {iconColor: COLORS.chemIcon};
        case 3:
          return {iconColor: COLORS.philosophyIcon};
        case 4:
          return {iconColor: COLORS.physicsIcon};
        case 5:
          return {iconColor: COLORS.geoIcon};
        case 6:
          return {iconColor: COLORS.turkishIcon};
        default:
          return {iconColor: COLORS.turkishIcon};
      }
    }, [question]);
    const subjectName = subjects.find(
      subject => subject.subjectId === question.subjectId,
    )?.label;
    const subSubjectName = subSubjects.find(
      subject => subject.subSubjectId === question.subSubjectId,
    )?.label;
    console.log('ocrText ', subSubjectName);
    const formatted = giveDateShortFormat(question.dateAdded);

    return (
      <Pressable
        style={{gap: 2, flex: 1}}
        onPress={() =>
          navigation.push('question-detail-container', {question})
        }>
        <Text
          style={{
            color: COLORS.secondaryMuted,
            fontSize: SizeUtils.responsiveFontSize(24),
            paddingLeft: sizes.padding,
          }}>
          {formatted.toUpperCase()}
        </Text>
        <View
          style={{
            backgroundColor: COLORS.surface,
            borderRadius: sizes.radius,
            overflow: 'hidden',
            gap: 5,
            flex: 1,
            padding: sizes.padding,
          }}>
          <QuestionHeader
            header={subjectName}
            iconbg={iconColor}
            fontSize={20}
            iconSize={15}
          />
          <View
            style={{
              position: 'absolute',
              right: sizes.padding,
              top: sizes.padding,
            }}>
            <SolutionSwitch haveSolution={true} />
          </View>
          <View
            style={{
              flex: 1,
              height: SizeUtils.responsiveHeight(100),
              overflow: 'hidden',
              borderRadius: sizes.radius,
              backgroundColor: COLORS.secondarySurface,
            }}>
            {question.imagePath ? (
              <Image
                style={{flex: 1}}
                source={{
                  uri: question.imagePath,
                }}
              />
            ) : (
              <View style={{flex: 1}}>
                <Text numberOfLines={3}>{question?.ocrText.text}</Text>
              </View>
            )}
          </View>

          <QuestionFooter
            subSubjectHeader={subSubjectName}
            textColor={COLORS.textThird}
            textSize={20}
          />
        </View>
      </Pressable>
    );
  },
);
