import { Platform, StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { getLineHeight } from '../../utils';
import { TextFieldStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): TextFieldStyles => {
  const {
    components,
    tokens: { colors, fontSizes, opacities, space, radii, borderWidths },
  } = theme;

  return StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      ...components?.textField?.container,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.textField?.disabled,
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
      // this is needed because of extra padding inside the input - in Android only
      ...(Platform.OS === 'android' && { padding: 0 }),
      ...components?.textField?.field,
    },
    label: {
      color: colors.font.secondary,
      lineHeight: getLineHeight(fontSizes.small),
      padding: space.xxs,
      ...components?.textField?.label,
    },
  });
};
