import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen options={{ title: 'SwiftLoad', headerShown: true }} />
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <HelloWave />
          <ThemedText type="title" style={styles.title}>Welcome to SwiftLoad</ThemedText>
        </View>
        
        <ThemedText style={styles.description}>
          Your one-stop solution for mobile airtime and data purchases
        </ThemedText>
        
        <View style={styles.linksContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/buy-airtime')}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Buy Airtime</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/buy-data')}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Buy Data</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/transactions')}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>View Transactions</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginLeft: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
  },
  linksContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  }
});