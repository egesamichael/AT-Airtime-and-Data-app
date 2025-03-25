import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test Screen Works!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});