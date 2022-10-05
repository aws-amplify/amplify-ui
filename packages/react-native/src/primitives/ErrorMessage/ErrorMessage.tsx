import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { icons } from '../../assets';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

import { ErrorMessageProps } from './types';
import { styles } from './styles';

export default function Label({
  accessibilityRole = 'alert',
  children,
  onDismiss,
  style,
  textStyle,
  ...rest
}: ErrorMessageProps): JSX.Element | null {
  const [dismissed, setDismissed] = useState<boolean>(false);

  const dismissErrorMessage = React.useCallback(() => {
    setDismissed(!dismissed);

    if (typeof onDismiss === 'function') {
      onDismiss();
    }
  }, [dismissed, setDismissed, onDismiss]);

  return dismissed ? null : (
    <View
      {...rest}
      accessibilityRole={accessibilityRole}
      style={[styles.container, style]}
    >
      <View style={styles.iconContainer}>
        <Icon source={icons.error} size={20} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          source={icons.close}
          size={20}
          onPress={dismissErrorMessage}
        />
      </View>
    </View>
  );
}
