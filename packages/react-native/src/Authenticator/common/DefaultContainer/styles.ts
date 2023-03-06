import { StyleSheet, ViewStyle } from 'react-native';
import { StrictTheme } from '../../../theme';

import { ContainerStyles, InnerContainerStyles } from './types';

export const getThemedStyles = (
  { tokens: { colors } }: StrictTheme,
  insetPadding: Pick<
    ViewStyle,
    'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'paddingTop'
  >
): Required<ContainerStyles> => {
  return StyleSheet.create({
    keyboardAvoidingView: {
      alignContent: 'center',
      backgroundColor: colors.background.primary,
      justifyContent: 'center',
      flex: 1,
      // TDOO: add theme override
    },
    scrollViewContentContainer: {
      ...insetPadding,
      alignContent: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      // TDOO: add theme override
    },
    scrollView: {}, // TDOO: add theme override
  });
};

export const getInnerContainerStyles = ({
  tokens: { space },
}: StrictTheme): InnerContainerStyles =>
  StyleSheet.create({
    container: {
      marginHorizontal: space.medium,
      // TDOO: add theme override
    },
  });
