import type { Variant } from './types';

export function isComposable(t: Variant): t is 'composable' {
  return t === 'composable';
}
