import { WebTheme, isDesignToken } from '@aws-amplify/ui';
import { getCSSVariableIfValueIsThemeKey } from './utils';

interface GetStyleValueProps {
  value: unknown;
  propKey?: string;
  tokens: WebTheme['tokens'];
}

/**
 * This takes an unknown value, which could be a:
 * - design token: `color={tokens.colors.font.primary}`
 * - string, which could be a:
 *   - theme key: `color='font.primary'`
 *   - plain style: `color='red'`
 * - or a number: `padding={10}`
 * @param value
 * @param key
 * @param tokens tokens object from the Theme
 * @returns a string or a number
 */
export const getStyleValue = ({
  value,
  propKey,
  tokens,
}: GetStyleValueProps): string | number | null => {
  if (isDesignToken(value)) return value.toString();
  if (typeof value === 'string' && typeof propKey === 'string')
    return getCSSVariableIfValueIsThemeKey(propKey, value, tokens);
  if (typeof value === 'number') return value;
  return null;
};
