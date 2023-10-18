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

export type ComponentsTheme = {
  [key: string]: ComponentTheme<BaseComponentTheme>;
  alert?: AlertTheme;
  autocomplete?: AutoCompleteTheme;
  badge?: BadgeTheme;
  breadcrumbs?: BreadcrumbsTheme;
  button?: ButtonTheme;
  card?: CardTheme;
  checkbox?: CheckboxTheme;
  rating?: RatingTheme;
};

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
