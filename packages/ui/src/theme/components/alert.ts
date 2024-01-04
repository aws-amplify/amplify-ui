import { BaseComponentTheme } from '.';
import { ComponentTheme, BaseThemeDefinition } from './utils';

// TODO: pull this out into utils
type Variations = 'info' | 'success' | 'warning' | 'error';

export type AlertTheme = ComponentTheme<
  {
    modifier?: {
      [key in Variations]?: BaseThemeDefinition;
    };
    element?: {
      icon?: BaseThemeDefinition;
      heading?: BaseThemeDefinition;
      body?: BaseThemeDefinition;
      dismiss?: BaseThemeDefinition;
    };
  } & BaseComponentTheme
>;
