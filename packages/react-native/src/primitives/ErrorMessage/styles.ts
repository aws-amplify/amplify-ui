import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { ErrorMessageStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): ErrorMessageStyles => {
  const {
    tokens: { colors, space },
    components,
  } = theme;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.background.error,
      flexDirection: 'row',
      paddingHorizontal: space.xs,
      paddingVertical: space.xl,
      ...components?.errorMessage?.container,
    },
    icon: {
      margin: space.xs,
      ...components?.errorMessage?.icon,
    },
    label: {
      color: colors.font.error,
      flex: 1,
      paddingHorizontal: space.xs,
      ...components?.errorMessage?.label,
    },
  });
};
