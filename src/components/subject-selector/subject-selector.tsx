import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useScannerStore} from '../../stores/scanner.store';
import {getSubjectVisuals, subjects} from '../../../constants/lessons';
import {COLORS} from '../../../constants/colors';
export function SubjectSelector() {
  const navigation = useNavigation();
  const {selectedSubjectId} = useScannerStore();
  const selectedSubject = selectedSubjectId
    ? subjects.filter(item => item.subjectId === selectedSubjectId)[0]
    : null;
  const text = selectedSubject ? selectedSubject?.label : 'Select Subject';
  const {iconColor, Icon, bgColor} = getSubjectVisuals(selectedSubject?.value);
  return (
    <TouchableOpacity
      onPress={() => navigation.push('subject-selection')}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        borderRadius: 10,
        backgroundColor: bgColor ? bgColor : COLORS.inputBackground,
        width: '40%',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
      }}>
      <Icon color={iconColor} />
      <Text style={{color: iconColor, fontWeight: 'bold'}}>{text}</Text>
    </TouchableOpacity>
  );
}
