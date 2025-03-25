import React, { useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { airtimeService } from '@/services/africasTalkingService';

export default function BuyAirtimeScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    amount: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { phoneNumber: '', amount: '' };

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid phone number';
      isValid = false;
    }

    if (!amount) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBuyAirtime = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await airtimeService.sendAirtime(
        phoneNumber,
        Number(amount)
      );
      console.log(response);
      Alert.alert(
        'Success',
        `Airtime of UGX ${amount} has been sent to ${phoneNumber}`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send airtime. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Buy Airtime' }} />
      <ScrollView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">Buy Airtime</ThemedText>
          <ThemedText style={styles.description}>
            Purchase airtime for any mobile network. Fast and secure.
          </ThemedText>

          <CustomInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="e.g. +254712345678"
            keyboardType="phone-pad"
            error={errors.phoneNumber}
            style={styles.input}
          />

          <CustomInput
            label="Amount (UGX)"
            value={amount}
            onChangeText={setAmount}
            placeholder="e.g. 100"
            keyboardType="numeric"
            error={errors.amount}
            style={styles.input}
          />

          <CustomButton
            title="Buy Airtime"
            onPress={handleBuyAirtime}
            loading={loading}
            disabled={loading}
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
  button: {
    marginTop: 10,
  },
});