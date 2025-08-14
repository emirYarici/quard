import {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {subjects, subSubjects} from '../../../../constants/lessons';
import {sizes} from '../../../../constants/sizes';
import {SubSubject} from '../../../../types/question.types';
import {useQuestionFilterStore} from '../../../stores/filter.store';
import {Collapsible} from '../../collapsible/collapsible';
import {FilterButtons} from '../filter-buttons';
import React from 'react';

export function FilterSubsubjectComponent() {
  const {selectSubSubjectId, selectedSubSubjectIds, selectedSubjectIds} =
    useQuestionFilterStore();
  const [subsubjectList, setSubsubjectList] = useState<
    Record<number, SubSubject[]>
  >({});
  useEffect(() => {
    const temp = {...subsubjectList};
    selectedSubjectIds.forEach(selectedSubjectId => {
      if (!temp[selectedSubjectId]) {
        temp[selectedSubjectId] = subSubjects.filter(
          item => item.subjectId === selectedSubjectId,
        );
      }
    });
    setSubsubjectList(temp);
  }, [selectedSubjectIds]);
  console.log('helllo', subsubjectList);
  return (
    <View>
      <Text style={{fontWeight: 'bold', color: COLORS.textPrimary}}>
        ALT KONU
      </Text>
      <View
        style={{
          gap: sizes.padding / 2,
          paddingVertical: sizes.padding,
        }}>
        {Object?.keys(subsubjectList)?.map(subjectId => {
          console.log(
            'emir deneme',
            subjectId,
            subjects.filter(item => item.id == subjectId),
          );
          return (
            <Collapsible
              header={
                <Text style={{color: COLORS.textPrimary}}>
                  {subjects.find(item => item.id == subjectId)?.label}
                </Text>
              }>
              <View
                style={{
                  flexDirection: 'row',
                  gap: sizes.padding / 2,
                  flexWrap: 'wrap',
                }}>
                {subsubjectList[subjectId].map(subsubject => {
                  const onPress = () => {
                    selectSubSubjectId(subsubject.id);
                  };
                  return (
                    <FilterButtons
                      key={`exam_type_${subsubject.id}`}
                      title={subsubject.label}
                      onPress={onPress}
                      isActive={selectedSubSubjectIds.some(
                        item => item === subsubject.id,
                      )}
                    />
                  );
                })}
              </View>
            </Collapsible>
          );
        })}
      </View>
    </View>
  );
}
