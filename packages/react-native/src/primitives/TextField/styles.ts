import { Platform, StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { getLineHeight } from '../../utils';
import { TextFieldStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): TextFieldStyles => {
  const {
    components,
    tokens: { colors, fontSizes, opacities, space, radii },
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
      borderColor: colors.black,
      borderRadius: radii.small,
      borderWidth: 1,
      flexDirection: 'row',
      lineHeight: getLineHeight(fontSizes.medium),
      padding: space.medium,
      ...components?.textField?.fieldContainer,
    },
    field: {
      flexGrow: 1,
      fontSize: fontSizes.medium,
      // this is needed because of extra padding inside the input - in Android only
      ...(Platform.OS === 'android' && { padding: 0 }),
      ...components?.textField?.field,
    },
    label: {
      fontSize: fontSizes.small,
      lineHeight: getLineHeight(fontSizes.small),
      ...components?.textField?.label,
    },
  });
};
