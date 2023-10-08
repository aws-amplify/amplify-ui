import React from 'react';

import { Button, Icon, Label } from '../../../primitives';
import { usePressableContainerStyles } from '../../../hooks';
import { useTheme } from '../../../theme';

import { getThemedStyles } from './styles';
import { FederatedProviderButtonProps } from './types';

export default function FederatedProviderButton({
  children,
  source,
  style,
  textStyle,
  ...rest
}: FederatedProviderButtonProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const pressableStyle = usePressableContainerStyles({
    containerStyle: themedStyle.container,
    overrideStyle: style,
  });

  return (
    <Button {...rest} style={pressableStyle}>
      <Icon source={source} style={themedStyle.icon} size={20} />
      <Label style={[themedStyle.label, textStyle]}>{children}</Label>
    </Button>
  );
}
