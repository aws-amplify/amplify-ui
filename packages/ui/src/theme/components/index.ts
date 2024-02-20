import { Breakpoints } from '../breakpoints';
import { AlertTheme } from './alert';
import { AutoCompleteTheme } from './autocomplete';
import { BadgeTheme } from './badge';
import { BreadcrumbsTheme } from './breadcrumbs';
import { ButtonTheme } from './button';
import { CardTheme } from './card';
import { CheckboxTheme } from './checkbox';
import { RatingTheme } from './rating';
import { ComponentTheme, BaseComponentTheme } from './utils';

export type { ComponentTheme, BaseComponentTheme };

export type ComponentsTheme =
  | BaseComponentTheme
  | BaseComponentTheme<AlertTheme, 'alert'>
  | BaseComponentTheme<AutoCompleteTheme, 'autocomplete'>
  | BaseComponentTheme<BadgeTheme, 'badge'>
  | BaseComponentTheme<ButtonTheme, 'button'>
  | BaseComponentTheme<CardTheme, 'card'>
  | BaseComponentTheme<CheckboxTheme, 'checkbox'>
  | BaseComponentTheme<RatingTheme, 'rating'>;

export type {
  AlertTheme,
  AutoCompleteTheme,
  BadgeTheme,
  BreadcrumbsTheme,
  ButtonTheme,
  CardTheme,
  CheckboxTheme,
  RatingTheme,
};
