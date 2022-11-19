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
    inputContainer: {
      alignItems: 'center',
      borderColor: colors.border.primary,
      borderRadius: radii.small,
      borderWidth: borderWidths.small,
      flexDirection: 'row',
      lineHeight: getLineHeight(fontSizes.medium),
      paddingHorizontal: space.xs,
      paddingVertical: space.small,
      ...components?.textField?.inputContainer,
    },
    input: {
      color: colors.font.primary,
      flexGrow: 1,
      fontSize: fontSizes.medium,
      // this is needed because of extra padding inside the input - in Android only
      ...(Platform.OS === 'android' && { padding: 0 }),
      ...components?.textField?.input,
    },
    label: {
      color: colors.font.secondary,
      paddingVertical: space.xs,
      lineHeight: getLineHeight(fontSizes.small),
      ...components?.textField?.label,
    },
  });
};
