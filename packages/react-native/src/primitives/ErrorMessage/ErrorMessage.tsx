import React from 'react';
import { Text, View } from 'react-native';

import { icons } from '../../assets';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

import { ErrorMessageProps } from './types';
import { styles } from './styles';

export default function ErrorMessage({
  children,
  labelStyle,
  onDismiss,
  style,
  ...rest
}: ErrorMessageProps): JSX.Element {
  return (
    <View {...rest} accessibilityRole="alert" style={[styles.container, style]}>
      <Icon size={20} source={icons.error} style={styles.icon} />
      <Text style={[styles.label, labelStyle]}>{children}</Text>
      {onDismiss ? (
        <IconButton
          onPress={onDismiss}
          size={20}
          source={icons.close}
          style={styles.icon}
          testID="dismissButton"
        />
      ) : null}
    </View>
  );
}
