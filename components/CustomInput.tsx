import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  error?: string;
  style?: object;
}

const CustomInput: React.FC<InputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = 'default',
  secureTextEntry = false,
  error,
  style
}) => {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const borderColor = useThemeColor({ light: '#DDDDDD', dark: '#444444' }, 'background');
  
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input, 
          { 
            color: textColor,
            backgroundColor,
            borderColor: error ? 'red' : borderColor
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;