import { ShadowValue } from '../tokens/types/designToken';
import { isObject, has } from '../../utils';

export function isShadowTokenObject(
  value: unknown
): value is ShadowValue & object {
  return isObject(value) && has(value, 'offsetX');
}
