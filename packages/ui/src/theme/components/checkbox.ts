import { BaseThemeDefinition, BaseComponentTheme } from './utils';

export interface CheckboxTheme extends BaseThemeDefinition {
  _element?: {
    button?: BaseThemeDefinition & {
      _modifier?: BaseThemeDefinition & {
        focused?: BaseThemeDefinition;
        error?: BaseThemeDefinition;
        disabled?: BaseThemeDefinition;
      };
    };
    icon?: BaseThemeDefinition & {
      _modifier?: {
        checked?: BaseThemeDefinition;
        indeterminite?: BaseThemeDefinition;
        disabled?: BaseThemeDefinition;
      };
    };
    label?: BaseThemeDefinition;
  };
}
