import { DesignToken } from 'style-dictionary/types/DesignToken';

const isRadius = (token: DesignToken): boolean =>
  token.path[0] === 'radii' ||
  token.path[token.path.length - 1] === 'borderRadius';

const isFontSize = (token: DesignToken): boolean =>
  token.path[0] === 'fontSizes' ||
  token.path[token.path.length - 1] === 'fontSize';

const isFontWeight = (token: DesignToken): boolean =>
  token.path[0] === 'fontWeights' ||
  token.path[token.path.length - 1] === 'fontWeight';

const isSpace = (token: DesignToken): boolean =>
  token.path[0] === 'space' ||
  token.path[token.path.length - 1].startsWith('padding');

const isBorderWidth = (token: DesignToken): boolean =>
  token.path[0] === 'borderWidths' ||
  token.path[token.path.length - 1] === 'borderWidth';

const isOpacity = (token: DesignToken): boolean =>
  token.path[0] === 'opacities' ||
  token.path[token.path.length - 1] === 'opacity';

const isTime = (token: DesignToken): boolean =>
  token.path[0] === 'time' ||
  token.path[token.path.length - 1] === 'transitionDuration';

const isShadow = (token: DesignToken): boolean => token.path[0] === 'shadows';

export {
  isBorderWidth,
  isFontSize,
  isFontWeight,
  isOpacity,
  isRadius,
  isShadow,
  isSpace,
  isTime,
};
