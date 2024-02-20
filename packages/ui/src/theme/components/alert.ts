import { BaseComponentTheme, BaseThemeDefinition } from './utils';

// TODO: pull this out into utils
type Variations = 'info' | 'success' | 'warning' | 'error';

export interface AlertTheme extends BaseThemeDefinition {
  _modifier?: {
    [key in Variations]?: BaseThemeDefinition;
  };
  _element?: {
    icon?: BaseThemeDefinition;
    heading?: BaseThemeDefinition;
    body?: BaseThemeDefinition;
    dismiss?: BaseThemeDefinition;
  };
}
