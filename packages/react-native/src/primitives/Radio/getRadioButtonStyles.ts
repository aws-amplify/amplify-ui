/**
 * Expain the utility of this function
 */

import { RadioSize, Sizes } from './types';
import { styles } from './styles';

type RadioButtonLevel = 'radioButton' | 'radioButtonContainer';

const getRadioButtonDimensions = (level: RadioButtonLevel, size: number) => {
  const adjustedSize = level === 'radioButton' ? Math.floor(size / 2) : size;

  return {
    height: adjustedSize,
    width: adjustedSize,
    ...(level === 'radioButtonContainer' && {
      borderWidth: adjustedSize * 0.1,
    }),
  };
};

export const getRadioButtonStyles = (
  level: RadioButtonLevel,
  size: number | Sizes
): RadioSize => {
  if (typeof size !== 'number') {
    if (level === 'radioButtonContainer') {
      return styles[size];
    }
    return getRadioButtonDimensions(level, styles[size].height);
  }

  return getRadioButtonDimensions(level, size);
};
