import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DataBundleProps {
  id: string;
  name: string;
  amount: number;
  validity: string;
  onSelect: (id: string, amount: number) => void;
  selected: boolean;
}

const DataBundleCard: React.FC<DataBundleProps> = ({ 
  id, 
  name, 
  amount, 
  validity, 
  onSelect,
  selected
}) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#DDDDDD', dark: '#444444' }, 'background');
  const accentColor = useThemeColor({}, 'tint');
  
  const handlePress = () => {
    // Call the onSelect function with the bundle id and amount
    onSelect(id, amount);
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          backgroundColor,
          borderColor: selected ? accentColor : borderColor,
          borderWidth: selected ? 2 : 1
        }
      ]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.name, { color: textColor }]}>{name}</Text>
        <Text style={[styles.validity, { color: textColor }]}>{validity}</Text>
      </View>
      <Text style={[styles.amount, { color: accentColor }]}>UGX {amount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  validity: {
    fontSize: 14,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DataBundleCard;