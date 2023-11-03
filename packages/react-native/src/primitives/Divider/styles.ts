import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { DividerStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): DividerStyles => {
  const { tokens, components } = theme;
  const { colors, fontSizes, space, borderWidths } = tokens;

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
      color: colors.font.tertiary,
      ...components?.divider?.label,
    },
    line: {
      backgroundColor: colors.border.secondary,
      flex: 1,
      height: borderWidths.small,
      ...components?.divider?.line,
    },
  });
};
