import { isFunction } from '../../utils';
import type { CSSProperties } from '../components/utils';
import type { WebTokens } from '../tokens';
import type { Animations } from '../types';
import { propsToString } from './utils';

export function createAnimationCSS({
  animations,
  tokens,
}: {
  animations: Animations;
  tokens: WebTokens;
}) {
  let cssText = '';
  Object.entries(animations).forEach(([key, value]) => {
    cssText += `\n  @keyframes ${key} {`;
    Object.entries(value).forEach(([step, properties]) => {
      cssText += `\n    ${step} {\n`;
      const animationProperties: CSSProperties = isFunction(properties)
        ? (properties(tokens) as CSSProperties)
        : properties;
      cssText += propsToString(animationProperties);
      cssText += `\n    }`;
    });
    cssText += `\n  }`;
  });
  return cssText;
}
