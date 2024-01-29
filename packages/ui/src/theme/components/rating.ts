import { BaseThemeDefinition } from './utils';

export interface RatingTheme extends BaseThemeDefinition {
  _modifier?: {
    [key in 'small' | 'large']?: BaseThemeDefinition;
  };
  _element?: {
    item?: BaseThemeDefinition;
    icon?: BaseThemeDefinition & {
      _modifier?: {
        [key in 'filled' | 'empty']?: BaseThemeDefinition;
      };
    };
  };
}
