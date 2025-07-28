import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import stylez from './TabBarItem.styles';
import {House, User} from 'lucide-react-native';
const icons = {
  home: props => <House {...props} />,
  profile: props => <User {...props} />,
};
export const TabBarItem = memo(
  ({route, descriptors, index, isFocused, navigation}) => {
    const isSelected = useSharedValue(isFocused ? 1 : 0);

    useDerivedValue(() => {
      isSelected.value = withSpring(isFocused ? 1 : 0, {duration: 500});
    }, [isFocused]);

    const animatedTextStyles = useAnimatedStyle(
      () => ({
        opacity: isSelected.value,

        right: interpolate(isSelected.value, [0, 1], [0, 17]),
        color: interpolateColor(isSelected.value, [0, 1], ['gray', 'white']),
      }),
      [isSelected],
    );

    const animatedTabBarItemStyles = useAnimatedStyle(
      () => ({
        borderRadius: 18,
        backgroundColor: interpolateColor(
          isSelected.value,
          [0, 1],
          ['transparent', 'orange'],
        ),
        width: interpolate(isSelected.value, [0, 1], [50, 100]),
      }),
      [isSelected],
    );
    const {options} = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;
    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };
    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    const iconAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {translateX: interpolate(isSelected.value, [0, 1], [0, -25])},
      ],
    }));
    console.log('route', route);
    return (
      <Animated.View
        key={`${index}_bottom_tab`}
        style={[animatedTabBarItemStyles]}>
        <TouchableOpacity onPress={onPress} style={stylez.tabbarItem}>
          <Animated.View style={iconAnimatedStyle}>
            {icons[route.name]
              ? icons[route.name]({
                  color: isFocused ? 'white' : '#5c5c5c',
                  size: 24,
                })
              : null}
          </Animated.View>
          <Animated.Text
            style={[
              animatedTextStyles,
              {
                fontSize: 12,
                position: 'absolute',
                fontWeight: 'bold',
              },
            ]}>
            {label}
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

TabBarItem.displayName = 'TabBarItem';
