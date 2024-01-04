import {
  ComponentTheme,
  BaseThemeDefinition,
  BaseComponentTheme,
} from './utils';

export type RatingTheme = ComponentTheme<
  {
    modifier?: {
      [key in 'small' | 'large']?: BaseThemeDefinition;
    };
    element?: {
      item?: BaseThemeDefinition;
      icon?: BaseThemeDefinition & {
        modifier?: {
          filled?: BaseThemeDefinition;
          empty?: BaseThemeDefinition;
        };
      };
    };
  } & BaseComponentTheme
>;
