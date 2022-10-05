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
      {/* Icon 1 */}
      <Text
        {...rest}
        accessibilityRole={accessibilityRole}
        // style={[styles.label, style]}
      >
        {children}
      </Text>
      {/* Icon 2 */}
    </View>
  );
}
