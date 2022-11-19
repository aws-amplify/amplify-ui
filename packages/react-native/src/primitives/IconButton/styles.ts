import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { IconButtonStyles } from './types';

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
