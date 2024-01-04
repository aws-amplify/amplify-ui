import {
  ComponentTheme,
  BaseThemeDefinition,
  BaseComponentTheme,
} from './utils';

export type CheckboxTheme = ComponentTheme<
  {
    element?: {
      button?: BaseThemeDefinition & {
        modifier?: BaseThemeDefinition & {
          focused?: BaseThemeDefinition;
          error?: BaseThemeDefinition;
          disabled?: BaseThemeDefinition;
        };
      };
      icon?: BaseThemeDefinition & {
        modifier?: {
          checked?: BaseThemeDefinition;
          indeterminite?: BaseThemeDefinition;
          disabled?: BaseThemeDefinition;
        };
      };
      label?: BaseThemeDefinition;
    };
  } & BaseComponentTheme
>;
