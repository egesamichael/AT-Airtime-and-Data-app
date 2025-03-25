import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false,
  loading = false
}) => {
  const backgroundColor = useThemeColor({ light: '#2196F3', dark: '#1976D2' }, 'tint');
  const textColor = useThemeColor({ light: '#FFFFFF', dark: '#FFFFFF' }, 'text');
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor }, 
        disabled && styles.disabled, 
        style
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;