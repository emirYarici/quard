import {Gesture, GestureDetector, Text} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import React from 'react';
import {View} from 'react-native';
export function LongPressButton() {
  const process = useSharedValue(0);
  const maxwidth = useSharedValue(0);
  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      process.value = withTiming(1, {duration: 1000}, () => {
        process.value = 0;
      });
      console.log(`press start`);
    })
    .onEnd((e, success) => {
      if (success) {
        console.log(`Long pressed for ${e.duration} ms!`);
        return;
      }
      process.value = 0;
    })
    .minDuration(1000);
  const animatedStyle = useAnimatedStyle(() => {
    console.log('alalalala', maxwidth);
    return {
      width: interpolate(process.value, [0, 1], [0, maxwidth.value]),
      backgroundColor: interpolateColor(
        process.value,
        [0, 1],
        ['orange', 'green'],
      ),
      opacity: interpolate(process.value, [0, 1], [0.5, 0.7]),
    };
  });
  return (
    <GestureDetector gesture={longPressGesture}>
      <View
        ref={_ref => {
          _ref?.measure((x, y, width, height) => {
            maxwidth.value = width;
          });
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'orange',
        }}>
        <Animated.View
          style={[
            animatedStyle,
            {
              margin: 2,
              position: 'absolute',
              borderRadius: 10,
              opacity: 0.5,
              flex: 1,
            },
          ]}
        />
        <Text>Devam etmek için için basili tut</Text>
      </View>
    </GestureDetector>
  );
}
