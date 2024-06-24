import { createComponentClasses } from '../createTheme';
import { WebTokens } from '../tokens';
import { AccordionTheme } from './accordion';
import { AlertTheme } from './alert';
import { AutoCompleteTheme } from './autocomplete';
import { BadgeTheme } from './badge';
import { BreadcrumbsTheme } from './breadcrumbs';
import { ButtonTheme, ButtonColorThemeVariations } from './button';
import { ButtonGroupTheme } from './buttonGroup';
import { CardTheme } from './card';
import { CheckboxTheme } from './checkbox';
import { CheckboxFieldTheme } from './checkboxField';
import { CollectionTheme } from './collection';
import { DividerTheme } from './divider';
import { DropZoneTheme } from './dropZone';
import { FieldTheme } from './field';
import { FieldGroupTheme } from './fieldGroup';
import { FieldsetTheme } from './fieldset';
import { HeadingTheme } from './heading';
import { HighlightMatchTheme } from './highlightMatch';
import { InputTheme } from './input';
import { LoaderTheme } from './loader';
import { MenuTheme } from './menu';
import { MessageTheme } from './message';
import { PaginationTheme } from './pagination';
import { PlaceholderTheme } from './placeholder';
import { RadioTheme } from './radio';
import { RatingTheme } from './rating';
import { ScrollViewTheme } from './scrollview';
import { SearchFieldTheme } from './searchField';
import { SelectTheme } from './select';
import { SelectFieldTheme } from './selectField';
import { SliderFieldTheme } from './sliderField';
import { StepperFieldTheme } from './stepperField';
import { StorageManagerTheme } from './storageManager';
import { SwitchFieldTheme, SwitchTheme } from './switchField';
import { TableTheme } from './table';
import { TabsTheme } from './tabs';
import { TextTheme } from './text';
import { TextFieldTheme } from './textField';
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
  | BaseComponentTheme<ButtonGroupTheme, 'buttongroup', TokensType>
  | BaseComponentTheme<CardTheme, 'card', TokensType>
  | BaseComponentTheme<CheckboxTheme, 'checkbox', TokensType>
  | BaseComponentTheme<CheckboxFieldTheme, 'checkboxfield', TokensType>
  | BaseComponentTheme<CollectionTheme, 'collection', TokensType>
  | BaseComponentTheme<DividerTheme, 'divider', TokensType>
  | BaseComponentTheme<DropZoneTheme, 'dropzone', TokensType>
  | BaseComponentTheme<FieldTheme, 'field', TokensType>
  | BaseComponentTheme<FieldGroupTheme, 'field-group', TokensType>
  | BaseComponentTheme<FieldsetTheme, 'fieldset', TokensType>
  | BaseComponentTheme<HeadingTheme, 'heading', TokensType>
  | BaseComponentTheme<HighlightMatchTheme, 'highlightmatch', TokensType>
  | BaseComponentTheme<InputTheme, 'input', TokensType>
  | BaseComponentTheme<LoaderTheme, 'loader', TokensType>
  | BaseComponentTheme<MenuTheme, 'menu', TokensType>
  | BaseComponentTheme<MessageTheme, 'message', TokensType>
  | BaseComponentTheme<PaginationTheme, 'pagination', TokensType>
  | BaseComponentTheme<PlaceholderTheme, 'placeholder', TokensType>
  | BaseComponentTheme<RatingTheme, 'rating', TokensType>
  | BaseComponentTheme<RadioTheme, 'radio', TokensType>
  | BaseComponentTheme<ScrollViewTheme, 'scrollview', TokensType>
  | BaseComponentTheme<SearchFieldTheme, 'searchfield', TokensType>
  | BaseComponentTheme<SelectTheme, 'select', TokensType>
  | BaseComponentTheme<SelectFieldTheme, 'selectfield', TokensType>
  | BaseComponentTheme<SliderFieldTheme, 'sliderfield', TokensType>
  | BaseComponentTheme<StepperFieldTheme, 'stepperfield', TokensType>
  | BaseComponentTheme<StorageManagerTheme, 'storagemanager', TokensType>
  | BaseComponentTheme<SwitchTheme, 'switch', TokensType>
  | BaseComponentTheme<SwitchFieldTheme, 'switchfield', TokensType>
  | BaseComponentTheme<TabsTheme, 'tabs', TokensType>
  | BaseComponentTheme<TableTheme, 'table', TokensType>
  | BaseComponentTheme<TextTheme, 'text', TokensType>
  | BaseComponentTheme<TextareaTheme, 'textarea', TokensType>
  | BaseComponentTheme<TextareaFieldTheme, 'textareafield', TokensType>
  | BaseComponentTheme<TextFieldTheme, 'textfield', TokensType>
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
  buttongroup: ButtonGroupTheme;
  card: CardTheme;
  checkbox: CheckboxTheme;
  checkboxfield: CheckboxFieldTheme;
  collection: CollectionTheme;
  divider: DividerTheme;
  dropZone: DropZoneTheme;
  field: FieldTheme;
  'field-group': FieldGroupTheme;
  fieldset: FieldsetTheme;
  heading: HeadingTheme;
  highlightmatch: HighlightMatchTheme;
  input: InputTheme;
  loader: LoaderTheme;
  menu: MenuTheme;
  message: MessageTheme;
  pagination: PaginationTheme;
  placeholder: PlaceholderTheme;
  radio: RadioTheme;
  rating: RatingTheme;
  scrollview: ScrollViewTheme;
  searchfield: SearchFieldTheme;
  select: SelectTheme;
  selectfield: SelectFieldTheme;
  sliderfield: SliderFieldTheme;
  stepperfield: StepperFieldTheme;
  storagemanager: StorageManagerTheme;
  switch: SwitchTheme;
  switchfield: SwitchFieldTheme;
  table: TableTheme;
  tabs: TabsTheme;
  text: TextTheme;
  textarea: TextareaTheme;
  textareaField: TextareaFieldTheme;
  textField: TextFieldTheme;
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
  ButtonColorThemeVariations,
  ButtonGroupTheme,
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
  ScrollViewTheme,
  SearchFieldTheme,
  SelectTheme,
  SliderFieldTheme,
  StepperFieldTheme,
  StorageManagerTheme,
  SwitchTheme,
  SwitchFieldTheme,
  TableTheme,
  TabsTheme,
  TextTheme,
  TextareaTheme,
  TextareaFieldTheme,
  TextFieldTheme,
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
export const buttonGroupClasses = createComponentClasses({
  name: 'buttongroup',
});
export const cardClasses = createComponentClasses({ name: 'card' });
export const checkboxClasses = createComponentClasses({ name: 'checkbox' });
export const checkboxFieldClasses = createComponentClasses({
  name: 'checkboxfield',
});
export const collectionClasses = createComponentClasses({ name: 'collection' });
export const dialcodeselectClasses = createComponentClasses({
  name: 'dialcodeselect',
});
export const countrycodeselectClasses = createComponentClasses({
  name: 'countrycodeselect',
});
export const dividerClasses = createComponentClasses({ name: 'divider' });
export const dropZoneClasses = createComponentClasses({ name: 'dropzone' });
export const fieldClasses = createComponentClasses({ name: 'field' });
export const fieldGroupClasses = createComponentClasses({
  name: 'field-group',
});
export const fieldsetClasses = createComponentClasses({ name: 'fieldset' });
export const flexClasses = createComponentClasses({ name: 'flex' });
export const inputClasses = createComponentClasses({ name: 'input' });
export const headingClasses = createComponentClasses({ name: 'heading' });
export const highlightMatchClasses = createComponentClasses({
  name: 'highlightmatch',
});
export const loaderClasses = createComponentClasses({ name: 'loader' });
export const menuClasses = createComponentClasses({ name: 'menu' });
export const messageClasses = createComponentClasses({ name: 'message' });
export const paginationClasses = createComponentClasses({ name: 'pagination' });
export const placeholderClasses = createComponentClasses({
  name: 'placeholder',
});
export const radioClasses = createComponentClasses({ name: 'radio' });
export const radioGroupClasses = createComponentClasses({ name: 'radiogroup' });
export const radioGroupFieldClasses = createComponentClasses({
  name: 'radiogroupfield',
});
export const ratingClasses = createComponentClasses({ name: 'rating' });
export const searchfieldClasses = createComponentClasses({
  name: 'searchfield',
});
export const selectClasses = createComponentClasses({ name: 'select' });
export const selectfieldClasses = createComponentClasses({
  name: 'selectfield',
});
export const sliderFieldClasses = createComponentClasses({
  name: 'sliderfield',
});
export const stepperFieldClasses = createComponentClasses({
  name: 'stepperfield',
});
export const storageImageClasses = createComponentClasses({
  name: 'storageimage',
});
export const storageManagerClasses = createComponentClasses({
  name: 'storagemanager',
});
export const switchClasses = createComponentClasses({
  name: 'switch',
});
export const switchFieldClasses = createComponentClasses({
  name: 'switchfield',
});
export const tabsClasses = createComponentClasses({ name: 'tabs' });
export const tableClasses = createComponentClasses({ name: 'table' });
export const textClasses = createComponentClasses({ name: 'text' });
export const textareaClasses = createComponentClasses({ name: 'textarea' });
export const textareaFieldClasses = createComponentClasses({
  name: 'textareafield',
});
export const textFieldClasses = createComponentClasses({ name: 'textfield' });
export const toggleButtonClasses = createComponentClasses({
  name: 'togglebutton',
});
export const toggleButtonGroupClasses = createComponentClasses({
  name: 'togglebuttongroup',
});

// Components that don't have any modifiers/elements
// we don't need a theme and can just use the createComponentClasses
// to get the proper component classname
export const changePasswordClasses = createComponentClasses({
  name: 'accountsettings-changepassword',
});
export const deleteUserClasses = createComponentClasses({
  name: 'accountsettings-deleteuser',
});
export const gridClasses = createComponentClasses({ name: 'grid' });
export const iconClasses = createComponentClasses({ name: 'icon' });
export const imageClasses = createComponentClasses({ name: 'image' });
export const labelClasses = createComponentClasses({ name: 'label' });
export const linkClasses = createComponentClasses({ name: 'link' });
export const passwordFieldClasses = createComponentClasses({
  name: 'passwordfield',
});
export const phonenumberFieldClasses = createComponentClasses({
  name: 'phonenumberfield',
});
export const scrollviewClasses = createComponentClasses({ name: 'scrollview' });
export const visuallyHiddenClasses = createComponentClasses({
  name: 'visually-hidden',
});
