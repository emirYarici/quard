import {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
export function CaptureButton({onTakePhotoPressed}) {
  const scale = useSharedValue(1);
  // Start the pulsating animation when the component mounts
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, {duration: 1000}),
        withTiming(1.0, {duration: 1000}),
      ),
      -1, // infinite
      true, // reverse
    );
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: scale.value * 0.6,
  }));
  return (
    <TouchableOpacity
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onTakePhotoPressed}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          height: '100%',
          borderColor: 'white',
          borderRadius: 200,
          borderWidth: 1,
          alignSelf: 'center',
          position: 'absolute',
        }}
      />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '80%',
          height: '80%',
          backgroundColor: 'white',
          borderRadius: 100,
        }}
      />
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: '80%',
            height: '80%',
            alignSelf: 'center',
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: 100,
          },
          animatedStyle,
        ]}
      />
    </TouchableOpacity>
  );
}
