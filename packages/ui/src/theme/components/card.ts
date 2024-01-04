import {
  ComponentTheme,
  BaseThemeDefinition,
  BaseComponentTheme,
} from './utils';

export type CardTheme = ComponentTheme<
  {
    modifier?: {
      [key in 'elevated' | 'outlined']?: BaseThemeDefinition;
    };
  } & BaseComponentTheme
>;
