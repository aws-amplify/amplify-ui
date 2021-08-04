const {
  isFontSize,
  isFontWeight,
  isSpace,
  isRadius,
  isBorderWidth,
  isOpacity,
} = require('../../utils/matchers');

module.exports = {
  RNfontWeight: {
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
  RNfontSize: {
    type: 'value',
    matcher: isFontSize,
    transformer: (token) => {
      return Math.floor(parseFloat(token.value) * 16);
    },
  },
  RNborderRadius: {
    type: 'value',
    matcher: isRadius,
    transformer: (token) => {
      return Math.floor(parseFloat(token.value) * 16);
    },
  },
  RNborderWidth: {
    type: 'value',
    matcher: isBorderWidth,
    transformer: (token) => {
      return parseInt(token.value, 10);
    },
  },
  RNspace: {
    type: 'value',
    matcher: isSpace,
    transformer: (token) => {
      return Math.floor(parseFloat(token.value) * 16);
    },
  },
  RNopacity: {
    type: 'value',
    matcher: isOpacity,
    transformer: (token) => {
      return parseFloat(token.value);
    },
  },
};
