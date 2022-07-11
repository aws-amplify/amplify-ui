import type { ComponentName } from '../types/catalog';

const baseURL = `https://developer.mozilla.org/en-US/docs/Web/HTML/Element`;

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
    url?: string;
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
    element: 'button',
  },
  CheckboxField: {
    element: 'input',
    url: `${baseURL}/input/checkbox`,
  },
  Collection: {
    element: 'div',
  },
  Divider: {
    element: 'hr',
  },
  Expander: {
    element: 'div',
  },
  Flex: {
    element: 'div',
  },
  Grid: {
    element: 'div',
  },
  // check this one
  Heading: {
    element: 'h1-h6',
    url: `${baseURL}/Heading_Elements`,
  },
  Icon: {
    element: 'svg',
    url: `https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg`,
  },
  Image: {
    element: 'img',
  },
  Link: {
    element: 'a',
  },
  Loader: {
    element: 'svg',
    url: `https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg`,
  },
  Menu: {
    element: 'div',
  },
  Pagination: {
    element: 'nav',
  },
  PasswordField: {
    element: 'input',
    url: `${baseURL}/input/password`,
  },
  PhoneNumberField: {
    element: 'input',
    url: `${baseURL}/input/tel`,
  },
  Placeholder: {
    element: 'div',
  },
  RadioGroupField: {
    element: 'input',
    url: `${baseURL}/input/radio`,
  },
  Rating: {
    element: 'div',
  },
  ScrollView: {
    element: 'div',
  },
  SearchField: {
    element: 'input',
    url: `${baseURL}/input/search`,
  },
  SelectField: {
    element: 'select',
  },
  SliderField: {
    element: 'span',
  },
  StepperField: {
    element: 'input',
    url: `${baseURL}/input/number`,
  },
  SwitchField: {
    element: 'input',
    url: `${baseURL}/input/checkbox`,
  },
  Table: {
    element: 'table',
  },
  Tabs: {
    element: 'div',
  },
  Text: {
    element: 'p',
  },
  TextAreaField: {
    element: 'textarea',
  },
  TextField: {
    element: 'textarea',
  },
  ToggleButton: {
    element: 'button',
  },
  View: {
    element: 'div',
  },
  VisuallyHidden: {
    element: 'span',
  },
};

export const getStandardHTMLAttributes = (displayName: string) => {
  console.log('display name: ', displayName);

  const { element, url } = standardHTMLAttributes[displayName];

  const MDNlink = `<Link href="${
    url || `${baseURL}/${element}`
  }" isExternal>MDN Documentation</Link>`;

  return `${displayName} will also accept any of the standard HTML attributes that a <code>${element}</code> accepts, which can be found in the ${MDNlink}.`;
};
