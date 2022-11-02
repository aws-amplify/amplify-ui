import { DesignToken } from 'style-dictionary/types/DesignToken';

const isFontSize = (token: DesignToken): boolean =>
  token.path[0] === 'fontSizes' ||
  token.path[token.path.length - 1] === 'fontSize';

const isFontWeight = (token: DesignToken): boolean =>
  token.path[0] === 'fontWeights' ||
  token.path[token.path.length - 1] === 'fontWeight';

const isRadius = (token: DesignToken): boolean => token.path[0] === 'radii';

const isSpace = (token: DesignToken): boolean =>
  token.path[0] === 'space' ||
  token.path[token.path.length - 1].startsWith('padding');

const isOpacity = (token: DesignToken): boolean =>
  token.path[0] === 'opacities' ||
  token.path[token.path.length - 1] === 'opacity';

const isTime = (token: DesignToken): boolean =>
  token.path[0] === 'time' ||
  token.path[token.path.length - 1] === 'transitionDuration';

export { isFontSize, isFontWeight, isOpacity, isRadius, isSpace, isTime };
