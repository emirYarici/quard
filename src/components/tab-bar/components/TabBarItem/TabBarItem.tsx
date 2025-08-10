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
import {Path, Svg} from 'react-native-svg';
import stylez from './TabBarItem.styles';
import {BadgeQuestionMark, Camera, House, User} from 'lucide-react-native';
import React from 'react';
const icons = {
  home: props => (
    <Svg
      style={{width: props.size, height: props.size}}
      fill="none"
      viewBox="0 0 60 59">
      <Path
        fill={props.color}
        d="M.971 50.166c0 4.955 3.789 8.743 8.743 8.743h40.8c4.954 0 8.742-3.788 8.742-8.743V26.852H.971zM50.513 6.453h-5.828V3.538c0-1.748-1.166-2.914-2.914-2.914s-2.915 1.166-2.915 2.914v2.915H21.371V3.538c0-1.748-1.166-2.914-2.914-2.914s-2.915 1.166-2.915 2.914v2.915H9.714C4.76 6.453.97 10.24.97 15.195v5.829h58.285v-5.829c0-4.954-3.788-8.742-8.743-8.742"></Path>
    </Svg>
  ),
  profile: props => (
    <Svg
      style={{width: props.size, height: props.size}}
      fill="none"
      viewBox="0 0 58 59">
      <Path
        fill={props.color}
        fillRule="evenodd"
        d="M15.862 13.526c0-3.419 1.335-6.697 3.71-9.114A12.56 12.56 0 0 1 28.53.637c3.36 0 6.581 1.358 8.957 3.775a13 13 0 0 1 3.71 9.114c0 3.418-1.335 6.696-3.71 9.113a12.56 12.56 0 0 1-8.957 3.776c-3.36 0-6.581-1.358-8.957-3.776a13 13 0 0 1-3.71-9.113m0 19.333c-4.2 0-8.226 1.697-11.196 4.719A16.26 16.26 0 0 0 .03 48.97c0 2.564 1 5.023 2.782 6.835a9.42 9.42 0 0 0 6.718 2.832h38a9.42 9.42 0 0 0 6.717-2.832 9.75 9.75 0 0 0 2.783-6.835c0-4.273-1.668-8.37-4.638-11.392a15.7 15.7 0 0 0-11.195-4.72z"
        clipRule="evenodd"></Path>
    </Svg>
  ),
  stats: props => (
    <Svg
      style={{width: props.size, height: props.size}}
      fill="none"
      viewBox="0 0 72 55">
      <Path
        fill={props.color}
        d="M67.479 0h-7.1c-1.96 0-3.55 1.894-3.55 4.23v46.54c0 2.336 1.59 4.23 3.55 4.23h7.1c1.96 0 3.55-1.894 3.55-4.23V4.23c0-2.336-1.59-4.23-3.55-4.23M39.079 25.385h-7.1c-1.96 0-3.55 1.894-3.55 4.23V50.77c0 2.337 1.59 4.231 3.55 4.231h7.1c1.96 0 3.55-1.894 3.55-4.23V29.614c0-2.336-1.59-4.23-3.55-4.23M10.679 8.462h-7.1c-1.96 0-3.55 1.894-3.55 4.23V50.77c0 2.337 1.59 4.231 3.55 4.231h7.1c1.96 0 3.55-1.894 3.55-4.23V12.691c0-2.336-1.59-4.23-3.55-4.23"></Path>
    </Svg>
  ),
  save: props => <Camera color={props.color} size={props.size} />,
  quards: props => (
    <Svg
      style={{width: props.size, height: props.size}}
      fill="none"
      viewBox="0 0 73 59">
      <Path
        fill={props.color}
        d="M18.25 44.137q1.551 0 2.602-1.044t1.048-2.581-1.051-2.581-2.599-1.044q-1.55 0-2.599 1.044-1.047 1.044-1.051 2.58-.003 1.538 1.051 2.585 1.055 1.049 2.599 1.04M14.6 33.262h7.3V15.137h-7.3zm14.6 7.25h29.2v-7.25H29.2zm0-14.5h29.2v-7.25H29.2zM7.3 58.637q-3.01 0-5.154-2.128Q.004 54.38 0 51.387v-43.5q0-2.99 2.146-5.119Q4.293.641 7.3.637h58.4q3.011 0 5.157 2.131T73 7.887v43.5q0 2.99-2.143 5.122-2.142 2.13-5.157 2.128z"></Path>
    </Svg>
  ),
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
