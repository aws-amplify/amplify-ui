import React, { useCallback } from 'react';
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

import { Button, Icon, Label } from '../../../primitives';

import { styles } from './styles';
import { FederatedProviderButtonProps } from './types';

export default function FederatedProviderButton({
  children,
  source,
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
    <Button {...rest} style={containerStyle}>
      {source ? <Icon source={source} style={styles.icon} size={20} /> : null}
      <Label style={[styles.label, textStyle]}>{children}</Label>
    </Button>
  );
}
