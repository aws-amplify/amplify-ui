import type { StoreState } from './types';

export const DEFAULT_STATE: StoreState = {
  actionType: undefined,
  location: { current: undefined, path: '', key: '' },
};
