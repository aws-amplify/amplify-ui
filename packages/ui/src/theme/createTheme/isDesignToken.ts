import { has, isObject } from '../../utils';
import { WebDesignToken } from '../tokens/types/designToken';

/**
 * Helper function to test if something is a design token or not.
 * Used in the React component style props.
 *
 * @param value - thing to test if it is a design token or not
 * @returns boolean
 */
export function isDesignToken(value: unknown): value is WebDesignToken {
  return isObject(value) && has(value, 'value');
}
