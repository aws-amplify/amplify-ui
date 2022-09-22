/*

Input: 
- Integer or string ('small' | 'medium' | 'large' )
- 'inner' or 'outer'

Output: 
- Depending on 'inner' or 'outer'

{
  height: integer,
  width: integer,
  borderRadius: integer,
  // maybe these too?
  borderWidth: 2,
  padding: 4,
}

*/

import { ViewStyle } from 'react-native';
import { RadioSize, Sizes } from './types';
import { styles } from './styles';

interface GetRadioStylesProps {
  size: number | Sizes;
  level: 'inner' | 'outer'; // not sure about this naming
}

// inner does not support these props
type Outer = {
  borderWidth?: ViewStyle['borderWidth'];
  padding?: ViewStyle['padding'];
};

export const getRadioStyles = ({
  size,
  level,
}: GetRadioStylesProps): RadioSize & Outer => {
  if (typeof size === 'number') {
    if (level === 'outer') {
      return {
        borderRadius: size,
        borderWidth: size * 0.2,
        height: size,
        padding: size * 0.4,
        width: size,
      };
    }
    return {
      borderRadius: Math.floor(size / 2),
      borderWidth: Math.floor(size * 0.2),
      height: Math.floor(size / 2),
      padding: Math.floor(size * 0.4),
      width: Math.floor(size / 2),
    };
  }

  if (level === 'outer') {
    return styles[size];
  }

  return {
    borderRadius: Math.floor(styles[size].borderRadius / 2),
    height: Math.floor(styles[size].height / 2),
    width: Math.floor(styles[size].width / 2),
  };
};
