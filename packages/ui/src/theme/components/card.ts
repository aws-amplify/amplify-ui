import { BaseThemeDefinition } from './utils';

export interface CardTheme extends BaseThemeDefinition {
  _modifier?: {
    [key in 'elevated' | 'outlined']?: BaseThemeDefinition;
  };
}
