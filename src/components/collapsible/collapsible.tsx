import {useState} from 'react';
import {View, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {SizeUtils} from '../../../utils/size-utils';
import {ChevronRight} from 'lucide-react-native';
import {COLORS} from '../../../constants/colors';

export const Collapsible = ({header, children}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const expanded = useSharedValue(0);

  const toggle = () => {
    expanded.value = expanded.value === 0 ? 1 : 0;
  };

  // Animate collapsible height
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(expanded.value * contentHeight, {duration: 300}),
  }));

  // Animate chevron rotation
  const chevronStyle = useAnimatedStyle(() => {
    const rotation = expanded.value * 90; // 0 -> 90 degrees
    return {
      transform: [{rotate: `${rotation}deg`}],
    };
  });

  return (
    <View
      style={{
        overflow: 'hidden',
        gap: SizeUtils.responsiveHeight(10),
        justifyContent: 'center',
      }}>
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={toggle}>
        {header}
        <Animated.View style={chevronStyle}>
          <ChevronRight
            size={SizeUtils.responsiveHeight(20)}
            color={COLORS.textPrimary}
          />
        </Animated.View>
      </Pressable>

      {/* Animated collapsible */}
      <Animated.View style={[animatedStyle, {overflow: 'hidden'}]}>
        <View
          onLayout={event => {
            if (contentHeight === 0) {
              setContentHeight(event.nativeEvent.layout.height);
            }
          }}>
          {children}
        </View>
      </Animated.View>

      {/* Hidden content to measure height on first render */}
      {contentHeight === 0 && (
        <View style={{position: 'absolute', opacity: 0}}>
          <View
            onLayout={event =>
              setContentHeight(event.nativeEvent.layout.height)
            }>
            {children}
          </View>
        </View>
      )}
    </View>
  );
};
