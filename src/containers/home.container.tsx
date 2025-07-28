import {Button, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HabitTracker} from '../components/tracker/tracker';
import {COLORS} from '../../constants/colors';
export function HomeContainer() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: COLORS.background,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('scanning-container')
        }></TouchableOpacity>
      <HabitTracker />
    </View>
  );
}
