import { Tokens, tokens } from './tokens';
import { Breakpoints, breakpoints } from './breakpoints';
export { TokenOverrides } from './tokens';
export const CSS_VARIABLE_PREFIX = 'amplify';

export interface Theme {
  tokens?: Tokens;
  breakpoints?: Breakpoints;
}

export const theme: Theme = {
  tokens,
  breakpoints,
};
