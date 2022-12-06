import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { CheckboxStyles } from './types';
import { getFlexDirectionFromLabelPosition } from '../Label/utils';
import { LabelPosition } from '../Label/types';

export const getThemedStyles = (
  theme: StrictTheme,
  labelPosition: LabelPosition
): CheckboxStyles => {
  const { tokens, components } = theme;
  const { opacities, space } = tokens;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: space.xs,
      flexDirection: getFlexDirectionFromLabelPosition(labelPosition),
      ...components?.checkbox?.container,
    },
    disabled: {
      opacity: opacities[60],
      ...components?.checkbox?.disabled,
    },
    icon: {
      ...components?.checkbox?.icon,
    },
    label: {
      ...components?.checkbox?.label,
    },
  });
};
