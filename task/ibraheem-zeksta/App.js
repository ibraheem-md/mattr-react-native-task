import * as React from 'react';
import LandingScreen from './landing_screen';
import { NavigationContainer } from '@react-navigation/native';
import { HeartProvider } from './heart_context';

function App() {
  return (
    <HeartProvider>
    <NavigationContainer>
      <LandingScreen/>
    </NavigationContainer>
    </HeartProvider>
  );
}

export default App;