import {Text, TouchableOpacity, View} from 'react-native';
import {subSubjects} from '../../constants/lessons';
import React from 'react';
import {useScannerStore} from '../stores/scanner.store';
import {useNavigation} from '@react-navigation/native';
import {CommonHeader} from '../components/common-header/common-header';
import {COLORS} from '../../constants/colors';

export default function SubSubjectSelectionContainer() {
  const {selectedSubjectId, selectSubSubjectId} = useScannerStore();
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <CommonHeader title={'Alt Konu'} />
      <View style={{flex: 1, gap: 2, padding: 15}}>
        {subSubjects
          .filter(item => item.subjectId === selectedSubjectId)
          ?.map(subsubject => (
            <TouchableOpacity
              onPress={() => {
                selectSubSubjectId(subsubject.id);
                navigation.goBack();
              }}
              style={{
                padding: 15,
                borderRadius: 10,
                backgroundColor: COLORS.surface,
              }}
              key={subsubject.subjectId}>
              <Text style={{color: COLORS.textPrimary}}>
                {subsubject.label}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}
