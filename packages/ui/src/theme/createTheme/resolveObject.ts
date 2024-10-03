// Internal Style Dictionary methods
// copied from amzn/style-dictionary with the owner's permission
import {
  cloneDeep,
  createReferenceRegex,
  getName,
  getPathFromName,
  has,
  resolveReference,
  usesReference,
} from '../../utils';

let currentContext = []; // To maintain the context to be able to test for circular definitions
const DEFAULTS = {
  ignoreKeys: ['original'],
  ignorePaths: [],
};
let updatedObject;

export function resolveObject<T>(object: Record<string, any>): T {
  const options = Object.assign({}, DEFAULTS);

  updatedObject = cloneDeep(object); // This object will be edited

  const regex = createReferenceRegex(options);

  if (typeof object === 'object') {
    currentContext = [];
    return traverseObject(updatedObject, options, regex) as T;
  } else {
    throw new Error('Please pass an object in');
  }
}

export function traverseObject<T>(obj, options, regex): T {
  let key;

  for (key in obj) {
    if (!has(obj, key)) {
      continue;
    }

    // We want to check for ignoredKeys, this is to
    // skip over attributes that should not be
    // mutated, like a copy of the original property.
    if (options.ignoreKeys && options.ignoreKeys.indexOf(key) !== -1) {
      continue;
    }

    currentContext.push(key);
    if (typeof obj[key] === 'object') {
      traverseObject(obj[key], options, regex);
    } else {
      if (typeof obj[key] === 'string' && obj[key].indexOf('{') > -1) {
        obj[key] = compileValue(
          obj[key],
          [getName(currentContext)],
          options,
          regex
        );
      }
    }
    currentContext.pop();
  }

  return obj as T;
}

let foundCirc = {};
export function compileValue(value, stack, options, regex) {
  let toRet = value,
    ref;

  // Replace the reference inline, but don't replace the whole string because
  // references can be part of the value such as "1px solid {color.border.light}"
  value.replace(regex, function (match, variable) {
    variable = variable.trim();

    // Find what the value is referencing
    const pathName = getPathFromName(variable, options);
    const refHasValue = pathName[pathName.length - 1] === 'value';

    if (refHasValue && options.ignorePaths.indexOf(variable) !== -1) {
      return value;
    } else if (
      !refHasValue &&
      options.ignorePaths.indexOf(`${variable}.value`) !== -1
    ) {
      return value;
    }

    stack.push(variable);

    ref = resolveReference(pathName, updatedObject);

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
        if (usesReference(toRet, regex)) {
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
            toRet = compileValue(toRet, stack, options, regex);
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
