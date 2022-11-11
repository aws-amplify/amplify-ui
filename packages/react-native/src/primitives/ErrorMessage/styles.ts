import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { ErrorMessageStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): ErrorMessageStyles => {
  const { colors, components, space } = theme.tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.background.error,
      flexDirection: 'row',
      paddingHorizontal: space.xs,
      paddingVertical: space.xl,
      width: '100%',
      ...components?.errormessage.container,
    },
    icon: {
      margin: space.xs,
      ...components?.errormessage.icon,
    },
    label: {
      color: colors.font.error,
      flex: 1,
      paddingHorizontal: space.xs,
      ...components?.errormessage.label,
    },
  });
};
