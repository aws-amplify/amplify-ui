import React from 'react';
import { View } from 'react-native';

import { DefaultContainerProps } from './types';

import { styles } from './styles';

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
