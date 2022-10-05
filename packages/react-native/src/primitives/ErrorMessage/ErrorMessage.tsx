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
  // style,
  ...rest
}: ErrorMessageProps): JSX.Element {
  const [dismissed, setDismissed] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.errorIconContainer}>
        <Icon source={icons.error} size={20} />
      </View>
      {/* ErrorIcon */}
      <View style={styles.textContainer}>
        <Text
          {...rest}
          accessibilityRole={accessibilityRole}
          style={styles.text}
        >
          {children}
          {dismissed ? 'dismissed' : 'not dismissed'}
        </Text>
      </View>
      {/* Dismiss IconButton */}
      <View style={styles.dismissButtonContainer}>
        <IconButton
          source={icons.close}
          size={20}
          onPress={() => setDismissed(!dismissed)}
        />
      </View>
    </View>
  );
}
