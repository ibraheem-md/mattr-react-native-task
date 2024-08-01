// other's profile
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OtherProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OtherProfile Screen of Mattr</Text>
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

export default OtherProfileScreen;
