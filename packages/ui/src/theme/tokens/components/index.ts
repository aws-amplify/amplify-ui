import type { AlertTokens } from './alert';
import { alert } from './alert';
import type { AIConversationTokens } from './aiConversation';
import { aiConversation } from './aiConversation';
import type { AutocompleteTokens } from './autocomplete';
import { autocomplete } from './autocomplete';
import type { AuthenticatorTokens } from './authenticator';
import { authenticator } from './authenticator';
import type { AvatarTokens } from './avatar';
import { avatar } from './avatar';
import type { BadgeTokens } from './badge';
import { badge } from './badge';
import type { BreadcrumbsTokens } from './breadcrumbs';
import { breadcrumbs } from './breadcrumbs';
import type { ButtonTokens } from './button';
import { button } from './button';
import type { CardTokens } from './card';
import { card } from './card';
import type { CheckboxTokens } from './checkbox';
import { checkbox } from './checkbox';
import type { CheckboxFieldTokens } from './checkboxField';
import { checkboxfield } from './checkboxField';
import type { CollectionTokens } from './collection';
import { collection } from './collection';
import type { CopyTokens } from './copy';
import { copy } from './copy';
import type { DialCodeSelectTokens } from './dialCodeSelect';
import { dialcodeselect } from './dialCodeSelect';
import type { DividerTokens } from './divider';
import { divider } from './divider';
import type { DropZoneTokens } from './dropZone';
import { dropzone } from './dropZone';
import type { AccordionTokens } from './accordion';
import { accordion } from './accordion';
import type { FieldTokens } from './field';
import { field } from './field';
import type { FieldControlTokens } from './fieldControl';
import { fieldcontrol } from './fieldControl';
import type { FieldGroupTokens } from './fieldGroup';
import { fieldgroup } from './fieldGroup';
import type { FieldsetTokens } from './fieldset';
import { fieldset } from './fieldset';
import type { FieldMessagesTokens } from './fieldMessages';
import { fieldmessages } from './fieldMessages';
import type { FileUploaderTokens } from './fileuploader';
import { fileuploader } from './fileuploader';
import type { FlexTokens } from './flex';
import { flex } from './flex';
import type { HeadingTokens } from './heading';
import { heading } from './heading';
import type { HighlightMatchTokens } from './highlightMatch';
import { highlightmatch } from './highlightMatch';
import type { IconTokens } from './icon';
import { icon } from './icon';
import type { InputTokens } from './input';
import { input } from './input';
import type { ImageTokens } from './image';
import { image } from './image';
import type { InAppMessagingTokens } from './inAppMessaging';
import { inappmessaging } from './inAppMessaging';
import type { LinkTokens } from './link';
import { link } from './link';
import type { LivenessTokens } from './liveness';
import { liveness } from './liveness';
import type { LoaderTokens } from './loader';
import { loader } from './loader';
import type { MenuTokens } from './menu';
import { menu } from './menu';
import type { MessageTokens } from './message';
import { message } from './message';
import type { PaginationTokens } from './pagination';
import { pagination } from './pagination';
import type { PasswordFieldTokens } from './passwordField';
import { passwordfield } from './passwordField';
import type { PhoneNumberFieldTokens } from './phoneNumberField';
import { phonenumberfield } from './phoneNumberField';
import type { PlaceholderTokens } from './placeholder';
import { placeholder } from './placeholder';
import type { RadioTokens } from './radio';
import { radio } from './radio';
import type { RadioGroupTokens } from './radioGroup';
import { radiogroup } from './radioGroup';
import type { RatingTokens } from './rating';
import { rating } from './rating';
import type { SearchFieldTokens } from './searchField';
import { searchfield } from './searchField';
import type { SelectTokens } from './select';
import { select } from './select';
import type { SelectFieldTokens } from './selectField';
import { selectfield } from './selectField';
import type { SliderFieldTokens } from './sliderField';
import { sliderfield } from './sliderField';
import type { StepperFieldTokens } from './stepperField';
import { stepperfield } from './stepperField';
import type { StorageManagerTokens } from './storagemanager';
import { storagemanager } from './storagemanager';
import type { SwitchFieldTokens } from './switchField';
import { switchfield } from './switchField';
import type { TableTokens } from './table';
import { table } from './table';
import type { TabsTokens } from './tabs';
import { tabs } from './tabs';
import type { TextTokens } from './text';
import { text } from './text';
import type { TextAreaFieldTokens } from './textAreaField';
import { textareafield } from './textAreaField';
import type { TextFieldTokens } from './textField';
import { textfield } from './textField';
import type { ToggleButtonTokens } from './toggleButton';
import { togglebutton } from './toggleButton';
import type { ToggleButtonGroupTokens } from './toggleButtonGroup';
import { togglebuttongroup } from './toggleButtonGroup';

