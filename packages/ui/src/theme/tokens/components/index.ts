import { AlertTokens, alert } from './alert';
import { AutocompleteTokens, autocomplete } from './autocomplete';
import { AuthenticatorTokens, authenticator } from './authenticator';
import { AvatarTokens, avatar } from './avatar';
import { badge, BadgeTokens } from './badge';
import { breadcrumbs, BreadcrumbsTokens } from './breadcrumbs';
import { button, ButtonTokens } from './button';
import { card, CardTokens } from './card';
import { checkbox, CheckboxTokens } from './checkbox';
import { checkboxfield, CheckboxFieldTokens } from './checkboxField';
import { collection, CollectionTokens } from './collection';
import { copy, CopyTokens } from './copy';
import { dialcodeselect, DialCodeSelectTokens } from './dialCodeSelect';
import { divider, DividerTokens } from './divider';
import { dropzone, DropZoneTokens } from './dropZone';
import { accordion, AccordionTokens } from './accordion';
import { field, FieldTokens } from './field';
import { fieldcontrol, FieldControlTokens } from './fieldControl';
import { fieldgroup, FieldGroupTokens } from './fieldGroup';
import { fieldset, FieldsetTokens } from './fieldset';
import { fieldmessages, FieldMessagesTokens } from './fieldMessages';
import { fileuploader, FileUploaderTokens } from './fileuploader';
import { flex, FlexTokens } from './flex';
import { heading, HeadingTokens } from './heading';
import { highlightmatch, HighlightMatchTokens } from './highlightMatch';
import { icon, IconTokens } from './icon';
import { input, InputTokens } from './input';
import { image, ImageTokens } from './image';
import { inappmessaging, InAppMessagingTokens } from './inAppMessaging';
import { link, LinkTokens } from './link';
import { liveness, LivenessTokens } from './liveness';
import { loader, LoaderTokens } from './loader';
import { menu, MenuTokens } from './menu';
import { message, MessageTokens } from './message';
import { pagination, PaginationTokens } from './pagination';
import { passwordfield, PasswordFieldTokens } from './passwordField';
import { phonenumberfield, PhoneNumberFieldTokens } from './phoneNumberField';
import { placeholder, PlaceholderTokens } from './placeholder';
import { radio, RadioTokens } from './radio';
import { radiogroup, RadioGroupTokens } from './radioGroup';
import { rating, RatingTokens } from './rating';
import { searchfield, SearchFieldTokens } from './searchField';
import { select, SelectTokens } from './select';
import { selectfield, SelectFieldTokens } from './selectField';
import { sliderfield, SliderFieldTokens } from './sliderField';
import { stepperfield, StepperFieldTokens } from './stepperField';
import { storagemanager, StorageManagerTokens } from './storagemanager';
import { switchfield, SwitchFieldTokens } from './switchField';
import { table, TableTokens } from './table';
import { tabs, TabsTokens } from './tabs';
import { text, TextTokens } from './text';
import { textareafield, TextAreaFieldTokens } from './textAreaField';
import { textfield, TextFieldTokens } from './textField';
import { togglebutton, ToggleButtonTokens } from './toggleButton';
import {
  togglebuttongroup,
  ToggleButtonGroupTokens,
} from './toggleButtonGroup';

import { OutputVariantKey } from '../types/designToken';

type BaseComponentTokens<Output extends OutputVariantKey> = {
  accordion?: AccordionTokens<Output>;
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
