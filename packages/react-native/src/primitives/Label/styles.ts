import { StyleSheet, TextStyle } from 'react-native';

import { StrictTheme } from '../../theme';
import { LabelStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): LabelStyles => {
  const { colors, fontSizes, fontWeights, space, components } = theme.tokens;

  return StyleSheet.create({
    text: {
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.normal as TextStyle['fontWeight'],
      marginVertical: space.xxs,
      marginHorizontal: space.xs,
      ...components?.label.text,
    },
    primary: {
      color: colors.font.primary,
      ...components?.label.primary,
    },
    secondary: {
      color: colors.font.secondary,
      ...components?.label.secondary,
    },
    tertiary: {
      color: colors.font.tertiary,
      ...components?.label.tertiary,
    },
    error: {
      color: colors.font.error,
      ...components?.label.error,
    },
    warning: {
      color: colors.font.warning,
      ...components?.label.warning,
    },
    success: {
      color: colors.font.success,
      ...components?.label.success,
    },
    info: {
      color: colors.font.info,
      ...components?.label.info,
    },
  });
};
