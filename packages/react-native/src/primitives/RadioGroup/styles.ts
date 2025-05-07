import { StyleSheet } from 'react-native';

import type { StrictTheme } from '../../theme';
import type { RadioGroupStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): RadioGroupStyles => {
  const { components } = theme;

  return StyleSheet.create({
    container: {
      ...components?.radioGroup?.container,
    },
    label: {
      /**
       * The RadioGroup label inherits its styles from the Label primitive,
       * and also supports customization via a Theme.
       */
      ...components?.radioGroup?.label,
    },
  });
};
