import React from 'react';
import { View } from 'react-native';

import { DividerProps } from './types';
import { styles } from './styles';
import { Label } from '../Label';

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
          <Label style={[styles.label, labelStyle]}>{children}</Label>
          <View style={[styles.line, lineStyle]} />
        </>
      ) : null}
    </View>
  );
}
