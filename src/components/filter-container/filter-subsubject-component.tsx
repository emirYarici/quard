import {Text, View} from 'react-native';
import {sizes} from '../../../constants/sizes';
import {useQuestionFilterStore} from '../../stores/filter.store';
import React, {useEffect, useState} from 'react';
import {FilterButtons} from './filter-buttons';
import {COLORS} from '../../../constants/colors';
import {subSubjects} from '../../../constants/lessons';
import {SubSubject} from '../../../types/question.types';
export function FilterSubsubjectComponent() {
  const {selectSubSubjectId, selectedSubSubjectIds, selectedSubjectIds} =
    useQuestionFilterStore();
  const [subsubjectList, setSubsubjectList] = useState<SubSubject[]>([]);
  useEffect(() => {
    setSubsubjectList(
      subSubjects?.filter(item =>
        selectedSubjectIds?.some(subjectId => subjectId === item?.subjectId),
      ),
    );
  }, [selectedSubjectIds]);

  return (
    <View style={{gap: sizes.padding}}>
      <Text style={{fontWeight: 'bold', color: COLORS.textPrimary}}>
        ALT KONU
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: sizes.padding / 2,
          flexWrap: 'wrap',
        }}>
        {subsubjectList.map(subSubject => {
          const onPress = () => {
            selectSubSubjectId(subSubject.id);
          };
          return (
            <FilterButtons
              key={`exam_type_${subSubject.id}`}
              title={subSubject.label}
              onPress={onPress}
              isActive={selectedSubSubjectIds.some(
                item => item === subSubject.id,
              )}
            />
          );
        })}
      </View>
    </View>
  );
}
