import React from 'react';
import {View} from 'react-native';
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TabBarItem} from './components';
import stylez from './Tabbar.styles';
export const TabBar = ({state, descriptors, navigation}) => {
  const leftValue = useSharedValue(0);

  useDerivedValue(() => {
    leftValue.value = withTiming(state.index * 12, {duration: 500});
  }, [state.index]);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: leftValue.value}],
  }));
  return (
    <View style={stylez.tabbar}>
      {state.routes.map((route, index) => {
        if (['_sitemap', '+not-found'].includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        return (
          <TabBarItem
            key={`${index}_bottomTab`}
            route={route}
            descriptors={descriptors}
            index={index}
            isFocused={isFocused}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};
