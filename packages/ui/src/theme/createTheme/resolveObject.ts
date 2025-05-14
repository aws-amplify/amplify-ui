import {
  cloneDeep,
  getName,
  getPathFromName,
  has,
  resolveReference,
  usesReference,
} from '../../utils';
import { REFERENCE_REGEX } from './constants';

const DEFAULTS = {
  ignoreKeys: ['original'],
};

export function resolveObject<T>(object: Record<string, any>): T {
  const foundCirc: Record<string, boolean> = {};
  const clone = cloneDeep(object); // This object will be edited
  const currentContext: string[] = []; // To maintain the context to be able to test for circular definitions
  if (typeof object === 'object') {
    return traverseObject({
      slice: clone,
      fullObj: clone,
      currentContext,
      foundCirc,
    }) as T;
  } else {
    throw new Error('Please pass an object in');
  }
}

/**
 * Recursively traverses an object (slice) to resolve and uses
 * compileValue to replace any string references found within it
 */
export function traverseObject<T>({
  slice,
  fullObj,
  currentContext,
  foundCirc,
}): T {
  for (let key in slice) {
    if (!has(slice, key)) {
      continue;
    }

    const prop = slice[key];
    // We want to check for ignoredKeys, this is to
    // skip over attributes that should not be
    // mutated, like a copy of the original property.
    if (DEFAULTS.ignoreKeys && DEFAULTS.ignoreKeys.indexOf(key) !== -1) {
      continue;
    }

    currentContext.push(key);
    if (typeof prop === 'object') {
      traverseObject({ currentContext, slice: prop, fullObj, foundCirc });
    } else {
      if (typeof prop === 'string' && prop.indexOf('{') > -1) {
        slice[key] = compileValue({
          value: prop,
          stack: [getName(currentContext)],
          foundCirc,
          fullObj,
        });
      }
    }
    currentContext.pop();
  }

  return fullObj as T;
}

/**
 * Resolves references in a value, performing recursive lookups when references are nested.
 * value: The string that may contain references (e.g., {color.border.light}) that need to be replaced
 * stack: keeps track of the current chain of references to detect circular references
 * foundCirc: stores any detected circular references
 * fullObj: The full object where references are looked up, essentially the source of all values
 */
export function compileValue({ value, stack, foundCirc, fullObj }) {
  let toRet = value,
    ref;

  const regex = new RegExp(REFERENCE_REGEX);
  // Replace the reference inline, but don't replace the whole string because
  // references can be part of the value such as "1px solid {color.border.light}"
  value.replace(regex, function (match, variable) {
    variable = variable.trim();

    // Find what the value is referencing
    const pathName = getPathFromName(variable);
    const refHasValue = pathName[pathName.length - 1] === 'value';

    stack.push(variable);

    ref = resolveReference(pathName, fullObj);

    // If the reference doesn't end in 'value'
    // and
    // the reference points to someplace that has a `value` attribute
    // we should take the '.value' of the reference
    // per the W3C draft spec where references do not have .value
    // https://design-tokens.github.io/community-group/format/#aliases-references
    if (!refHasValue && ref && has(ref, 'value')) {
      ref = ref.value;
    }

    if (typeof ref !== 'undefined') {
      if (typeof ref === 'string' || typeof ref === 'number') {
        toRet = value.replace(match, ref);

        // Recursive, therefore we can compute multi-layer variables like a = b, b = c, eventually a = c
        if (usesReference(toRet)) {
          var reference = toRet.slice(1, -1);

          // Compare to found circular references
          if (has(foundCirc, reference)) {
            // If the current reference is a member of a circular reference, do nothing
          } else if (stack.indexOf(reference) !== -1) {
            // If the current stack already contains the current reference, we found a new circular reference
            // chop down only the circular part, save it to our circular reference info, and spit out an error

            // Get the position of the existing reference in the stack
            var stackIndexReference = stack.indexOf(reference);

            // Get the portion of the stack that starts at the circular reference and brings you through until the end
            var circStack = stack.slice(stackIndexReference);

            // For all the references in this list, add them to the list of references that end up in a circular reference
            circStack.forEach(function (key) {
              foundCirc[key] = true;
            });

            // Add our found circular reference to the end of the cycle
            circStack.push(reference);
          } else {
            toRet = compileValue({ value: toRet, stack, foundCirc, fullObj });
          }
        }
        // if evaluated value is a number and equal to the reference, we want to keep the type
        if (typeof ref === 'number' && ref.toString() === toRet) {
          toRet = ref;
        }
      } else {
        // if evaluated value is not a string or number, we want to keep the type
        toRet = ref;
      }
    } else {
      toRet = ref;
    }
    stack.pop(variable);

    return toRet;
  });

  return toRet;
}
