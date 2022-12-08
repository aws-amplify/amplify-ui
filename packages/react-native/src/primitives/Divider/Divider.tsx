import React from 'react';
import { View } from 'react-native';

import { useTheme } from '../../theme';
import { Label } from '../Label';
import { getThemedStyles } from './styles';
import { DividerProps } from './types';

export const DIVIDER_LINE_TEST_ID = 'amplify__divider__line';

export default function Divider({
  children,
  labelStyle,
  lineStyle,
  style,
}: DividerProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  return (
    <View style={[themedStyle.container, style]}>
      <View
        style={[themedStyle.line, lineStyle]}
        testID={DIVIDER_LINE_TEST_ID}
      />
      {children ? (
        <>
          <Label style={[themedStyle.label, labelStyle]}>{children}</Label>
          <View style={[themedStyle.line, lineStyle]} />
        </>
      ) : null}
    </View>
  );
}
