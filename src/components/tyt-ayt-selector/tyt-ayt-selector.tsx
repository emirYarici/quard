import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {useScannerStore} from '../../stores/scanner.store';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../../../constants/colors';
import {sizes} from '../../../constants/sizes';
import {SizeUtils} from '../../../utils/size-utils';
export function TytAytSelector() {
  const {isTyt, setTyt, setAyt} = useScannerStore();
  const tytAytSharedValue = useSharedValue(isTyt ? 0 : 1);
  const animatedTytTabStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      tytAytSharedValue.value,
      [0, 1],
      [COLORS.primary, COLORS.inputBackground],
    ),
    // transform: [
    //   {scale: interpolate(tytAytSharedValue.value, [0, 1], [1.05, 1])},
    // ],
  }));
  const animatedAytTabStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      tytAytSharedValue.value,
      [0, 1],
      [COLORS.inputBackground, COLORS.primary],
    ),
    // transform: [
    //   {scale: interpolate(tytAytSharedValue.value, [0, 1], [1, 1.05])},
    // ],
  }));
  const _setTyt = () => {
    console.log('alooooooo');
    tytAytSharedValue.value = withTiming(0, {duration: 200}, () => {
      runOnJS(setTyt)();
    });
  };
  const _setAyt = () => {
    tytAytSharedValue.value = withTiming(1, {duration: 200}, () => {
      runOnJS(setAyt)();
    });
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: SizeUtils.responsiveHeight(30),
        gap: sizes.padding,
      }}>
      <Animated.View
        style={[{flex: 1, borderRadius: sizes.radius}, animatedTytTabStyle]}>
        <Pressable
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={_setTyt}>
          <Text style={{color: COLORS.textPrimary, fontWeight: 'bold'}}>
            TYT
          </Text>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          {
            flex: 1,
            borderRadius: sizes.radius,
          },
          animatedAytTabStyle,
        ]}>
        <Pressable
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={_setAyt}>
          <Text style={{color: COLORS.textPrimary, fontWeight: 'bold'}}>
            AYT
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
