/**
 * We re-export any lodash imports to avoid appending .js extension across codebase
 * The ultimate goal is have replacement implementation to remove the entire dependency
 */
export { default as isEqual } from 'lodash/isEqual.js';
export { default as isEmpty } from 'lodash/isEmpty.js';
export { default as debounce } from 'lodash/debounce.js';
export { default as isNil } from 'lodash/isNil.js';
export { default as includes } from 'lodash/includes.js';
export { default as get } from 'lodash/get.js';
export { default as pickBy } from 'lodash/pickBy.js';
export { default as has } from 'lodash/has.js';
export { default as kebabCase } from 'lodash/kebabCase.js';
export { default as merge } from 'lodash/merge.js';

/**
 * Some libraries may not follow Node ES module spec and could be loaded as CommonJS modules,
 * To ensure the interoperability between ESM and CJS, modules from those libraries have to be loaded via namespace import
 * And sanitized by the function below because unlike ESM namespace, CJS namespace set `module.exports` object on the `default` key
 * https://nodejs.org/api/esm.html#interoperability-with-commonjs
 */
export const sanitizeNamespaceImport = <T>(namespaceModule: T): T => {
  const sanitizedNamespaceModule = { default: undefined, ...namespaceModule };
  return sanitizedNamespaceModule.default ?? sanitizedNamespaceModule;
};

/**
 * Checks if `value` is an Object (non-primitive, non-array, non-function)
 * Will return false for Arrays and functions
 *
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is an object, `false` otherwise
 */
export function isObject(value: unknown): value is object {
  return value != null && !Array.isArray(value) && typeof value === 'object';
}

/**
 * Checks if `value` is a string primitive or object
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is a string, `false` otherwise
 */
export function isString(value: unknown): value is string {
  return (
    typeof value === 'string' ||
    (typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object String]')
  );
}

/**
 * Checks if `value` is undefined
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is undefined, `false` otherwise
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 *
 * @param value capitalizes `value` and its type.
 * @returns Capitalized `value`
 */
export function capitalize<T extends string>(value: T): Capitalize<T> {
  return (
    isString(value) ? value.charAt(0).toUpperCase() + value.slice(1) : ''
  ) as Capitalize<T>;
}
