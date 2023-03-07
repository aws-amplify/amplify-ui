import {
  cssNameTransform,
  isDesignToken,
  ComponentClassName,
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

export type Modifiers = string | number | null;

/**
 * This helper function creates modifier class names that are used for our flat BEM styling
 * it takes in a base and modifier and returns the modified class if a modifier was passed in and null otherwise
 * @param base The base class of the output
 * @param modifier The modifier to add onto the base
 * @returns the modified class name or empty string
 */
export const classNameModifier = (
  base: ComponentClassName,
  modifier?: Modifiers
): string => {
  return modifier ? `${base}--${modifier}` : '';
};

/**
 * This helper function creates modified class names that are used for our flat BEM styling
 * it takes in a base, modifier, and flag and returns the modified class name if the flag is true and null if the flag is false
 * @param base
 * @param modifier
 * @param flag
 * @returns the modified class name or empty string
 */
export const classNameModifierByFlag = (
  base: ComponentClassName,
  modifier: Modifiers,
  flag?: boolean
): string => {
  return flag ? `${base}--${modifier}` : '';
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
