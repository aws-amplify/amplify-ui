import {
  cssNameTransform,
  isDesignToken,
  classNameModifier,
  classNameModifierByFlag,
  WebTheme,
} from '@aws-amplify/ui';

import { isThemeStylePropKey } from '../types/theme';
import { stylePropsToThemeKeys } from './constants';

export const strHasLength = (str: unknown): str is string =>
  typeof str === 'string' && str.length > 0;

export const isEmptyString = (value: unknown): boolean =>
  typeof value === 'string' && value.length === 0;

export const isNullOrEmptyString = (value: unknown): boolean =>
  value == null || isEmptyString(value);

/**
 * Create a consecutive integer array from start value to end value.
 * @param start start value
 * @param end end value
 * @returns an integer array with elements from start to end consecutively
 */
export const getConsecutiveIntArray = (
  start: number,
  end: number
): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * TS helper function to make using Object.keys more typesafe
 */
export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

export const getCSSVariableIfValueIsThemeKey = <Value = unknown>(
  propKey: string,
  value: string,
  tokens: WebTheme['tokens']
): Value | string | null => {
  if (typeof value !== 'string') {
    return value;
  }
  // For shorthand properties like `padding` which can accept 1, 2, 3, or 4 values
  // run this function on each value. This would not work on CSS shorthands that
  // mix types, like border which is a composite of borderWidth, borderStyle, and
  // borderColor.
  if (value.includes(' ')) {
    return value
      .split(' ')
      .map((val) => getCSSVariableIfValueIsThemeKey(propKey, val, tokens))
      .join(' ');
  }

  if (isThemeStylePropKey(propKey)) {
    const path = value.split('.');
    const tokenKey = stylePropsToThemeKeys[propKey];
    let tokenProps = tokens[tokenKey];
    for (let i = 0; i < path.length; i++) {
      if (tokenProps) {
        // overwrite tokenProps with next nested value of tokenProps
        tokenProps = tokenProps[path[i] as keyof typeof tokenProps];
        continue;
      }
      break;
    }

    return isDesignToken(tokenProps)
      ? `var(--${cssNameTransform({
          path: [stylePropsToThemeKeys[propKey], ...path],
        })})`
      : value;
  }

  return value;
};

export { classNameModifier, classNameModifierByFlag };
