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
