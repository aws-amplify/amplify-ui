import { createComponentClasses } from '../createTheme';
import { WebTokens } from '../tokens';
import { SliderFieldTokens } from '../tokens/components/sliderField';
import { AccordionTheme } from './accordion';
import { AlertTheme } from './alert';
import { AutoCompleteTheme } from './autocomplete';
import { BadgeTheme } from './badge';
import { BreadcrumbsTheme } from './breadcrumbs';
import { ButtonTheme } from './button';
import { CardTheme } from './card';
import { CheckboxTheme } from './checkbox';
import { CollectionTheme } from './collection';
import { DividerTheme } from './divider';
import { DropZoneTheme } from './dropZone';
import { FieldTheme } from './field';
import { FieldGroupTheme } from './fieldGroup';
import { FieldsetTheme } from './fieldset';
import { InputTheme } from './input';
import { LoaderTheme } from './loader';
import { MenuTheme } from './menu';
import { MessageTheme } from './message';
import { PaginationTheme } from './pagination';
import { PlaceholderTheme } from './placeholder';
import { RadioTheme } from './radio';
import { RatingTheme } from './rating';
import { SelectTheme } from './select';
import { SliderFieldTheme } from './sliderField';
import { StepperFieldTheme } from './stepperField';
import { StorageManagerTheme } from './storageManager';
import { SwitchFieldTheme } from './switchField';
import { TableTheme } from './table';
import { TabsTheme } from './tabs';
import { TextareaTheme } from './textarea';
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
  | BaseComponentTheme<DividerTheme, 'divider', TokensType>
  | BaseComponentTheme<DropZoneTheme, 'dropzone', TokensType>
  | BaseComponentTheme<FieldTheme, 'field', TokensType>
  | BaseComponentTheme<FieldGroupTheme, 'field-group', TokensType>
  | BaseComponentTheme<FieldsetTheme, 'fieldset', TokensType>
  | BaseComponentTheme<InputTheme, 'input', TokensType>
  | BaseComponentTheme<LoaderTheme, 'loader', TokensType>
  | BaseComponentTheme<MenuTheme, 'menu', TokensType>
  | BaseComponentTheme<MessageTheme, 'message', TokensType>
  | BaseComponentTheme<PaginationTheme, 'pagination', TokensType>
  | BaseComponentTheme<PlaceholderTheme, 'placeholder', TokensType>
  | BaseComponentTheme<RatingTheme, 'rating', TokensType>
  | BaseComponentTheme<RadioTheme, 'radio', TokensType>
  | BaseComponentTheme<SelectTheme, 'select', TokensType>
  | BaseComponentTheme<SliderFieldTheme, 'sliderfield', TokensType>
  | BaseComponentTheme<StepperFieldTheme, 'stepperfield', TokensType>
  | BaseComponentTheme<StorageManagerTheme, 'storagemanager', TokensType>
  | BaseComponentTheme<SwitchFieldTheme, 'switchfield', TokensType>
  | BaseComponentTheme<TabsTheme, 'tabs', TokensType>
  | BaseComponentTheme<TableTheme, 'table', TokensType>
  | BaseComponentTheme<TextareaTheme, 'textarea', TokensType>
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
  divider: DividerTheme;
  dropZone: DropZoneTheme;
  field: FieldTheme;
  'field-group': FieldGroupTheme;
  fieldset: FieldsetTheme;
  input: InputTheme;
  loader: LoaderTheme;
  menu: MenuTheme;
  message: MessageTheme;
  pagination: PaginationTheme;
  placeholder: PlaceholderTheme;
  radio: RadioTheme;
  rating: RatingTheme;
  select: SelectTheme;
  sliderField: SliderFieldTheme;
  stepperField: StepperFieldTheme;
  storageManager: StorageManagerTheme;
  switchField: SwitchFieldTheme;
  table: TableTheme;
  tabs: TabsTheme;
  textarea: TextareaTheme;
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
  DividerTheme,
  DropZoneTheme,
  FieldTheme,
  FieldGroupTheme,
  FieldsetTheme,
  InputTheme,
  LoaderTheme,
  MenuTheme,
  MessageTheme,
  PaginationTheme,
  PlaceholderTheme,
  RadioTheme,
  RatingTheme,
  SelectTheme,
  SliderFieldTheme,
  StepperFieldTheme,
  StorageManagerTheme,
  SwitchFieldTheme,
  TableTheme,
  TabsTheme,
  TextareaTheme,
  TextareaFieldTheme,
  ToggleButtonTheme,
  ToggleButtonGroupTheme,
};

export const alertClasses = createComponentClasses({ name: 'alert' });
export const accordionClasses = createComponentClasses({ name: 'accordion' });
export const autocompleteClasses = createComponentClasses({
  name: 'autocomplete',
});
export const badgeClasses = createComponentClasses({ name: 'badge' });
export const breadcrumbsClasses = createComponentClasses({
  name: 'breadcrumbs',
});
export const buttonClasses = createComponentClasses({ name: 'button' });
export const cardClasses = createComponentClasses({ name: 'card' });
export const checkboxClasses = createComponentClasses({ name: 'checkbox' });
export const collectionClasses = createComponentClasses({ name: 'collection' });
export const dividerClasses = createComponentClasses({ name: 'divider' });
export const dropZoneClasses = createComponentClasses({ name: 'dropzone' });
export const fieldClasses = createComponentClasses({ name: 'field' });
export const fieldGroupClasses = createComponentClasses({
  name: 'field-group',
});
export const fieldsetClasses = createComponentClasses({ name: 'fieldset' });
export const inputClasses = createComponentClasses({ name: 'input' });
export const loaderClasses = createComponentClasses({ name: 'loader' });
export const menuClasses = createComponentClasses({ name: 'menu' });
export const messageClasses = createComponentClasses({ name: 'message' });
export const paginationClasses = createComponentClasses({ name: 'pagination' });
export const placeholderClasses = createComponentClasses({
  name: 'placeholder',
});
export const radioClasses = createComponentClasses({ name: 'radio' });
export const ratingClasses = createComponentClasses({ name: 'rating' });
export const selectClasses = createComponentClasses({ name: 'select' });
export const sliderFieldClasses = createComponentClasses({
  name: 'sliderfield',
});
export const stepperFieldClasses = createComponentClasses({
  name: 'stepperfield',
});
export const storageManagerClasses = createComponentClasses({
  name: 'storagemanager',
});
export const switchFieldClasses = createComponentClasses({
  name: 'switchfield',
});
export const tabsClasses = createComponentClasses({ name: 'tabs' });
export const tableClasses = createComponentClasses({ name: 'table' });
export const textareaClasses = createComponentClasses({ name: 'textarea' });
export const textareaFieldClasses = createComponentClasses({
  name: 'textareafield',
});
export const toggleButtonClasses = createComponentClasses({
  name: 'togglebutton',
});
export const toggleButtonGroupClasses = createComponentClasses({
  name: 'togglebuttongroup',
});
