// In App.js in a new project

import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanningContainer from '../containers/scanning.container';
import {ScanResultContainer} from '../containers/scan-result.container';
import BottomTabsNavigation from './bottom.navigation';
import SubjectSelectionContainer from '../containers/subject-selection.container';
import SubSubjectSelectionContainer from '../containers/subSubject-selection.container';
import {DayDetailsContainer} from '../containers/day-detail.container';
import {QuestionDetailContainer} from '../containers/question-detail.container';
import {SolutionScanningContainer} from '../containers/solution-scanning-container';
import {QuestionFilterContainer} from '../containers/question-filter.container';
import {LoginContainer} from '../containers/login.container';

const RootStack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={'bottom-navigation'}
        component={BottomTabsNavigation}
        options={{
          headerShown: false,
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}
      />
      <RootStack.Screen
        name={'scanning-container'}
        component={ScanningContainer}
        options={{
          headerShown: false,
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'transparent'},
          animation: 'slide_from_right',
        }}
      />
      <RootStack.Screen
        name={'scan-result-container'}
        component={ScanResultContainer}
        options={{
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'transparent'},
          animation: 'slide_from_right',
        }}
      />
      <RootStack.Screen
        name={'subject-selection'}
        component={SubjectSelectionContainer}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={'subSubject-selection'}
        component={SubSubjectSelectionContainer}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={'day-detail-container'}
        component={DayDetailsContainer}
        options={{
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'transparent'},
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={'question-detail-container'}
        component={QuestionDetailContainer}
        options={{
          cardOverlayEnabled: true,
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          animation: 'slide_from_right',
        }}
      />
      <RootStack.Screen
        name={'solution-scanning-container'}
        component={SolutionScanningContainer}
        options={{
          cardOverlayEnabled: true,
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          animation: 'slide_from_right',
        }}
      />
      <RootStack.Screen
        name={'question-filter-container'}
        component={QuestionFilterContainer}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={'login-container'}
        component={LoginContainer}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
}
