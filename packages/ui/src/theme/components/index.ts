import type { WebTokens } from '../tokens';
import type { AIConversationTheme } from './aiConverstion';
import type { AccordionTheme } from './accordion';
import type { AlertTheme } from './alert';
import type { AutoCompleteTheme } from './autocomplete';
import type { AvatarTheme } from './avatar';
import type { BadgeTheme } from './badge';
import type { BreadcrumbsTheme } from './breadcrumbs';
import type { ButtonTheme } from './button';
import type { ButtonGroupTheme } from './buttonGroup';
import type { CardTheme } from './card';
import type { CheckboxTheme } from './checkbox';
import type { CheckboxFieldTheme } from './checkboxField';
import type { CollectionTheme } from './collection';
import type { DividerTheme } from './divider';
import type { DropZoneTheme } from './dropZone';
import type { FieldTheme } from './field';
import type { FieldGroupTheme } from './fieldGroup';
import type { FieldsetTheme } from './fieldset';
import type { FileUploaderTheme } from './fileUploader';
import type { HeadingTheme } from './heading';
import type { HighlightMatchTheme } from './highlightMatch';
import type { InputTheme } from './input';
import type { LoaderTheme } from './loader';
import type { MenuTheme } from './menu';
import type { MessageTheme } from './message';
import type { PaginationTheme } from './pagination';
import type { PlaceholderTheme } from './placeholder';
import type { RadioTheme } from './radio';
import type { RatingTheme } from './rating';
import type { ScrollViewTheme } from './scrollview';
import type { SearchFieldTheme } from './searchField';
import type { SelectTheme } from './select';
import type { SelectFieldTheme } from './selectField';
import type { SliderFieldTheme } from './sliderField';
import type { StepperFieldTheme } from './stepperField';
import type { StorageBrowserTheme } from './storageBrowser';
import type { StorageManagerTheme } from './storageManager';
import type { SwitchFieldTheme, SwitchTheme } from './switchField';
import type { TableTheme } from './table';
import type { TabsTheme } from './tabs';
import type { TextTheme } from './text';
import type { TextFieldTheme } from './textField';
import type { TextareaTheme } from './textarea';
import type { TextareaFieldTheme } from './textareaField';
import type { ToggleButtonTheme, ToggleButtonGroupTheme } from './toggleButton';
import type { ComponentTheme, BaseComponentTheme, BaseTheme } from './utils';
export type { ClassNameFunction } from '../createTheme/createComponentClasses';
export type { ComponentTheme, BaseComponentTheme, BaseTheme };

// Union type of all built-in component themes and base theme
// for the createTheme function
export type ComponentsTheme<TokensType extends WebTokens = WebTokens> =
  | BaseComponentTheme<BaseTheme, string, TokensType>
  | BaseComponentTheme<AccordionTheme, 'accordion', TokensType>
  | BaseComponentTheme<AIConversationTheme, 'ai-conversation', TokensType>
  | BaseComponentTheme<AlertTheme, 'alert', TokensType>
  | BaseComponentTheme<AutoCompleteTheme, 'autocomplete', TokensType>
  | BaseComponentTheme<AvatarTheme, 'avatar', TokensType>
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
  | BaseComponentTheme<FileUploaderTheme, 'fileuploader', TokensType>
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
  | BaseComponentTheme<StorageBrowserTheme, 'storage-browser', TokensType>
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
  'ai-conversation': AIConversationTheme;
  alert: AlertTheme;
  autocomplete: AutoCompleteTheme;
  avatar: AvatarTheme;
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
  fileuploader: FileUploaderTheme;
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
  'storage-browser': StorageBrowserTheme;
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
