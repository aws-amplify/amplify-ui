/**
 * These utility functions are used to apply styles to
 * the two nested View's comprising the Radio button:
 *   - The outer <View> is named 'radioButtonContainer'
 *   - The inner <View> is named 'radioButton'
 *
 * Additionally, since the `size` prop can be a number or a string union of
 * 'small' | 'medium' | 'large', there are a few conditions to account for:
 *
 * If a customer passes a string ('small' | 'medium' | 'large') to the `size` prop,
 * then we return the respective dimensions as defined in the `styles` object for the 'radioButtonContainer',
 * and calculate the dimensions of the inner 'radioButton' based on the outer 'radioButtonContainer' size.
 *
 * If a customer passes a number to the `size` prop, then we simply calculate the dimensions
 * for both the 'radioButton' and 'radioButtonContainer' based on that number.
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
