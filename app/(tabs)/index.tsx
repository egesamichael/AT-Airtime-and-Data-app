import { Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/CustomButton';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({ light: '#A1CEDC', dark: '#1D3D47' }, 'background');
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">SwiftLoad</ThemedText>
        <ThemedText>Buy Airtime & Data Bundles</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Airtime</ThemedText>
          <ThemedText>Purchase airtime for any network. Fast and secure.</ThemedText>
          <TouchableOpacity onPress={() => router.push('/buy-airtime')}>
            <CustomButton title="Buy Airtime" onPress={() => {}} />
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Data Bundles</ThemedText>
          <ThemedText>Get the best data bundle deals for your internet needs.</ThemedText>
          <TouchableOpacity onPress={() => router.push('/buy-data')}>
            <CustomButton title="Buy Data" onPress={() => {}} />
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Transaction History</ThemedText>
          <ThemedText>View your past transactions and receipts.</ThemedText>
          <TouchableOpacity onPress={() => router.push('/transactions')}>
            <CustomButton title="View History" onPress={() => {}} />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    right: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
