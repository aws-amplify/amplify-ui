import { AlertTokens, alert } from './alert';
import { AuthenticatorTokens, authenticator } from './authenticator';
import { badge, BadgeTokens } from './badge';
import { button, ButtonTokens } from './button';
import { card, CardTokens } from './card';
import { checkbox, CheckboxTokens } from './checkbox';
import { checkboxfield, CheckboxFieldTokens } from './checkboxField';
import { collection, CollectionTokens } from './collection';
import { copy, CopyTokens } from './copy';
import {
  countrycodeselect,
  CountryCodeSelectTokens,
} from './countryCodeSelect';
import { divider, DividerTokens } from './divider';
import { expander, ExpanderTokens } from './expander';
import { field, FieldTokens } from './field';
import { fieldcontrol, FieldControlTokens } from './fieldControl';
import { fieldgroup, FieldGroupTokens } from './fieldGroup';
import { fieldmessages, FieldMessagesTokens } from './fieldMessages';
import { flex, FlexTokens } from './flex';
import { heading, HeadingTokens } from './heading';
import { icon, IconTokens } from './icon';
import { image, ImageTokens } from './image';
import { link, LinkTokens } from './link';
import { loader, LoaderTokens } from './loader';
import { menu, MenuTokens } from './menu';
import { pagination, PaginationTokens } from './pagination';
import { passwordfield, PasswordFieldTokens } from './passwordField';
import { placeholder, PlaceholderTokens } from './placeholder';
import { radio, RadioTokens } from './radio';
import { rating, RatingTokens } from './rating';
import { searchfield, SearchFieldTokens } from './searchField';
import { select, SelectTokens } from './select';
import { selectfield, SelectFieldTokens } from './selectField';
import { sliderfield, SliderFieldTokens } from './sliderField';
import { stepperfield, StepperFieldTokens } from './stepperField';
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

export interface ComponentTokens {
  alert: AlertTokens;
  authenticator: AuthenticatorTokens;
  badge: BadgeTokens;
  button: ButtonTokens;
  card: CardTokens;
  checkbox: CheckboxTokens;
  checkboxfield: CheckboxFieldTokens;
  collection: CollectionTokens;
  copy: CopyTokens;
  countrycodeselect: CountryCodeSelectTokens;
  divider: DividerTokens;
  expander: ExpanderTokens;
  field: FieldTokens;
  fieldcontrol: FieldControlTokens;
  fieldgroup: FieldGroupTokens;
  fieldmessages: FieldMessagesTokens;
  flex: FlexTokens;
  heading: HeadingTokens;
  icon: IconTokens;
  image: ImageTokens;
  link: LinkTokens;
  loader: LoaderTokens;
  menu: MenuTokens;
  pagination: PaginationTokens;
  passwordfield: PasswordFieldTokens;
  placeholder: PlaceholderTokens;
  radio: RadioTokens;
  rating: RatingTokens;
  searchfield: SearchFieldTokens;
  select: SelectTokens;
  selectfield: SelectFieldTokens;
  sliderfield: SliderFieldTokens;
  stepperfield: StepperFieldTokens;
  switchfield: SwitchFieldTokens;
  table: TableTokens;
  tabs: TabsTokens;
  text: TextTokens;
  textareafield: TextAreaFieldTokens;
  textfield: TextFieldTokens;
  togglebutton: ToggleButtonTokens;
  togglebuttongroup: ToggleButtonGroupTokens;
}

export const components: ComponentTokens = {
  alert,
  authenticator,
  badge,
  button,
  card,
  checkbox,
  checkboxfield,
  collection,
  copy,
  countrycodeselect,
  divider,
  expander,
  field,
  fieldcontrol,
  fieldgroup,
  fieldmessages,
  flex,
  heading,
  icon,
  image,
  link,
  loader,
  menu,
  pagination,
  passwordfield,
  placeholder,
  radio,
  rating,
  searchfield,
  select,
  selectfield,
  sliderfield,
  stepperfield,
  switchfield,
  table,
  tabs,
  text,
  textareafield,
  textfield,
  togglebutton,
  togglebuttongroup,
};
