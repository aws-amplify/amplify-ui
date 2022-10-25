import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { DefaultContainerProps } from './types';

export default function DefaultContainer({
  children,
  ...rest
}: DefaultContainerProps): JSX.Element | null {
  return children ? (
    <View {...rest} style={styles.container}>
      {children}
    </View>
  ) : null;
}
