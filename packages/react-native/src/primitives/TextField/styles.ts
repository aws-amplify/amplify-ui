import { Platform, StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { getLineHeight } from '../../utils';
import { TextFieldStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): TextFieldStyles => {
  const { colors, components, fontSizes, opacities, space } = theme.tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      ...components?.textField.container,
    },
    inputContainer: {
      alignItems: 'center',
      borderColor: colors.black,
      borderRadius: space.xs,
      borderWidth: 1,
      flexDirection: 'row',
      lineHeight: getLineHeight(fontSizes.medium),
      padding: space.medium,
      width: '100%',
      ...components?.textField.inputContainer,
    },
    input: {
      flexGrow: 1,
      fontSize: fontSizes.medium,
      // this is needed because of extra padding inside the input - in Android only
      ...(Platform.OS === 'android' && { padding: 0 }),
      ...components?.textField.input,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.textField.disabled,
    },
  });
};
