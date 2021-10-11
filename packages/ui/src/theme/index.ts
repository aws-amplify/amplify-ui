export * from './types';
import { createTheme } from './createTheme';
import { baseTheme } from './baseTheme';
export { createTheme };

export const defaultTheme = createTheme({}, baseTheme);
