// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// In App.js in a new project

import * as React from 'react';

import {HomeContainer} from '../containers/home.container';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '../components/tab-bar';
import ProfileContainer from '../containers/profile.container';
import QuestionsContainer from '../containers/questions.container';
import {StatisticsContainer} from '../containers/statistics.container';
import ScanningContainer from '../containers/scanning.container';
import {LoginContainer} from '../containers/login.container';
import {SignupContainer} from '../containers/sign-up-container';
import {OnboardingStagger} from '../components/onboarding-stagger/onboarding-stagger';
import {OnboardingContainer} from '../containers/onboarding.container';

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
        name={'quards'}
        component={QuestionsContainer}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
        }}
      />
      <BottomTabs.Screen
        name={'save'}
        component={ScanningContainer}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
        }}
      />
      <BottomTabs.Screen
        name={'stats'}
        component={StatisticsContainer}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
        }}
      />
      <BottomTabs.Screen
        name={'profile'}
        component={OnboardingContainer}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
        }}
      />
    </BottomTabs.Navigator>
  );
}
