import { capitalize } from '@aws-amplify/ui';

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

/**
 * We landed on this value for the ratio of the Radio dot to the Radio container
 * because it looks aesthetically proportional. Incidentally, this value is also
 * an approximation of the golden ratio conjugate.
 */
export const RADIO_DOT_PROPORTION = 0.6;

export const getRadioDimensions = (
  size: Size,
  styles: Required<RadioStyles>
): {
  radioContainerDimensions: RadioDimensions;
  radioDotDimensions: RadioDimensions;
} => {
  if (typeof size === 'number') {
    return {
      radioContainerDimensions: {
        height: size,
        width: size,
      },
      radioDotDimensions: {
        height: size * RADIO_DOT_PROPORTION,
        width: size * RADIO_DOT_PROPORTION,
      },
    };
  }

  const sizeKey = capitalize(size);
  return {
    radioContainerDimensions: styles[`radioContainer${sizeKey}`],
    radioDotDimensions: styles[`radioDot${sizeKey}`],
  };
};
