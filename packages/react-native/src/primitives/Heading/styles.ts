import { StyleSheet, TextStyle } from 'react-native';
import { StrictTheme } from '../../theme';

import { getLineHeight } from '../../utils';
import { HeadingStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): HeadingStyles => {
  const { colors, components, fontSizes, fontWeights } = theme.tokens;

  return StyleSheet.create({
    text: {
      color: colors.font.primary,
      ...components?.heading.text,
    },
    1: {
      fontSize: fontSizes.xxxl,
      fontWeight: fontWeights.hairline as TextStyle['fontWeight'],
      lineHeight: getLineHeight(fontSizes.xxxl),
      ...components?.heading[1],
    },
    2: {
      fontSize: fontSizes.xxl,
      fontWeight: fontWeights.thin as TextStyle['fontWeight'],
      lineHeight: getLineHeight(fontSizes.xxl),
      ...components?.heading[2],
    },
    3: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.light as TextStyle['fontWeight'],
      lineHeight: getLineHeight(fontSizes.xl),
      ...components?.heading[3],
    },
    4: {
      fontSize: fontSizes.large,
      fontWeight: fontWeights.medium as TextStyle['fontWeight'],
      lineHeight: getLineHeight(fontSizes.large),
      ...components?.heading[4],
    },
    5: {
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.bold as TextStyle['fontWeight'],
      lineHeight: getLineHeight(fontSizes.medium),
      ...components?.heading[5],
    },
    6: {
      fontSize: fontSizes.small,
      fontWeight: fontWeights.black as TextStyle['fontWeight'],
      lineHeight: getLineHeight(fontSizes.small),
      ...components?.heading[6],
    },
  });
};
