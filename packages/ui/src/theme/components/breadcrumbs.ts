import {
  ComponentTheme,
  BaseComponentTheme,
  BaseThemeDefinition,
} from './utils';

type Elements = 'list' | 'separator' | 'item' | 'link';

export type BreadcrumbsTheme = ComponentTheme<
  {
    element?: {
      [key in Elements]?: BaseThemeDefinition;
    };
  } & BaseComponentTheme
>;
