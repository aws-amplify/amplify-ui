import { ComponentsTheme } from '../components';
import {
  BaseTheme,
  ComponentTheme,
  ComponentThemeOverride,
} from '../components/utils';
import { WebTokens } from '../tokens';
import {
  createComponentClasses,
  ClassNameFunction,
} from './createComponentClasses';

interface CreateComponentThemeProps<
  ThemeType extends BaseTheme,
  TokensType extends WebTokens,
  OverridesType extends BaseTheme = BaseTheme,
> {
  name: string;
  theme?: ComponentTheme<ThemeType, TokensType>;
  overrides?: ComponentThemeOverride<
    ComponentTheme<OverridesType, TokensType>
  >[];
  // overrides do not need to specify all the modifiers and elements
  // need to fix this
}

/**
 * Use this to create the theme of a component. You can use this
 * to both completely customize built-in components and
 * build your own components!
 *
 * @experimental
 *
 * ```ts
 * // built-in component styling
 * const alertTheme = createComponentTheme<AlertTheme>({
 *   name: 'alert',
 *   theme: (tokens) => {
 *     return {
 *       padding: tokens.space.large
 *     }
 *   }
 * });
 *
 * const theme = createTheme({
 *   name: 'my-theme',
 *   components: [alertTheme]
 * })
 * ```
 *
 * @param {Object} params
 * @param {string} params.name  - The name of the component. Use a built-in component name like button to theme buttons.
 * @returns
 */
export function createComponentTheme<
  TokensType extends WebTokens,
  ThemeType extends BaseTheme = BaseTheme,
>({
  name,
  theme,
  overrides,
}:
  | CreateComponentThemeProps<ThemeType, TokensType>
  | ComponentsTheme<TokensType>): {
  className: ClassNameFunction<ThemeType>;
  theme: typeof theme;
  name: string;
  overrides?: typeof overrides;
} {
  const prefix = 'amplify-';
  const className = createComponentClasses<ThemeType>({
    name,
    prefix,
  });
  return {
    className,
    theme,
    overrides,
    name,
  };
}
