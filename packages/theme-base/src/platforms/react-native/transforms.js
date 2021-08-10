const {
  isFontSize,
  isFontWeight,
  isSpace,
  isRadius,
  isBorderWidth,
  isOpacity,
  isTime,
  isShadow,
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
  RNTime: {
    type: 'value',
    matcher: isTime,
    transformer: (token) => {
      return parseInt(token.value, 10);
    },
  },
  RNShadow: {
    type: 'value',
    matcher: isShadow,
    transitive: true,
    transformer: (token) => {
      const {
        offsetX = '',
        offsetY = '',
        blurRadius = '',
        color = '',
      } = token.value;
      return {
        shadowColor: color,
        shadowOffset: {
          width: parseInt(offsetX, 10),
          height: parseInt(offsetY, 10),
        },
        shadowRadius: parseInt(blurRadius, 10),
      };
    },
  },
};
