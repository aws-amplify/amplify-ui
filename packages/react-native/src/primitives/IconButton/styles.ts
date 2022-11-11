import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { IconButtonStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): IconButtonStyles => {
  const { components, opacities } = theme.tokens;

  return StyleSheet.create({
    pressed: { opacity: opacities[60], ...components?.iconbutton.pressed },
  });
};
