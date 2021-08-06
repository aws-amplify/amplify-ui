const {
  isFontSize,
  isFontWeight,
  isSpace,
  isRadius,
  isBorderWidth,
  isOpacity,
} = require('../../utils/matchers');

module.exports = {
  RNFontWeight: {
    type: 'value',
    matcher: isFontWeight,
    transformer: (token) => {
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
  RNBorderRadius: {
    type: 'value',
    matcher: isRadius,
    transformer: (token) => {
      return Math.floor(parseFloat(token.value) * 16);
    },
  },
  RNBorderWidth: {
    type: 'value',
    matcher: isBorderWidth,
    transformer: (token) => {
      return parseInt(token.value, 10);
    },
  },
  RNSpace: {
    type: 'value',
    matcher: isSpace,
    transformer: (token) => {
      // Note: we are multiplying values by 8 instead of 16 because
      // we want the mobile spacing to be smaller.
      return Math.floor(parseFloat(token.value) * 8);
    },
  },
  RNOpacity: {
    type: 'value',
    matcher: isOpacity,
    transformer: (token) => {
      return parseFloat(token.value);
    },
  },
};
