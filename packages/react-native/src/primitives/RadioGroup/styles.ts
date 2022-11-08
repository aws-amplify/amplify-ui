import { StyleSheet, TextStyle } from 'react-native';

import { StrictTheme } from '../../theme';
import { RadioGroupStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): RadioGroupStyles => {
  const { components, fontSizes, fontWeights, space } = theme.tokens;

  return StyleSheet.create({
    label: {
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.normal as TextStyle['fontWeight'],
      marginHorizontal: space.xs,
      marginVertical: space.xxs,
      ...components?.radiogroup.label,
    },
  });
};
