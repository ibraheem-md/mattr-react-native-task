import * as React from 'react';
import LandingScreen from './landing_screen';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <LandingScreen/>
    </NavigationContainer>
       
  );
}

export default App;