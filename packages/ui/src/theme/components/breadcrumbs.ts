import { BaseThemeDefinition } from './utils';

type Elements = 'list' | 'separator' | 'item' | 'link';

export interface BreadcrumbsTheme extends BaseThemeDefinition {
  _element?: {
    [key in Elements]?: BaseThemeDefinition;
  };
}
