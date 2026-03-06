import { StyleSheet } from 'react-native';

import type { StrictTheme } from '../../theme';
import type { PhoneNumberFieldStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): PhoneNumberFieldStyles => {
  const { components } = theme;

  return StyleSheet.create({
    container: {
      ...components?.phoneNumberField?.container,
    },
    fieldContainer: {
      ...components?.phoneNumberField?.fieldContainer,
    },
    field: {
      ...components?.phoneNumberField?.field,
    },
    label: {
      ...components?.phoneNumberField?.label,
    },
  });
};
