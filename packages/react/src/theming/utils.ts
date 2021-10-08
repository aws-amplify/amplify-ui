import { Theme } from '@aws-amplify/ui';

function isPlainObject(value) {
  if (
    typeof value !== 'object' ||
    value === null ||
    Object.prototype.toString.call(value) !== '[object Object]'
  ) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

/**
 * Takes an plain javascript object and will make a flat array of all the leaf nodes.
 * A leaf node in this context has a 'value' property. Potentially refactor this to
 * be more generic.
 * @private
 * @param  {Object} properties - The plain object you want flattened into an array.
 * @param  {Array} [to_ret=[]] - Properties array. This function is recursive therefore this is what gets passed along.
 * @return {Array}
 */
function flattenProperties(properties, to_ret = []) {
  for (var name in properties) {
    if (properties.hasOwnProperty(name)) {
      // TODO: this is a bit fragile and arbitrary to stop when we get to a 'value' property.
      if (isPlainObject(properties[name]) && 'value' in properties[name]) {
        to_ret.push(properties[name]);
      } else if (isPlainObject(properties[name])) {
        flattenProperties(properties[name], to_ret);
      }
    }
  }

  return to_ret;
}

/**
 * Update tokens with overrideTokens
 * @param tokens Tokens object
 * @param overrideTokens Tokens to override
 */
export const extendTokens = (tokens, overrideTokens) => {
  for (const [key, value] of Object.entries(overrideTokens)) {
    if (tokens[key] !== undefined) {
      if (isPlainObject(value)) {
        extendTokens(tokens[key], value);
      } else {
        tokens[key]['value'] = value;
        // This updates reference value
        tokens[key]['original']['value'] = value;
      }
    }
  }
  return tokens;
};

/**
 * Generates a CSS variables map from tokens
 * @param tokens Tokens object
 */
export const getCSSVariablesFromTokens = (tokens: Theme) => {
  const CSSPrefix = '--amplify-';
  const CSSVariables = {};

  const allTokens = flattenProperties(tokens);
  allTokens.forEach((token) => {
    CSSVariables[`${CSSPrefix}${token.name}`] = token.value;
  });

  return CSSVariables;
};
