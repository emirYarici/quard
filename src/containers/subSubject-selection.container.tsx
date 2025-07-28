import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {subSubjects} from '../../constants/lessons';
import React from 'react';
import {useScannerStore} from '../stores/scanner.store';
import {useNavigation} from '@react-navigation/native';

export default function SubSubjectSelectionContainer() {
  const {selectedSubjectId, selectSubSubjectId} = useScannerStore();
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, gap: 2, padding: 15}}>
          {subSubjects
            .filter(item => item.subjectId === selectedSubjectId)
            ?.map(subject => (
              <TouchableOpacity
                onPress={() => {
                  selectSubSubjectId(subject.subSubjectId);
                  navigation.goBack();
                }}
                style={{padding: 15, borderRadius: 10, backgroundColor: 'gray'}}
                key={subject.subjectId}>
                <Text>{subject.label}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </SafeAreaView>
    </View>
  );
}
