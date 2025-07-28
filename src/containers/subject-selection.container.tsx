import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {getSubjectVisuals, subjects} from '../../constants/lessons';
import React from 'react';
import {useScannerStore} from '../stores/scanner.store';
import {useNavigation} from '@react-navigation/native';
import {
  Atom,
  Book,
  Brain,
  Code2,
  FlaskConical,
  Globe,
  Landmark,
  Languages,
  LucideIcon,
  Music,
  PenLine,
  Sigma,
} from 'lucide-react-native';
import {COLORS} from '../../constants/colors';

export default function SubjectSelectionContainer() {
  const {selectSubjectId} = useScannerStore();
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          {subjects?.map(subject => {
            const {Icon, iconColor, bgColor} = getSubjectVisuals(subject.value);

            return (
              <TouchableOpacity
                onPress={() => {
                  selectSubjectId(subject.subjectId);
                  navigation.goBack();
                }}
                style={{
                  width: '47%',
                  aspectRatio: 1, // Makes square items
                  marginBottom: 10,
                  borderRadius: 10,
                  backgroundColor: bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={subject.subjectId}>
                <Icon size={32} color={iconColor} />
                <Text>{subject.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
