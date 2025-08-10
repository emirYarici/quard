import {X} from 'lucide-react-native';
import {Pressable, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {sizes} from '../../../constants/sizes';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
export function QuestionFilterHeader() {
  const navigation = useNavigation();
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: COLORS.primary,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: sizes.padding,
        paddingVertical: sizes.padding,
      }}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontWeight: 'bold',
          color: COLORS.textPrimary,
        }}>
        Filters
      </Text>
      <Pressable onPress={() => navigation.pop()}>
        <X />
      </Pressable>
    </View>
  );
}
