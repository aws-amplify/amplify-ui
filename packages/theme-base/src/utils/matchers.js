module.exports = {
  isRadius: (token) =>
    token.path[0] === 'radii' ||
    token.path[token.path.length - 1] === 'borderRadius',
  isFontSize: (token) =>
    token.path[0] === 'fontSizes' ||
    token.path[token.path.length - 1] === 'fontSize',
  isFontWeight: (token) =>
    token.path[0] === 'fontWeights' ||
    token.path[token.path.length - 1] === 'fontWeight',
  isSpace: (token) =>
    token.path[0] === 'space' ||
    token.path[token.path.length - 1].startsWith('padding'),
  isBorderWidth: (token) =>
    token.path[0] === 'borderWidths' ||
    token.path[token.path.length - 1] === 'borderWidth',
  isOpacity: (token) =>
    token.path[0] === 'opacities' ||
    token.path[token.path.length - 1] === 'opacity',
  isTime: (token) =>
    token.path[0] === 'time' ||
    token.path[token.path.length - 1] === 'transitionDuration',
  isShadow: (token) => token.path[0] === 'shadows',
};
