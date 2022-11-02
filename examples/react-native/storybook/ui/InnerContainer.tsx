import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

interface InnerContainerProps {
  children: React.ReactNode;
}

export const InnerContainer = ({ children }: InnerContainerProps) => {
  return <SafeAreaView style={[styles.container]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    width: '100%',
  },
});
