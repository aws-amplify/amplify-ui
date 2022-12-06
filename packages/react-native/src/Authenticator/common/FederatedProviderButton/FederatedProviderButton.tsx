import React from 'react';

import { Button, Icon, Label } from '../../../primitives';
import { usePressableOverrideStyle } from '../../../theme/hooks';

import { styles } from './styles';
import { FederatedProviderButtonProps } from './types';

export default function FederatedProviderButton({
  children,
  source,
  style,
  textStyle,
  ...rest
}: FederatedProviderButtonProps): JSX.Element {
  const pressableStyle = usePressableOverrideStyle({
    style,
    themedStyle: styles.container,
  });

  return (
    <Button {...rest} style={pressableStyle}>
      <Icon source={source} style={styles.icon} size={20} />
      <Label style={[styles.label, textStyle]}>{children}</Label>
    </Button>
  );
}
