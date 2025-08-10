import {Pressable, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import React from 'react';
import {sizes} from '../../../constants/sizes';
export function FilterButtons({
  isActive,
  title,
  onPress,
}: {
  isActive: boolean;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: isActive ? COLORS.primary : COLORS.inputBackground,
        borderRadius: 100,
        paddingHorizontal: sizes.padding,
        paddingVertical: sizes.padding / 2,
      }}>
      <Text style={{color: COLORS.textPrimary}}>{title}</Text>
    </Pressable>
  );
}
