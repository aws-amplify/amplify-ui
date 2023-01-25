/**
 * Checks if `value` is an Object (excludes arrays and functions)
 *
 * @param value
 */
export const isObject = (value: unknown): value is object =>
  value != null && !Array.isArray(value) && typeof value === 'object';

/**
 * Checks if `value` is a string (excludes primitive object wrappers)
 *
 * @param value
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string';

/**
 * Checks if `value` is undefined
 *
 * @param value
 */
export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;
