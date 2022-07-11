import type { ComponentName } from '../types/catalog';

type ComponentNames = Exclude<
  ComponentName,
  | 'ButtonGroup'
  | 'ExpanderItem'
  | 'FieldGroupIcon'
  | 'FieldGroupIconButton'
  | 'MenuButton'
  | 'MenuItem'
  | 'Radio'
  | 'TabItem'
  | 'ToggleButtonGroup'
  | 'TableBody'
  | 'TableCell'
  | 'TableFoot'
  | 'TableHead'
  | 'TableRow'
>;

type StandardHTMLAttributes = {
  [key in ComponentNames]: {
    element: string;
    link?: string;
  };
};

const standardHTMLAttributes: StandardHTMLAttributes = {
  Alert: {
    element: 'div',
  },
  Badge: {
    element: 'span',
  },
  Card: {
    element: 'div',
  },
  Button: {
    element: '',
    link: '',
  },
  CheckboxField: {
    element: '',
    link: '',
  },
  Collection: {
    element: '',
    link: '',
  },
  Divider: {
    element: '',
    link: '',
  },
  Expander: {
    element: '',
    link: '',
  },
  Flex: {
    element: '',
    link: '',
  },
  Grid: {
    element: '',
    link: '',
  },
  Heading: {
    element: '',
    link: '',
  },
  Icon: {
    element: '',
    link: '',
  },
  Image: {
    element: '',
    link: '',
  },
  Link: {
    element: '',
    link: '',
  },
  Loader: {
    element: '',
    link: '',
  },
  Menu: {
    element: '',
    link: '',
  },
  Pagination: {
    element: '',
    link: '',
  },
  PasswordField: {
    element: '',
    link: '',
  },
  PhoneNumberField: {
    element: '',
    link: '',
  },
  Placeholder: {
    element: '',
    link: '',
  },
  RadioGroupField: {
    element: '',
    link: '',
  },
  Rating: {
    element: '',
    link: '',
  },
  ScrollView: {
    element: '',
    link: '',
  },
  SearchField: {
    element: '',
    link: '',
  },
  SelectField: {
    element: '',
    link: '',
  },
  SliderField: {
    element: '',
    link: '',
  },
  StepperField: {
    element: '',
    link: '',
  },
  SwitchField: {
    element: '',
    link: '',
  },
  Table: {
    element: '',
    link: '',
  },
  Tabs: {
    element: '',
    link: '',
  },
  Text: {
    element: '',
    link: '',
  },
  TextAreaField: {
    element: '',
    link: '',
  },
  TextField: {
    element: '',
    link: '',
  },
  ToggleButton: {
    element: '',
    link: '',
  },
  View: {
    element: '',
    link: '',
  },
  VisuallyHidden: {
    element: '',
    link: '',
  },
};

export const getStandardHTMLAttributes = (displayName: string) => {
  console.log('display name: ', displayName);

  const { element, link } = standardHTMLAttributes[displayName];

  const MDNlink = `<Link href="${
    link ||
    `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${element}`
  }" isExternal>MDN Documentation</Link>`;

  return `${displayName} will also accept any of the standard HTML attributes that a <code>${element}</code> accepts, which can be found in the ${MDNlink}.`;
};
