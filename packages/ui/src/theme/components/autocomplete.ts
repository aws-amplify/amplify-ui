import { BaseThemeDefinition } from './utils';

export interface AutoCompleteTheme extends BaseThemeDefinition {
  _element?: {
    menu?: BaseThemeDefinition & {
      _modifier?: {
        empty?: BaseThemeDefinition;
        loading?: BaseThemeDefinition;
      };
      _element?: {
        option?: BaseThemeDefinition & {
          _modifier?: {
            active?: BaseThemeDefinition;
          };
        };
        options?: BaseThemeDefinition;
      };
    };
  };
}
