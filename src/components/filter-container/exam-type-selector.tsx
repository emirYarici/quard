import {Text, View} from 'react-native';
import {EXAM_TYPES} from '../../../constants/lessons';
import {useQuestionFilterStore} from '../../stores/filter.store';
import {FilterButtons} from './filter-buttons';
import React from 'react';
import {sizes} from '../../../constants/sizes';
import {COLORS} from '../../../constants/colors';
export function ExamTypeSelector() {
  const {selectExamType, selectedExamTypeIds} = useQuestionFilterStore();

  return (
    <View style={{gap: sizes.padding}}>
      <Text style={{fontWeight: 'bold', color: COLORS.textPrimary}}>SINAV</Text>
      <View style={{flexDirection: 'row', gap: sizes.padding / 2}}>
        {Object.keys(EXAM_TYPES).map(key => {
          const onPress = () => {
            selectExamType(EXAM_TYPES[key].id);
          };
          return (
            <FilterButtons
              key={`exam_type_${EXAM_TYPES[key].id}`}
              title={EXAM_TYPES[key].label}
              onPress={onPress}
              isActive={selectedExamTypeIds.some(
                item => item === EXAM_TYPES[key].id,
              )}
            />
          );
        })}
      </View>
    </View>
  );
}
