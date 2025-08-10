import {Pressable, Text, View} from 'react-native';
import {Question} from '../../../types/question.types';
import {SizeUtils} from '../../../utils/size-utils';
import React from 'react';
import {Plus} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
export function NotesSection({question}: {question: Question}) {
  const navigation = useNavigation();
    const onAddNote = () => {
      navigation.push("")
  };
  
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: SizeUtils.responsiveFontSize(24),
          }}>
          Notes
        </Text>
        <Pressable onPress={}>
          <Plus />
        </Pressable>
      </View>

      {question.notes.map(note => (
        <View>
          <Text>{note}</Text>
        </View>
      ))}
    </View>
  );
}
