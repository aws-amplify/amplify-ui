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
 * Checks if `value` is a Map
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is a Map, `false` otherwise
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return (
    isObject(value) && Object.prototype.toString.call(value) === '[object Map]'
  );
}

/**
 * Checks if `value` is a Set
 *
 * @param {unknown} value The value to check
 * @returns {boolean} Returns `true` if `value` is a Set, `false` otherwise
 */
export function isSet<T>(value: unknown): value is Set<T> {
  return (
    isObject(value) && Object.prototype.toString.call(value) === '[object Set]'
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

  if (isObject(value) && (isMap(value) || isSet(value))) {
    return !value.size;
  }
  if (isObject(value) && (isString(value) || Array.isArray(value))) {
    return !value.length;
  }
  for (const key in value) {
    if (has(value, key)) {
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
 * Checks if all members of the `values` param are empty arrays
 *
 * @param {unknown} value The values to check
 * @returns {boolean} Returns `true` if all members of `values` are empty, `false` otherwise
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
 * Checks if all members of the `values` param are empty objects
 *
 * @param {unknown} values The values to check
 * @returns {boolean} Returns `true` if all members of the `values` param are empty, `false` otherwise
 */
export function areEmptyObjects<T>(...values: T[]): boolean {
  return values.every(isEmptyObject);
}

/**
 * Capitalizes `value` and its return type
 *
 * @param {string} value string to capitalize
 * @returns {string} capitalized string
 */
export function capitalize<T extends string>(value: T): Capitalize<T> {
  return (
    isString(value) ? value.charAt(0).toUpperCase() + value.slice(1) : ''
  ) as Capitalize<T>;
}

/**
 * Checks if `key` is a direct property of `value`
 *
 * @param {unknown} value `object` potentially containing property
 * @param {string} key property key
 * @returns whether `key` param is a property of the `obj` param
 */
export function has(value: unknown, key: string): boolean {
  return value != null && Object.prototype.hasOwnProperty.call(value, key);
}

/**
 * Checks if `value` is a function
 *
 * @param {unknown} value param to check
 * @returns {boolean} whether `value` is a function
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export { classNameModifier, classNameModifierByFlag } from './classname';
