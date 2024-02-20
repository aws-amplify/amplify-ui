import { BaseThemeDefinition } from './utils';

type Variations = 'info' | 'success';
type Sizes = 'small' | 'large';

export interface BadgeTheme extends BaseThemeDefinition {
  _modifier?: {
    [key in Variations | Sizes]?: BaseThemeDefinition;
  };
}
