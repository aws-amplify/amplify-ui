import { Platform, StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { TextFieldStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): TextFieldStyles => {
  const {
    components,
    tokens: { colors, fontSizes, opacities, space, radii, borderWidths },
  } = theme;

  return StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      marginBottom: space.xs,
      ...components?.textField?.container,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.textField?.disabled,
    },
    error: {
      borderColor: colors.border.error,
    },
    fieldContainer: {
      alignItems: 'center',
      borderColor: colors.border.primary,
      borderRadius: radii.small,
      borderWidth: borderWidths.small,
      flexDirection: 'row',
      paddingHorizontal: space.xs,
      ...components?.textField?.fieldContainer,
    },
    field: {
      color: colors.font.primary,
      fontSize: fontSizes.medium,
      flexGrow: 1,
      paddingVertical: space.small,
      paddingHorizontal: space.xxs,
      // this is needed because of extra padding inside the input - in Android only
      ...(Platform.OS === 'android' && { padding: 0 }),
      ...components?.textField?.field,
    },
    label: {
      color: colors.font.secondary,
      paddingVertical: space.xs,
      ...components?.textField?.label,
    },
  });
};
