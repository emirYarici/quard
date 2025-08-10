import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import RootNavigation from './src/navigation/root.navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
