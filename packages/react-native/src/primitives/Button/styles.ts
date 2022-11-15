import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { ButtonStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): ButtonStyles => {
  const { components, opacities } = theme.tokens;

  return StyleSheet.create({
    pressed: { opacity: opacities[60], ...components?.button.pressed },
    text: { alignSelf: 'center', ...components?.button.text },
  });
};
