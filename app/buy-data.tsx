import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import DataBundleCard from '@/components/DataBundleCard';
import { dataService } from '@/services/africasTalkingService';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DataBundle {
  id: string;
  name: string;
  amount: number;
  validity: string;
}

export default function BuyDataScreen() {
  const router = useRouter();
  const textColor = useThemeColor({}, 'text');
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [dataBundles, setDataBundles] = useState<DataBundle[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBundles, setFetchingBundles] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDataBundles = async () => {
      try {
        const bundles = await dataService.getDataBundles();
        setDataBundles(bundles);
      } catch (error) {
        console.error('Error fetching data bundles:', error);
        Alert.alert('Error', 'Failed to fetch data bundles');
      } finally {
        setFetchingBundles(false);
      }
    };

    fetchDataBundles();
  }, []);

  const handleSelectBundle = (id: string, amount: number) => {
    setSelectedBundle(id);
    setSelectedAmount(amount);
  };

  const validateForm = () => {
    if (!phoneNumber) {
      setError('Phone number is required');
      return false;
    } else if (!/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
      setError('Enter a valid phone number');
      return false;
    }

    if (!selectedBundle) {
      Alert.alert('Error', 'Please select a data bundle');
      return false;
    }

    setError('');
    return true;
  };

  const handleBuyData = async () => {
    if (!validateForm() || !selectedBundle || !selectedAmount) return;

    setLoading(true);
    try {
      console.log('Purchasing data bundle:', {
        phoneNumber,
        bundleId: selectedBundle,
        amount: selectedAmount
      });
      
      const response = await dataService.purchaseData(
        phoneNumber,
        selectedBundle,
        selectedAmount
      );

      console.log('Purchase response:', response);
      
      Alert.alert(
        'Success',
        `Data bundle request submitted for ${phoneNumber}. You'll receive a confirmation shortly.`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      let errorMessage = 'Failed to purchase data bundle. Please try again.';
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = `Error: ${error.response.data.message}`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      Alert.alert('Error', errorMessage);
      console.error('Detailed error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Buy Data' }} />
      <ScrollView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">Buy Data Bundle</ThemedText>
          <ThemedText style={styles.description}>
            Purchase data bundles for any mobile network. Fast and secure.
          </ThemedText>

          <CustomInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="e.g. +254712345678"
            keyboardType="phone-pad"
            error={error}
            style={styles.input}
          />

          <ThemedText type="subtitle" style={styles.bundlesTitle}>
            Select a Data Bundle
          </ThemedText>

          {fetchingBundles ? (
            <ActivityIndicator size="large" color={textColor} style={styles.loader} />
          ) : (
            <>
              {dataBundles.map((bundle) => (
                <DataBundleCard
                  key={bundle.id}
                  id={bundle.id}
                  name={bundle.name}
                  amount={bundle.amount}
                  validity={bundle.validity}
                  onSelect={handleSelectBundle}
                  selected={selectedBundle === bundle.id}
                />
              ))}
            </>
          )}

          <CustomButton
            title="Buy Data Bundle"
            onPress={handleBuyData}
            loading={loading}
            disabled={loading || !selectedBundle}
            style={styles.button}
          />
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  description: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 15,
  },
  bundlesTitle: {
    marginTop: 10,
    marginBottom: 15,
  },
  loader: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
  },
});