import {Text, View} from 'react-native';
import {subjects} from '../../../constants/lessons';
import {sizes} from '../../../constants/sizes';
import {useQuestionFilterStore} from '../../stores/filter.store';
import React from 'react';
import {FilterButtons} from './filter-buttons';
import {COLORS} from '../../../constants/colors';
import {Collapsible} from '../collapsible/collapsible';
export function FilterSubjectComponent() {
  const {selectedSubjectIds, selectSubjectId} = useQuestionFilterStore();
  return (
    <Collapsible
      header={
        <Text style={{fontWeight: 'bold', color: COLORS.textPrimary}}>
          KONU
        </Text>
      }>
      <View
        style={{
          flexDirection: 'row',
          gap: sizes.padding / 2,
          flexWrap: 'wrap',
        }}>
        {subjects.map(subject => {
          const onPress = () => {
            selectSubjectId(subject.id);
          };
          return (
            <FilterButtons
              key={`exam_type_${subject.id}`}
              title={subject.label}
              onPress={onPress}
              isActive={selectedSubjectIds.some(item => item === subject.id)}
            />
          );
        })}
      </View>
    </Collapsible>
  );
}
