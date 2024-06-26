import { WebTokens } from '../tokens';
import { AccordionTheme } from './accordion';
import { AlertTheme } from './alert';
import { AutoCompleteTheme } from './autocomplete';
import { BadgeTheme } from './badge';
import { BreadcrumbsTheme } from './breadcrumbs';
import { ButtonTheme } from './button';
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
