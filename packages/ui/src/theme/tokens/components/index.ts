import { Alert, alert } from './alert';
import { authenticator } from './authenticator';
import { badge } from './badge';
import { button } from './button';
import { card } from './card';
import { checkbox } from './checkbox';
import { checkboxfield } from './checkboxField';
import { copy } from './copy';
import { countrycodeselect } from './countryCodeSelect';
import { divider } from './divider';
import { expander } from './expander';
import { field } from './field';
import { fieldcontrol } from './fieldControl';
import { fieldgroup } from './fieldGroup';
import { fieldmessages } from './fieldMessages';
import { flex } from './flex';
import { heading } from './heading';
import { icon } from './icon';
import { image } from './image';
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
  alert: Alert;
  authenticator: any; // TODO type this
  badge: any;
  button: any;
  card: any;
  checkbox: any;
  checkboxfield: any;
  copy: any;
  countrycodeselect: any;
  divider: any;
  expander: any;
  field: any;
  fieldcontrol: any;
  fieldgroup: any;
  fieldmessages: any;
  flex: any;
  heading: any;
  icon: any;
  image: any;
  link: any;
  loader: any;
  menu: any;
  pagination: any;
  phonenumberfield: any;
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
  phonenumberfield,
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
