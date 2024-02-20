import { isString } from '../../utils';
import { isShadowTokenObject } from './isShadowObject';
import { referenceValue } from './referenceValue';
import { ShadowValue } from '../tokens/types/designToken';

type BaseDesignToken = {
  value: string | number;
};

type ShadowPropertyKey = keyof Exclude<ShadowValue, string>;

// Important: these properties should not be altered in
// order to maintain the expected order of the CSS `box-shadow` property
const SHADOW_PROPERTIES: ShadowPropertyKey[] = [
  'offsetX',
  'offsetY',
  'blurRadius',
  'spreadRadius',
  'color',
];

export function cssValue(token: BaseDesignToken): string | number {
  const { value } = token;
  if (isString(value)) {
    return referenceValue(value);
  }

  if (isShadowTokenObject(value)) {
    return SHADOW_PROPERTIES.map((property) => {
      return referenceValue(
        // lookup property against `token` first for custom non-nested value, then lookup
        // property against `value` for design token value
        isShadowTokenObject(token) ? token[property] : value[property]
      );
    }).join(' ');
  }

  return value;
}
