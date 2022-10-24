import React from 'react';
import { Text, View } from 'react-native';

import { DividerProps } from './types';
import { styles } from './styles';

export default function Divider({
  children,
  labelStyle,
  lineStyle,
  style,
}: DividerProps): JSX.Element {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, lineStyle]} />
      {children ? (
        <>
          <Text style={[styles.label, labelStyle]}>{children}</Text>
          <View style={[styles.line, lineStyle]} />
        </>
      ) : null}
    </View>
  );
}
