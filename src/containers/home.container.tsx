import {Button, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HabitTracker} from '../components/tracker/tracker';
import {COLORS} from '../../constants/colors';
import {sizes} from '../../constants/sizes';
export function HomeContainer() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: sizes.padding,
        backgroundColor: COLORS.background,
      }}>
      <HabitTracker />
    </View>
  );
}
