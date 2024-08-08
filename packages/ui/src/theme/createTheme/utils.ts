import kebabCase from 'lodash/kebabCase.js';
import { has, isObject, isString } from '../../utils';
import { WebDesignToken } from '../types';
import { ShadowValue } from '../tokens/types/designToken';
import { CSSProperties } from '../components/utils';

export const CSS_VARIABLE_PREFIX = 'amplify';

interface NameTransformProps {
  path?: Array<string>;
}

/**
 * This will take an object like:
 * {paddingTop:'20px',color:'{colors.font.primary}'}
 * and turn it into a CSS string:
 * `padding-top:20px; color: var(--colors-font-primary);`
 */
export function propsToString(props: CSSProperties): string {
  return Object.entries(props)
    .map(([key, value]) => {
      const _value = isDesignToken(value)
        ? value.toString()
        : // @ts-ignore
          cssValue({ value });
      return `${kebabCase(key)}:${_value}; `;
    })
    .join(' ');
}

export function cssNameTransform({ path = [] }: NameTransformProps): string {
  return `${kebabCase([CSS_VARIABLE_PREFIX, ...path].join(' '))}`;
}

type BaseDesignToken = {
  value: string | number;
};

type ShadowPropertyKey = keyof Exclude<ShadowValue, string>;

// Important: these properties should not be altered in
// order to maintain the expected order of the CSS `box-shadow` property
const SHADOW_PROPERTIES: ShadowPropertyKey[] = [
  'offsetX',
  'offsetY',
  'blurRadius',
  'spreadRadius',
  'color',
];

/**
 * Will take a design token in a theme and return its value as CSS
 *
 * @param token
 * @returns
 */
export function cssValue(token: BaseDesignToken): string | number {
  const { value } = token;
  if (isString(value)) {
    return referenceValue(value);
  }

  if (isShadowTokenObject(value)) {
    return SHADOW_PROPERTIES.map((property) => {
      return referenceValue(
        // lookup property against `token` first for custom non-nested value, then lookup
        // property against `value` for design token value
        isShadowTokenObject(token) ? token[property] : value[property]
      );
    }).join(' ');
  }

  return value;
}

/**
 * Helper function to test if something is a design token or not.
 * Used in the React component style props.
 *
 * @param value - thing to test if it is a design token or not
 * @returns boolean
 */
export function isDesignToken(value: unknown): value is WebDesignToken {
  return isObject(value) && has(value, 'value');
}

export function isShadowTokenObject(
  value: unknown
): value is ShadowValue & object {
  return isObject(value) && has(value, 'offsetX');
}

/**
 * Function that sees if a string contains a design token reference
 * and if so will turn that into a CSS variable.
 *
 * @param {string} value
 * @returns string
 */
export function referenceValue(value?: string) {
  if (!value) return '';
  if (usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}

export type SetupToken<ReturnType = any> = (args: {
  token: BaseDesignToken;
  path: Array<string>;
}) => ReturnType;

/**
 * This will take a design token and add some data to it for it
 * to be used in JS/CSS. It will create its CSS var name and update
 * the value to use a CSS var if it is a reference. It will also
 * add a `.toString()` method to make it easier to use in JS.
 *
 * We should see if there is a way to share this logic with style dictionary...
 */
export const setupToken: SetupToken<WebDesignToken> = ({ token, path }) => {
  const name = `--${cssNameTransform({ path })}`;
  const { value: original } = token;
  const value = cssValue(token);

  return { name, original, path, value, toString: () => `var(${name})` };
};

type SetupTokensProps = {
  tokens?: Record<string | number, any>;
  path?: Array<string>;
  setupToken: SetupToken;
};

/**
 * Recursive function that will walk down the token object
 * and perform the setupToken function on each token.
 * Similar to what Style Dictionary does.
 */
export function setupTokens({
  tokens,
  path = [],
  setupToken,
}: SetupTokensProps): any {
  if (has(tokens, 'value')) {
    return setupToken({ token: tokens as BaseDesignToken, path });
  }

  const output: Record<string, any> = {};

  for (const name in tokens) {
    if (has(tokens, name)) {
      const value = tokens[name];
      const nextTokens = isObject(value) ? value : { value };

      output[name] = setupTokens({
        tokens: nextTokens,
        path: path.concat(name),
        setupToken,
      });
    }
  }

  return output;
}

// Internal Style Dictionary methods
// copied from amzn/style-dictionary with the owner's permission

/**
 * Takes an plain javascript object and will make a flat array of all the leaf nodes.
 * A leaf node in this context has a 'value' property. Potentially refactor this to
 * be more generic.
 * @private
 * @param  {Object} properties - The plain object you want flattened into an array.
 * @param  {Array} [to_ret=[]] - Properties array. This function is recursive therefore this is what gets passed along.
 * @return {Array}
 */
export function flattenProperties(properties: object, to_ret?: object[]) {
  to_ret = to_ret || [];

  for (var name in properties) {
    if (has(properties, name)) {
      if (isObject(properties[name]) && 'value' in properties[name]) {
        to_ret.push(properties[name]);
      } else if (isObject(properties[name])) {
        flattenProperties(properties[name], to_ret);
      }
    }
  }

  return to_ret;
}

/**
 * Performs an deep extend on the objects, from right to left.
 * @private
 * @param {Object[]} objects - An array of JS objects
 * @param {Function} collision - A function to be called when a merge collision happens.
 * @param {string[]} path - (for internal use) An array of strings which is the current path down the object when this is called recursively.
 * @returns {Object}
 */
export function deepExtend<T>(
  objects?: (object | undefined)[],
  collision?: Function,
  path?: string[]
): T {
  if (objects == null) return {} as T;

  var src,
    copyIsArray,
    copy,
    name,
    options,
    clone,
    target = objects[0] || {},
    i = 1,
    length = objects.length;

  path = path || [];

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object') {
    target = {};
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = objects[i]) != null) {
      // Extend the base object
      for (name in options) {
        if (!has(options, name)) continue;
        if (name === '__proto__') continue;

        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (copy && (isObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isObject(src) ? src : {};
          }

          var nextPath = path.slice(0);
          nextPath.push(name);

          // Never move original objects, clone them
          target[name] = deepExtend([clone, copy], collision, nextPath);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          if (src != null && typeof collision == 'function') {
            collision({ target: target, copy: options, path: path, key: name });
          }
          target[name] = copy;
        }
      }
    }
  }

  return target as T;
}

/**
 * Checks if the value uses a value reference.
 * @param {string} value
 * @returns {boolean} - True, if the value uses a value reference
 */
export function usesReference(value) {
  const regex = new RegExp('\\{([^}]+)\\}', 'g');

  if (typeof value === 'string') {
    return regex.test(value);
  }

  if (typeof value === 'object') {
    let hasReference = false;
    // iterate over each property in the object,
    // if any element passes the regex test,
    // the whole thing should be true
    for (const key in value) {
      if (has(value, key)) {
        const element = value[key];
        let reference = usesReference(element);
        if (reference) {
          hasReference = true;
          break;
        }
      }
    }
    return hasReference;
  }

  return false;
}
