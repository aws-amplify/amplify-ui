import { StyleSheet } from 'react-native';

import type { StrictTheme } from '../../theme';
import type { IconButtonStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): IconButtonStyles => {
  const {
    components,
    tokens: { opacities },
  } = theme;

  return StyleSheet.create({
    container: {
      ...components?.iconButton?.container,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.iconButton?.disabled,
    },
    pressed: {
      opacity: opacities[60],
      ...components?.iconButton?.pressed,
    },
  });
};
