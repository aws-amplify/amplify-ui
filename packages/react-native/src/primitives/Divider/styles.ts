import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { DividerStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): DividerStyles => {
  const { tokens, components } = theme;
  const { colors, fontSizes, space } = tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      ...components?.divider?.container,
    },
    label: {
      fontSize: fontSizes.medium,
      margin: space.medium,
      textAlign: 'center',
      ...components?.divider?.label,
    },
    line: {
      backgroundColor: colors.black,
      flex: 1,
      height: StyleSheet.hairlineWidth,
      ...components?.divider?.line,
    },
  });
};
