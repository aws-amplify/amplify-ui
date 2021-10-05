import { theme as defaultTheme } from '@aws-amplify/ui';
import { getCSSVariablesFromTokens } from './utils';

const defaultCSSVariables = getCSSVariablesFromTokens(defaultTheme);

export { defaultTheme, defaultCSSVariables };
