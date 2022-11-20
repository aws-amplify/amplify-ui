import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { DividerStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): DividerStyles => {
  const { colors, fontSizes, space } = theme.tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    label: {
      fontSize: fontSizes.medium,
      margin: space.medium,
      textAlign: 'center',
    },
    line: {
      backgroundColor: colors.black,
      flex: 1,
      height: StyleSheet.hairlineWidth,
    },
  });
};
