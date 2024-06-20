import { WebTokens } from '../tokens';
import { AccordionTheme } from './accordion';
import { AlertTheme } from './alert';
import { AutoCompleteTheme } from './autocomplete';
import { BadgeTheme } from './badge';
import { BreadcrumbsTheme } from './breadcrumbs';
import { ButtonTheme } from './button';
import { CardTheme } from './card';
import { CheckboxTheme } from './checkbox';
import { CollectionTheme } from './collection';
import { LoaderTheme } from './loader';
import { PaginationTheme } from './pagination';
import { RadioTheme } from './radio';
import { RatingTheme } from './rating';
import { TabsTheme } from './tabs';
import { TextareaFieldTheme } from './textareaField';
import { ToggleButtonTheme, ToggleButtonGroupTheme } from './toggleButton';
import { ComponentTheme, BaseComponentTheme, BaseTheme } from './utils';
export { ClassNameFunction } from '../createTheme/createComponentClasses';
export type { ComponentTheme, BaseComponentTheme, BaseTheme };

// Union type of all built-in component themes and base theme
// for the createTheme function
export type ComponentsTheme<TokensType extends WebTokens = WebTokens> =
  | BaseComponentTheme<BaseTheme, string, TokensType>
  | BaseComponentTheme<AccordionTheme, 'accordion', TokensType>
  | BaseComponentTheme<AlertTheme, 'alert', TokensType>
  | BaseComponentTheme<AutoCompleteTheme, 'autocomplete', TokensType>
  | BaseComponentTheme<BadgeTheme, 'badge', TokensType>
  | BaseComponentTheme<BreadcrumbsTheme, 'breadcrumbs', TokensType>
  | BaseComponentTheme<ButtonTheme, 'button', TokensType>
  | BaseComponentTheme<CardTheme, 'card', TokensType>
  | BaseComponentTheme<CheckboxTheme, 'checkbox', TokensType>
  | BaseComponentTheme<CollectionTheme, 'collection', TokensType>
  | BaseComponentTheme<LoaderTheme, 'loader', TokensType>
  | BaseComponentTheme<PaginationTheme, 'pagination', TokensType>
  | BaseComponentTheme<RatingTheme, 'rating', TokensType>
  | BaseComponentTheme<RadioTheme, 'radio', TokensType>
  | BaseComponentTheme<TabsTheme, 'tabs', TokensType>
  | BaseComponentTheme<TextareaFieldTheme, 'textareafield', TokensType>
  | BaseComponentTheme<ToggleButtonTheme, 'togglebutton', TokensType>
  | BaseComponentTheme<ToggleButtonGroupTheme, 'togglebuttongroup', TokensType>;

// A mapped type of all built-in components
// if the name extends from a known name, like 'alert' this should return the specific shape
export type AllComponentThemes = {
  accordion: AccordionTheme;
  alert: AlertTheme;
  autocomplete: AutoCompleteTheme;
  badge: BadgeTheme;
  breadcrumbs: BreadcrumbsTheme;
  button: ButtonTheme;
  card: CardTheme;
  checkbox: CheckboxTheme;
  collection: CollectionTheme;
  loader: LoaderTheme;
  pagination: PaginationTheme;
  radio: RadioTheme;
  rating: RatingTheme;
  tabs: TabsTheme;
  textareaField: TextareaFieldTheme;
  toggleButton: ToggleButtonTheme;
  toggleButtonGroup: ToggleButtonGroupTheme;
};

export type ComponentThemeFromName<
  T extends string,
  Theme extends BaseTheme = BaseTheme,
> = T extends keyof AllComponentThemes ? AllComponentThemes[T] : Theme;

export {
  AccordionTheme,
  AutoCompleteTheme,
  BadgeTheme,
  BreadcrumbsTheme,
  ButtonTheme,
  CardTheme,
  CheckboxTheme,
  CollectionTheme,
  LoaderTheme,
  PaginationTheme,
  RadioTheme,
  RatingTheme,
  TabsTheme,
  TextareaFieldTheme,
  ToggleButtonTheme,
  ToggleButtonGroupTheme,
};
