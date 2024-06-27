import { Modifiers } from '../types';

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
export function isEmptyObject<T>(value: T): boolean {
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

/**
 * This helper function creates modifier class names that are used for our flat BEM styling
 * it takes in a base and modifier and returns the modified class if a modifier was passed in and null otherwise
 * @param base The base class of the output
 * @param modifier The modifier to add onto the base
 * @returns the modified class name or empty string
 */
export const classNameModifier = (
  base: string,
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
  base: string,
  modifier: Modifiers,
  flag?: boolean
): string => {
  return flag ? `${base}--${modifier}` : '';
};

/**
 * `isFunction` but types the param with its function signature
 *
 * @param {unknown} value param to check
 * @returns {boolean} whether `value` is a function
 */
export function isTypedFunction<T extends (...args: any[]) => any>(
  value: unknown
): value is T {
  return isFunction(value);
}

/**
 * Similar to `Array.join`, with an optional callback/template param
 * for formatting returned string values
 *
 * @param {string[]} values string array
 * @param {(value: string) => string} template callback format param
 * @returns formatted string array
 */
export function templateJoin(
  values: string[],
  template: (value: string) => string
): string {
  return values.reduce(
    (acc, curr) => `${acc}${isString(curr) ? template(curr) : ''}`,
    ''
  );
}

/**
 * A function that does nothing
 *
 * @param {any[]} _ accepts any parameters
 * @returns nothing
 */
export function noop(..._: any[]): void {
  return;
}

/**
 * @param {string} groupName name of group
 * @param events string values related to group
 */
export function groupLog(groupName: string, ...events: any[]): void {
  const hasEvents = !!events?.length;
  if (hasEvents) {
    // eslint-disable-next-line no-console
    console.groupCollapsed(groupName);
    events?.forEach((event) => {
      // eslint-disable-next-line no-console
      console.log(event);
    });
    // eslint-disable-next-line no-console
    console.groupEnd();
  } else {
    // eslint-disable-next-line no-console
    console.log(groupName);
  }
}

/**
 * Splits an object into 2 objects based on a predicate
 *
 * @param {object} obj an object to split into two
 * @param {function} predicate function to determin where an element should go
 * @returns
 */
export function splitObject(
  obj: Record<string, unknown>,
  predicate: (key: string) => boolean
) {
  const left: Record<string, unknown> = {};
  const right: Record<string, unknown> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (predicate(key)) {
      left[key] = value;
    } else {
      right[key] = value;
    }
  });
  return [left, right] as const;
}
