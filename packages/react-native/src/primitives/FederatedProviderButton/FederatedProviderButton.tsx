import React, { useCallback } from 'react';
import {
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { Button, Label } from '..';

import { styles } from './styles';
import { FederatedProviderButtonProps } from './types';

export default function FederatedProviderButton({
  children,
  Icon,
  onPress,
  style,
  textStyle,
  ...rest
}: FederatedProviderButtonProps): JSX.Element {
  const containerStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        typeof style === 'function' ? style({ pressed }) : style;
      return [styles.container, pressedStateStyle];
    },
    [style]
  );

  return (
    <Button {...rest} onPress={onPress} style={containerStyle}>
      <View style={styles.icon}>{Icon}</View>
      <Label style={[styles.label, textStyle]}>{children}</Label>
    </Button>
  );
}
