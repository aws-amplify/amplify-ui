import type { ComponentThemeFromName, ComponentsTheme } from '../components';
import type {
  BaseTheme,
  ComponentTheme,
  ComponentThemeOverride,
} from '../components/utils';
import type { WebTokens } from '../tokens';
import type { WebTheme } from '../types';
import { createComponentCSS } from './createComponentCSS';
import type { ClassNameFunction } from './createComponentClasses';
import { createComponentClasses } from './createComponentClasses';

type CreateComponentThemeProps<
  TokensType extends WebTokens = WebTokens,
  ThemeType extends BaseTheme = BaseTheme,
  NameType extends string = string,
  OverridesType extends BaseTheme = BaseTheme,
> = {
  name: NameType;
  theme?: ComponentTheme<ThemeType, TokensType>;
  overrides?: ComponentThemeOverride<
    ComponentTheme<OverridesType, TokensType>
  >[];
} & ComponentsTheme<TokensType>;

/**
 * Use this to create the theme of a component. You can use this
 * to both completely customize built-in components and
 * build your own components!
 *
 *
 * ```ts
 * // built-in component styling
 * const alertTheme = defineComponentTheme({
 *   name: 'alert',
 *   theme: (tokens) => {
 *     return {
 *       padding: tokens.space.large
 *     }
 *   }
 * });
 *
 * // custom component styling
 * const avatarTheme = defineComponentTheme({
 *   name: 'avatar',
 *   theme: (tokens) => {
 *     return {
 *       padding: tokens.space.large
 *     }
 *   }
 * })
 *
 * const theme = createTheme({
 *   name: 'my-theme',
 *   components: [alertTheme, avatarTheme]
 * })
 * ```
 *
 * @param {Object} params
 * @param {string} params.name  - The name of the component. Use a built-in component name like button to theme buttons.
 * @returns
 */
export function defineComponentTheme<
  ThemeType extends BaseTheme = BaseTheme,
  TokensType extends WebTokens = WebTokens,
  NameType extends string = string,
>({
  name,
  theme,
  overrides,
}: CreateComponentThemeProps<TokensType, ThemeType, NameType>): {
  className: ClassNameFunction<ComponentThemeFromName<NameType, ThemeType>>;
  theme: typeof theme;
  name: string;
  overrides?: typeof overrides;
  cssText: (props: {
    theme: Pick<WebTheme, 'tokens' | 'breakpoints' | 'name'>;
  }) => string;
} {
  const prefix = 'amplify-';
  const className = createComponentClasses<ThemeType, NameType>({
    name,
    prefix,
  });

  const cssText = (props: {
    theme: Pick<WebTheme, 'tokens' | 'breakpoints' | 'name'>;
  }) => {
    return createComponentCSS({
      theme: props.theme,
      components: [{ name, theme }],
    });
  };

  return {
    className,
    theme,
    overrides,
    name,
    cssText,
  };
}
