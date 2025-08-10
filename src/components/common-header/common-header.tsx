import {Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SizeUtils} from '../../../utils/size-utils';
import {X} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import {sizes} from '../../../constants/sizes';
export function CommonHeader({title}: {title: string}) {
  const navigation = useNavigation();
  const onPressHandler = () => {
    navigation.pop();
  };
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        padding: sizes.padding,
        paddingTop: insets.top + SizeUtils.responsiveHeight(10),
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        alignItems: 'center',
        gap: SizeUtils.responsiveWidth(10),
      }}>
      <View>
        <Pressable onPress={onPressHandler}>
          <X size={SizeUtils.responsiveWidth(14)} color={COLORS.textPrimary} />
        </Pressable>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', color: COLORS.primary}}>{title}</Text>
      </View>
    </View>
  );
}
