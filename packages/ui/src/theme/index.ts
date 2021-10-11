export * from './types';
import { createTheme } from './createTheme';
import { defaultTheme } from './defaultTheme';
export { createTheme };

export const theme = createTheme({}, defaultTheme);
