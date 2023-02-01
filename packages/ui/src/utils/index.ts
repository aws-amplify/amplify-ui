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
 * Checks if `value` is nullish
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is nullish, `false` otherwise
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null;
}

/**
 * Checks if `value` is empty
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is empty, `false` otherwise
 */
export function isEmpty<T>(value: T): boolean {
  if (value === null || value === undefined) return true;

  const tag = Object.prototype.toString.call(value);
  if (
    typeof value === 'object' &&
    (tag === '[object Map]' || tag === '[object Set]')
  ) {
    return !(value as any).size;
  }
  if (typeof value === 'object' && (tag === 'string' || Array.isArray(value))) {
    return !(value as any).length;
  }
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `value` is an empty array
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is a empty, `false` otherwise
 */
function isEmptyArray<T>(value: T): boolean {
  return Array.isArray(value) && isEmpty(value);
}

/**
 * Checks if `value` is a collection of empty arrays
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is empty, `false` otherwise
 */
export function areEmptyArrays<T>(...values: T[]): boolean {
  return values.every(isEmptyArray);
}

/**
 * Checks if `value` is an empty object
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is empty, `false` otherwise
 */
function isEmptyObject<T>(value: T): boolean {
  return isObject(value) && isEmpty(value);
}

/**
 * Checks if `value` is a collection of empty objects
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is empty, `false` otherwise
 */
export function areEmptyObjects<T>(...values: T[]): boolean {
  return values.every(isEmptyObject);
}
