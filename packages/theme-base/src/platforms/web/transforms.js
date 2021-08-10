const { isShadow } = require('../../utils/matchers');

module.exports = {
  CSSBoxShadow: {
    type: 'value',
    matcher: isShadow,
    transitive: true,
    transformer: (token) => {
      const {
        offsetX = '',
        offsetY = '',
        blurRadius = '',
        spreadRadius = '',
        color = '',
      } = token.value;
      return `${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${color}`;
    },
  },
};
