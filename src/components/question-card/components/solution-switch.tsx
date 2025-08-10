import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SizeUtils} from '../../../../utils/size-utils';
import {Check} from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../../../../constants/colors';
export function SolutionSwitch({haveSolution}: {haveSolution: boolean}) {
  const process = useSharedValue(0);
  const stylez = useAnimatedStyle(() => ({
    opacity: process.value,
  }));
  useEffect(() => {
    if (haveSolution) {
      process.value = withTiming(1, {duration: 400});
    }
  }, [haveSolution]);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: COLORS.secondarySurface,
        borderRadius: 100,
        padding: SizeUtils.responsiveHeight(3),
        flexDirection: 'row',
        gap: 2,
      }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderWidth: 1,
          borderColor: COLORS.primary,
          overflow: 'hidden',
          borderRadius: 100,
          width: SizeUtils.responsiveHeight(10),
          height: SizeUtils.responsiveHeight(10),
        }}>
        <Animated.View
          style={[
            stylez,
            {
              backgroundColor: COLORS.primary,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Check size={7} color={COLORS.background} />
        </Animated.View>
      </View>
      <Text
        style={{
          fontSize: SizeUtils.responsiveFontSize(20),
          color: COLORS.muted,
        }}>
        SOLUTIONS
      </Text>
    </View>
  );
}
