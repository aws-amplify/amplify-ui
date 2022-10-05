import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ErrorMessageProps } from './types';
import { styles } from './styles';
import { Icon } from '../Icon';
import { icons } from '../../assets';
import { IconButton } from '../IconButton';

export default function Label({
  accessibilityRole = 'alert',
  children,
  onDismiss,
  style,
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
      <View style={styles.errorIconContainer}>
        <Icon source={icons.error} size={20} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={styles.dismissButtonContainer}>
        <IconButton
          source={icons.close}
          size={20}
          onPress={dismissErrorMessage}
        />
      </View>
    </View>
  );
}
