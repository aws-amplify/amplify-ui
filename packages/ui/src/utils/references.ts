import { has } from './utils';

const defaults = {
  opening_character: '{',
  closing_character: '}',
  separator: '.',
};

/**
 * Checks if the value uses a value reference.
 * @param {string} value
 * @returns {boolean} - True, if the value uses a value reference
 */
export function usesReference(value: any, regexOrOptions = {}): boolean {
  const regex =
    regexOrOptions instanceof RegExp
      ? regexOrOptions
      : createReferenceRegex(regexOrOptions);

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
        let reference = usesReference(element, regexOrOptions);
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

export function resolveReference(path, obj) {
  let i,
    ref = obj;

  if (!Array.isArray(path)) {
    return;
  }

  for (i = 0; i < path.length; i++) {
    // Check for undefined as 0 is a valid, truthy value
    if (typeof ref[path[i]] !== 'undefined') {
      ref = ref[path[i]];
    } else {
      // set the reference as undefined if we don't find anything
      ref = undefined;
      break;
    }
  }

  return ref;
}

export function createReferenceRegex(opts = {}) {
  const options = Object.assign({}, defaults, opts);

  return new RegExp(
    '\\' +
      options.opening_character +
      '([^' +
      options.closing_character +
      ']+)' +
      '\\' +
      options.closing_character,
    'g'
  );
}

/**
 * Returns the path from a path name be splitting the name by a given separator.
 *
 * @private
 * @param {string} pathName
 * @param {Object} opts
 * @returns {Array} - The path
 */
export function getPathFromName(pathName, opts = {}) {
  const options = Object.assign({}, defaults, opts);
  if (typeof pathName !== 'string') {
    throw new Error('Getting path from name failed. Name must be a string');
  }
  return pathName.split(options.separator);
}

/**
 * Returns the paths name be joining its parts with a given separator.
 *
 * @private
 * @param {Array} path
 * @param {Object} opts
 * @returns {string} - The paths name
 */
export function getName(path, opts = {}) {
  const options = Object.assign({}, defaults, opts);
  if (!path || !(path instanceof Array)) {
    throw new Error('Getting name for path failed. Path must be an array');
  }
  return path.join(options.separator);
}