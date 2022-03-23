import { AlertTokens, alert } from './alert';
import { AuthenticatorTokens, authenticator } from './authenticator';
import { badge, BadgeTokens } from './badge';
import { button, ButtonTokens } from './button';
import { card, CardTokens } from './card';
import { checkbox, CheckboxTokens } from './checkbox';
import { checkboxfield, CheckboxFieldTokens } from './checkboxField';
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
import { link } from './link';
import { loader } from './loader';
import { menu } from './menu';
import { pagination } from './pagination';
import { phonenumberfield } from './phoneNumberField';
import { placeholder } from './placeholder';
import { radio } from './radio';
import { rating } from './rating';
import { select } from './select';
import { selectfield } from './selectField';
import { sliderfield } from './sliderField';
import { stepperfield } from './stepperField';
import { switchfield } from './switchField';
import { table } from './table';
import { tabs } from './tabs';
import { text } from './text';
import { togglebutton } from './toggleButton';
import { togglebuttongroup } from './toggleButtonGroup';

export interface Components {
  alert: AlertTokens;
  authenticator: AuthenticatorTokens;
  badge: BadgeTokens;
  button: ButtonTokens;
  card: CardTokens;
  checkbox: CheckboxTokens;
  checkboxfield: CheckboxFieldTokens;
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
  link: any;
  loader: any;
  menu: any;
  pagination: any;
  placeholder: any;
  radio: any;
  rating: any;
  select: any;
  selectfield: any;
  sliderfield: any;
  stepperfield: any;
  switchfield: any;
  table: any;
  tabs: any;
  text: any;
  togglebutton: any;
  togglebuttongroup: any;
}

export const components: Components = {
  alert,
  authenticator,
  badge,
  button,
  card,
  checkbox,
  checkboxfield,
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
  placeholder,
  radio,
  rating,
  select,
  selectfield,
  sliderfield,
  stepperfield,
  switchfield,
  table,
  tabs,
  text,
  togglebutton,
  togglebuttongroup,
};
