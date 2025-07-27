import React from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
  runOnJS,
} from 'react-native-reanimated';
import {HandleComponent} from './handle';

export function ResizableBox({
  x,
  y,
  width,
  height,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
  width: SharedValue<number>;
  height: SharedValue<number>;
}) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const context = useSharedValue({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    startX: 0,
    startY: 0,
  });
  const log = event => {
    console.log(event.translationX);
  };
  // Pan gesture for moving the box
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
      };
    })
    .onUpdate(event => {
      x.value = context.value.x + event.translationX;
      y.value = context.value.y + event.translationY;
    });
  const panGestureLeftHandle = Gesture.Pan()
    .onStart(event => {
      context.value = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
        startX: event.absoluteX, // Save the starting X position
        startY: event.absoluteY, // Save the starting X position
      };
    })
    .onUpdate(event => {
      // Calculate the difference between current X and start X
      const deltaX = event.absoluteX - context.value.startX;
      const deltaY = event.absoluteY - context.value.startY;
      // Add the difference to the original width
      const newWidth = context.value.width - deltaX;
      const newHeight = context.value.height - deltaY;

      // Ensure minimum width
      if (newWidth >= 50) {
        width.value = newWidth;
        // Keep left side fixed
        x.value = context.value.x + deltaX;
      }

      // Ensure minimum width
      if (newHeight >= 30) {
        height.value = newHeight;
        // Keep left side fixed
        y.value = context.value.y + deltaY;
      }
    });

  const panGestureRightHandle = Gesture.Pan()
    .onStart(event => {
      context.value = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
        startX: event.absoluteX, // Save the starting X position
        startY: event.absoluteY, // Save the starting X position
      };
    })
    .onUpdate(event => {
      // Calculate the difference between current X and start X
      const deltaX = event.absoluteX - context.value.startX;
      const deltaY = event.absoluteY - context.value.startY;
      // Add the difference to the original width
      const newWidth = context.value.width + deltaX;
      const newHeight = context.value.height - deltaY;

      // Ensure minimum width
      if (newWidth >= 50) {
        width.value = newWidth;
        // Keep left side fixed
      }

      // Ensure minimum width
      if (newHeight >= 30) {
        height.value = newHeight;
        // Keep left side fixed
        y.value = context.value.y + deltaY;
      }
    });
  // Pinch gesture for scaling

  const panGestureLeftBottomHandle = Gesture.Pan()
    .onStart(event => {
      context.value = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
        startX: event.absoluteX, // Save the starting X position
        startY: event.absoluteY, // Save the starting X position
      };
    })
    .onUpdate(event => {
      // Calculate the difference between current X and start X
      const deltaX = event.absoluteX - context.value.startX;
      const deltaY = event.absoluteY - context.value.startY;
      // Add the difference to the original width
      const newWidth = context.value.width - deltaX;
      const newHeight = context.value.height + deltaY;

      // Ensure minimum width
      if (newWidth >= 50) {
        width.value = newWidth;
        // Keep left side fixed
        x.value = context.value.x + deltaX;
      }

      // Ensure minimum width
      if (newHeight >= 30) {
        height.value = newHeight;
        // Keep left side fixed
        // y.value = context.value.y + deltaY;
      }
    });

  const panGestureRightBottomHandle = Gesture.Pan()
    .onStart(event => {
      context.value = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
        startX: event.absoluteX, // Save the starting X position
        startY: event.absoluteY, // Save the starting X position
      };
    })
    .onUpdate(event => {
      // Calculate the difference between current X and start X
      const deltaX = event.absoluteX - context.value.startX;
      const deltaY = event.absoluteY - context.value.startY;
      // Add the difference to the original width
      const newWidth = context.value.width + deltaX;
      const newHeight = context.value.height + deltaY;

      // Ensure minimum width
      if (newWidth >= 50) {
        width.value = newWidth;
        // Keep left side fixed
        // x.value = context.value.x + deltaX;
      }

      // Ensure minimum width
      if (newHeight >= 30) {
        height.value = newHeight;
        // Keep left side fixed
        // y.value = context.value.y + deltaY;
      }
    });

  // Combine pan and pinch gestures
  const composed = Gesture.Exclusive(
    panGesture,
    panGestureLeftHandle,
    panGestureRightHandle,
    panGestureLeftBottomHandle,
    panGestureRightBottomHandle,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
      width: width.value,
      height: height.value,
    };
  });

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <HandleComponent
          gesture={panGestureLeftHandle}
          handleStyle={styles.handleTopLeft}
        />
        <HandleComponent
          gesture={panGestureRightHandle}
          handleStyle={styles.handleTopRight}
        />
        <HandleComponent
          gesture={panGestureLeftBottomHandle}
          handleStyle={styles.handleBottomLeft}
        />
        <HandleComponent
          gesture={panGestureRightBottomHandle}
          handleStyle={styles.handleBottomRight}
        />
      </Animated.View>
    </GestureDetector>
  );
}

export const HANDLE_SIZE = 24;

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 165, 0, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  handle: {
    position: 'absolute',
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: HANDLE_SIZE / 2,
  },
  handleTopLeft: {top: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2},
  handleTopRight: {top: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2},
  handleBottomLeft: {bottom: -HANDLE_SIZE / 2, left: -HANDLE_SIZE / 2},
  handleBottomRight: {bottom: -HANDLE_SIZE / 2, right: -HANDLE_SIZE / 2},
});
