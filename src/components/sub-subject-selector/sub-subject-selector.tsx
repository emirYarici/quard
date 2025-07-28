import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useScannerStore} from '../../stores/scanner.store';
import {subSubjects} from '../../../constants/lessons';
import {COLORS} from '../../../constants/colors';
export function SubSubjectSelector() {
  const navigation = useNavigation();
  const {selectedSubSubjectId} = useScannerStore();
  console.log('selectedSubSubjectId', selectedSubSubjectId);
  const text =
    selectedSubSubjectId !== -1
      ? subSubjects.filter(
          item => item.subSubjectId === selectedSubSubjectId,
        )[0]?.label
      : 'Select subSubject';
  return (
    <TouchableOpacity
      onPress={() => navigation.push('subSubject-selection')}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        borderRadius: 10,
        backgroundColor: COLORS.inputBackground,
        justifyContent: 'center',
        width: '40%',
        paddingLeft: 10,
      }}>
      <Text style={{color: COLORS.textPrimary, fontWeight: 'bold'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
