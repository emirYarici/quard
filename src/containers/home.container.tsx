import {Button, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
export function HomeContainer() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('scanning-container')}>
        <Text>Güzel soru</Text>
      </TouchableOpacity>
    </View>
  );
}
