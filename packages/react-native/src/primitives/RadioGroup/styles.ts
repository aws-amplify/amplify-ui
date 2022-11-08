import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { RadioGroupStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): RadioGroupStyles => {
  const { components } = theme.tokens;

  return StyleSheet.create({
    label: {
      // The RadioGroup label inherits its styles from the Label primitive
      ...components?.radiogroup.label,
    },
  });
};
