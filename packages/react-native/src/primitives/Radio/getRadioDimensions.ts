import { capitalize } from '../../utils';

import { RadioDimensions, RadioStyles, Size } from './types';

/**
 * These utility functions are used to apply styles to
 * the two nested View's comprising the Radio:
 *   - The outer <View> is named 'radioContainer'
 *   - The inner <View> is named 'radioDot'
 *
 * If a customer passes a number to the `size` prop, then we simply calculate the dimensions
 * for both the 'radioContainer' and 'radioDot' based on that number.
 *
 * If a customer passes a string ('small' | 'medium' | 'large') to the `size` prop,
 * then we return the respective dimensions as defined in the `styles` object
 * (e.g., 'small' => { radioContainerSmall, radioDotSmall } )
 */

export const getRadioDimensions = (
  size: Size,
  styles: RadioStyles
): {
  radioContainerSize: RadioDimensions;
  radioDotSize: RadioDimensions;
} => {
  if (typeof size === 'number') {
    return {
      radioContainerSize: { height: size, width: size },
      radioDotSize: { height: size * 0.5, width: size * 0.5 },
    };
  }

  const sizeKey = capitalize(size);
  return {
    radioContainerSize: styles[`radioContainer${sizeKey}`],
    radioDotSize: styles[`radioDot${sizeKey}`],
  };
};
