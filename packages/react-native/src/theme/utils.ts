import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import { BaseTokens } from './types';

/**
 * Util similar to lodash mapValues but recurses into nested objects.
 * @param obj
 * @param callback
 */
const mapValuesDeep = <T>(obj: T, callback: Function): T =>
  typeof obj === 'object'
    ? (mapValues(obj, (x) => mapValuesDeep(x, callback)) as T) // cast back to T to appease TS
    : (callback(obj) as T);

/**
 * The callback assumes that the reference tokens are surrounded by curly braces
 * TODO: refactor for increased robustness
 */
const parseTokenValue = (tokens: BaseTokens, value: string) => {
  return typeof value === 'string' &&
    value.startsWith('{') &&
    value.endsWith('}')
    ? (get(tokens, value.substring(1, value.length - 2)) as string) // cast back to string to appease TS, as lodash get returns any
    : value;
};

/**
 * Function that will walk down the token object
 * and perform the mapValuesDeep function on each token.
 */
export const setupTokens = (tokens: BaseTokens): BaseTokens =>
  mapValuesDeep<BaseTokens>(tokens, (value: string) =>
    parseTokenValue(tokens, value)
  );
