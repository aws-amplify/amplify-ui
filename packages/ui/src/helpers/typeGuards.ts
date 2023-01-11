/**
 * Checks if `value` is an Object (excludes arrays and functions)
 *
 * @param value
 * @returns
 */
export const isObject = (value: unknown): value is object =>
  value != null && !Array.isArray(value) && typeof value === 'object';

/**
 * Checks if `value` is a string
 *
 * @param value
 * @returns
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string';

/**
 * Checks if `value` is undefined
 *
 * @param value
 * @returns
 */
export const isUndefined = <T>(value: T | undefined): value is T =>
  value === undefined;
