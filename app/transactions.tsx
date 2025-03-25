import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock transaction data - in a real app, you would fetch this from your backend
const mockTransactions = [
  { id: '1', type: 'Airtime', amount: 100, phoneNumber: '+254712345678', date: '2023-10-15', status: 'Success' },
  { id: '2', type: 'Data', amount: 250, phoneNumber: '+254712345678', date: '2023-10-10', status: 'Success' },
  { id: '3', type: 'Airtime', amount: 50, phoneNumber: '+254787654321', date: '2023-10-05', status: 'Failed' },
  { id: '4', type: 'Data', amount: 500, phoneNumber: '+254712345678', date: '2023-09-28', status: 'Success' },
];

export default function TransactionsScreen() {
  const [transactions] = useState(mockTransactions);
  const borderColor = useThemeColor({ light: '#DDDDDD', dark: '#444444' }, 'background');
  const successColor = useThemeColor({ light: '#4CAF50', dark: '#81C784' }, 'text');
  const errorColor = useThemeColor({ light: '#F44336', dark: '#E57373' }, 'text');

  const renderItem = ({ item }: { item: typeof mockTransactions[0] }) => (
    <ThemedView style={[styles.transactionItem, { borderColor }]}>
      <ThemedView style={styles.transactionHeader}>
        <ThemedText type="defaultSemiBold">{item.type}</ThemedText>
        <ThemedText 
          style={{ 
            color: item.status === 'Success' ? successColor : errorColor 
          }}
        >
          {item.status}
        </ThemedText>
      </ThemedView>
      
      <ThemedText>Amount: KES {item.amount}</ThemedText>
      <ThemedText>Phone: {item.phoneNumber}</ThemedText>
      <ThemedText style={styles.date}>Date: {item.date}</ThemedText>
    </ThemedView>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Transaction History' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Transaction History</ThemedText>
        
        {transactions.length === 0 ? (
          <ThemedText style={styles.emptyText}>No transactions found</ThemedText>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  transactionItem: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
  },
});