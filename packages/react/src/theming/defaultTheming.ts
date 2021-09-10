import { theme, tokens } from '@aws-amplify/ui';
import { getCSSVariablesFromTokens } from './utils';

const defaultCSSVariables = getCSSVariablesFromTokens(tokens);

export { theme as defaultTheme, tokens as defaultTokens, defaultCSSVariables };
