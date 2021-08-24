import merge from 'deepmerge';

import { Theme } from './types';
import { defaultTheme } from './defaultTheme';

export const extendTheme = <T,>(override: T) => {
  return merge<Theme, T>(defaultTheme, override);
};
