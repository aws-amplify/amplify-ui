import React from 'react';
import { View } from 'react-native';

import { useTheme } from '../../../theme';
import { getInnerContainerStyles } from './styles';
import type { ContainerProps } from './types';

export default function InnerContainer({
  children,
  ...rest
}: ContainerProps): React.JSX.Element | null {
  const theme = useTheme();

  const themedStyle = getInnerContainerStyles(theme);
  return (
    <View {...rest} style={themedStyle.container}>
      {children}
    </View>
  );
}
