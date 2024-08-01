// landing screen
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Landing Screen of Mattr</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
