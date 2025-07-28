// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// In App.js in a new project

import * as React from 'react';

import {HomeContainer} from '../containers/home.container';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '../components/tab-bar';
import ProfileContainer from '../containers/profile.container';

const BottomTabs = createBottomTabNavigator({});

export default function BottomTabsNavigation() {
  return (
    <BottomTabs.Navigator tabBar={props => <TabBar {...props} />}>
      <BottomTabs.Screen
        name={'home'}
        component={HomeContainer}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
        }}
      />
      <BottomTabs.Screen
        name={'profile'}
        component={ProfileContainer}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
        }}
      />
    </BottomTabs.Navigator>
  );
}
