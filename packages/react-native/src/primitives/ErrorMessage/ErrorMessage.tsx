import React from 'react';
import { Text, View } from 'react-native';
import { ErrorMessageProps } from './types';
import { styles } from './styles';

export default function Label({
  accessibilityRole = 'alert',
  children,
  // style,
  ...rest
}: ErrorMessageProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.errorIconContainer}>
        <Text>!</Text>
      </View>
      {/* ErrorIcon */}
      <View style={styles.textContainer}>
        <Text
          {...rest}
          accessibilityRole={accessibilityRole}
          style={styles.text}
        >
          {children}
        </Text>
      </View>
      {/* Dismiss IconButton */}
      <View style={styles.dismissButtonContainer}>
        <Text>X</Text>
      </View>
    </View>
  );
}
