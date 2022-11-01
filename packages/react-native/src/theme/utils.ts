import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import { Tokens } from './types';

/**
 * Util similar to lodash mapValues but recurses into nested objects.
 * @param obj
 * @param callback
 */
const mapValuesDeep = <T>(obj: T, callback: Function): T =>
  typeof obj === 'object'
    ? (mapValues(obj, (obj) => mapValuesDeep(obj, callback)) as T) // cast back to T to appease TS
    : (callback(obj) as T);

/**
 * Function that will walk down the token object
 * and perform the mapValuesDeep function on each token.
 */
export const setupTokens = (tokens: Tokens): Tokens =>
  mapValuesDeep<Tokens>(tokens, (value: string) => {
    return typeof value === 'string' &&
      value.startsWith('{') &&
      value.endsWith('}')
      ? (get(tokens, value.substring(1, value.length - 2)) as string) // cast back to string to appease TS, as lodash get returns any
      : value;
  });
