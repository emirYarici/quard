import {StyleSheet} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {HANDLE_SIZE} from './resizable-box';
import React from 'react';
// The Handle component now uses GestureDetector
type HandleProps = {
  gesture: any;
  handleStyle?: object;
};
export const HandleComponent: React.FC<HandleProps> = ({
  gesture,
  handleStyle,
}) => {
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.handle, handleStyle]} />
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: HANDLE_SIZE / 2,
  },
});
