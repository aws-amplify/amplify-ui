import { createTheme } from './createTheme';
import { baseTheme } from './baseTheme';

export { createTheme };
export * from './types';

export const defaultTheme = createTheme(
  {
    name: 'default-theme',
  },
  baseTheme
);

export { baseTheme };
