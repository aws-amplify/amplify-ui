import { DesignToken, Transform } from 'style-dictionary';
import {
  isFontSize,
  isFontWeight,
  isOpacity,
  isRadius,
  isSpace,
  isTime,
} from './matchers';

export const ReactNativeTransforms: Record<string, Transform> = {
  RNFontWeight: {
    type: 'value',
    matcher: isFontWeight,
    transformer: (token: DesignToken) => {
      const intValue = parseInt(token.value, 10);
      if (isNaN(intValue)) {
        return token.value;
      } else {
        return intValue.toString();
      }
    },
  },
  RNFontSize: {
    type: 'value',
    matcher: isFontSize,
    transformer: (token) => {
      return Math.floor(parseFloat(token.value) * 16);
    },
  },
  RNRadius: {
    type: 'value',
    matcher: isRadius,
    transformer: (token) => {
      return Math.floor(parseFloat(token.value) * 16);
    },
  },
  RNSpace: {
    type: 'value',
    matcher: isSpace,
    transformer: (token) => {
      // Note: we are multiplying values by 8 instead of 16 because
      // we want the mobile spacing to be smaller.
      const val = parseFloat(token.value) * 8;
      // subtract modulo 2 from value to not end up with odd numbers
      return Math.floor(val - (val % 2));
    },
  },
  RNOpacity: {
    type: 'value',
    matcher: isOpacity,
    transformer: (token) => {
      return parseFloat(token.value);
    },
  },
  RNTime: {
    type: 'value',
    matcher: isTime,
    transformer: (token) => {
      return parseInt(token.value, 10);
    },
  },
};
