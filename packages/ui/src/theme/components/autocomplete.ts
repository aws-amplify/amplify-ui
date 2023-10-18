import {
  ComponentTheme,
  BaseComponentTheme,
  BaseThemeDefinition,
} from './utils';

export type AutoCompleteTheme = ComponentTheme<
  {
    element?: {
      menu?: BaseThemeDefinition & {
        modifier?: {
          empty?: BaseThemeDefinition;
          loading?: BaseThemeDefinition;
        };
        element?: {
          option?: BaseThemeDefinition & {
            modifier?: {
              active?: BaseThemeDefinition;
            };
          };
          options?: BaseThemeDefinition;
        };
      };
    };
  } & BaseComponentTheme
>;
