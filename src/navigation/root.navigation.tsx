// In App.js in a new project

import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanningContainer from '../containers/scanning.container';
import {ScanResultContainer} from '../containers/scan-result.container';
import BottomTabsNavigation from './bottom.navigation';

const ScannerStack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen
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
      <ScannerStack.Screen
        name={'scanning-container'}
        component={ScanningContainer}
        options={{
          headerShown: false,
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}
      />
      <ScannerStack.Screen
        name={'scan-result-container'}
        component={ScanResultContainer}
        options={{
          cardOverlayEnabled: true,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}
      />
    </ScannerStack.Navigator>
  );
}
