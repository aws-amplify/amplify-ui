// internal style dictionary function
import usesReference from 'style-dictionary/lib/utils/references/usesReference.js';
import { cssNameTransform } from './cssNameTransform';

export function referenceValue(value?: string) {
  if (!value) return '';
  if (usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}
