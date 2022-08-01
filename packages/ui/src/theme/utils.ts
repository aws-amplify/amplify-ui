import kebabCase from 'lodash/kebabCase';
// internal style dictionary function
import usesReference from 'style-dictionary/lib/utils/references/usesReference';

import { DesignToken } from './tokens/types/designToken';
import { Theme, BaseTheme } from './types';
import { Tokens } from './tokens';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

export const CSS_VARIABLE_PREFIX = 'amplify';

function referenceValue(value: string) {
  if (usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}

export function cssValue(token: DesignToken) {
  const { value } = token;
  if (typeof value === 'string') {
    return referenceValue(value);
  }
  if (typeof value === 'object') {
    if ('offsetX' in value) {
      const {
        offsetX = '',
        offsetY = '',
        blurRadius = '',
        spreadRadius = '',
        color = '',
      } = value;
      return [
        referenceValue(offsetX),
        referenceValue(offsetY),
        referenceValue(blurRadius),
        referenceValue(spreadRadius),
        referenceValue(color),
      ].join(' ');
    }
  }

  return value;
}

interface NameTransformProps {
  path?: Array<string>;
}

export function cssNameTransform({ path = [] }: NameTransformProps): string {
  return `${kebabCase([CSS_VARIABLE_PREFIX, ...path].join(' '))}`;
}

export type pathObject = {
  path: string[];
};

export const STATE_NAMES = [
  'hover',
  'focus',
  'active',
  'loading',
  'disabled',
  'visited',
];

export function findDeprecatedStateTokens(baseTheme: BaseTheme): pathObject[] {
  const baseEntry = baseTheme?.tokens || {};
  return traverse(['', baseEntry], []);
}

/**
 * This function will recursively traverse the tokens object from a theme and return a path array to
 * tokens with the deprecatedStateToken flag. This will later be used to match up against the passed in theme object
 * and write State token values that are being passed in using the old deprecated state tokens.
 */
function traverse(baseEntry, existingPath: string[]): pathObject[] {
  let path = [...existingPath];
  const [key, obj] = baseEntry;
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    if (key) {
      path.push(key);
    }
    if (obj.value) {
      if (obj.deprecatedStateToken) {
        return [
          {
            path: path,
          },
        ];
      }
      return [];
    } else {
      const entries = Object.entries(obj);
      let retValue = [];
      for (const entry of entries) {
        let deprecated = traverse(entry, path);
        if (deprecated.length) {
          if (Array.isArray(deprecated)) {
            retValue = [...retValue, ...deprecated];
          } else {
            retValue.push(deprecated);
          }
        }
      }
      if (retValue.length) {
        return retValue;
      } else {
        return [];
      }
    }
  }
  return [];
}

function isDesignToken(
  value: DesignToken | PartialObjectDeep<Tokens>
): value is DesignToken {
  if ((value as DesignToken)?.value) {
    return true;
  }
  return false;
}

/**
 * This function takes in a theme object and a path array and returns the value of the design token at the end of the path or undefined if one is not found
 */
export function pathToValue(theme: Theme, pathArray: string[]): DesignToken {
  let themeValue: DesignToken | PartialObjectDeep<Tokens> = theme.tokens || {};
  pathArray.every((pathValue) => {
    if (themeValue[pathValue]) {
      themeValue = themeValue[pathValue];
      return true;
    } else {
      themeValue = undefined;
      return false;
    }
  });
  if (isDesignToken(themeValue)) {
    return themeValue;
  }
}
