import {Text} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
export function PhotolenghtIndicator({photoLenght}: {photoLenght: number}) {
  const bouncePhotoLenghtIndicator = useSharedValue(0);
  const animatedPhotoLenghtStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          bouncePhotoLenghtIndicator.value,
          [0, 1],
          [0, -10],
        ),
      },
      {scale: interpolate(bouncePhotoLenghtIndicator.value, [0, 1], [1, 1.1])},
    ],
  }));

  useEffect(() => {
    if (photoLenght > 0) {
      bouncePhotoLenghtIndicator.value = withSequence(
        withTiming(1, {duration: 200}),
        withTiming(0, {duration: 400}),
      );
    }
  }, [photoLenght]);

  return (
    <Animated.View
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: 'orange',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        animatedPhotoLenghtStyle,
      ]}>
      <Text>{photoLenght}</Text>
    </Animated.View>
  );
}