import type { OutputVariantKey } from '../types/designToken';

type BaseComponentTokens<Output extends OutputVariantKey> = {
  accordion?: AccordionTokens<Output>;
  aiConversation?: AIConversationTokens<Output>;
  alert?: AlertTokens<Output>;
  authenticator?: AuthenticatorTokens<Output>;
  autocomplete?: AutocompleteTokens<Output>;
  avatar?: AvatarTokens<Output>;
  badge?: BadgeTokens<Output>;
  breadcrumbs?: BreadcrumbsTokens<Output>;
  button?: ButtonTokens<Output>;
  card?: CardTokens<Output>;
  checkbox?: CheckboxTokens<Output>;
  checkboxfield?: CheckboxFieldTokens<Output>;
  collection?: CollectionTokens<Output>;
  copy?: CopyTokens<Output>;
  countrycodeselect?: DialCodeSelectTokens<Output>;
  divider?: DividerTokens<Output>;
  dropzone?: DropZoneTokens<Output>;
  field?: FieldTokens<Output>;
  fieldset?: FieldsetTokens<Output>;
  fieldcontrol?: FieldControlTokens<Output>;
  fieldgroup?: FieldGroupTokens<Output>;
  fieldmessages?: FieldMessagesTokens<Output>;
  fileuploader?: FileUploaderTokens<Output>;
  flex?: FlexTokens<Output>;
  heading?: HeadingTokens<Output>;
  highlightmatch?: HighlightMatchTokens<Output>;
  icon?: IconTokens<Output>;
  image?: ImageTokens<Output>;
  inappmessaging?: InAppMessagingTokens<Output>;
  input?: InputTokens<Output>;
  link?: LinkTokens<Output>;
  liveness?: LivenessTokens<Output>;
  loader?: LoaderTokens<Output>;
  menu?: MenuTokens<Output>;
  message?: MessageTokens<Output>;
  pagination?: PaginationTokens<Output>;
  passwordfield?: PasswordFieldTokens<Output>;
  phonenumberfield?: PhoneNumberFieldTokens<Output>;
  placeholder?: PlaceholderTokens<Output>;
  radio?: RadioTokens<Output>;
  radiogroup?: RadioGroupTokens<Output>;
  rating?: RatingTokens<Output>;
  searchfield?: SearchFieldTokens<Output>;
  select?: SelectTokens<Output>;
  selectfield?: SelectFieldTokens<Output>;
  sliderfield?: SliderFieldTokens<Output>;
  stepperfield?: StepperFieldTokens<Output>;
  storagemanager?: StorageManagerTokens<Output>;
  switchfield?: SwitchFieldTokens<Output>;
  table?: TableTokens<Output>;
  tabs?: TabsTokens<Output>;
  text?: TextTokens<Output>;
  textareafield?: TextAreaFieldTokens<Output>;
  textfield?: TextFieldTokens<Output>;
  togglebutton?: ToggleButtonTokens<Output>;
  togglebuttongroup?: ToggleButtonGroupTokens<Output>;
};

export type ComponentTokens = BaseComponentTokens<'optional'>;

export type DefaultComponentTokens = Required<{
  [Key in keyof ComponentTokens]: Required<BaseComponentTokens<'default'>[Key]>;
}>;

export type WebComponentTokens = Required<{
  [Key in keyof ComponentTokens]: Required<
    BaseComponentTokens<'required'>[Key]
  >;
}>;

export const components: DefaultComponentTokens = {
  accordion,
  aiConversation,
  alert,
  authenticator,
  autocomplete,
  avatar,
  badge,
  breadcrumbs,
  button,
  card,
  checkbox,
  checkboxfield,
  collection,
  copy,
  countrycodeselect: dialcodeselect, // This to be renamed to dialcodeselect in the next major version
  divider,
  dropzone,
  field,
  fieldcontrol,
  fieldgroup,
  fieldmessages,
  fieldset,
  fileuploader,
  flex,
  heading,
  icon,
  highlightmatch,
  image,
  inappmessaging,
  input,
  link,
  liveness,
  loader,
  menu,
  message,
  pagination,
  passwordfield,
  phonenumberfield,
  placeholder,
  radio,
  radiogroup,
  rating,
  searchfield,
  select,
  selectfield,
  sliderfield,
  stepperfield,
  storagemanager,
  switchfield,
  table,
  tabs,
  text,
  textareafield,
  textfield,
  togglebutton,
  togglebuttongroup,
};
