import { ComponentName } from '../types/catalog';

export const componentsWithChildren: {
  [key in ComponentName]?: ComponentName[];
} = {
  Expander: ['ExpanderItem'],
  Breadcrumbs: ['Breadcrumbs.Item', 'Breadcrumbs.Link'],
  Menu: ['MenuButton', 'MenuItem'],
  RadioGroupField: ['Radio'],
  Tabs: ['TabItem'],
  Table: ['TableBody', 'TableCell', 'TableFoot', 'TableHead', 'TableRow'],
  ToggleButton: ['ToggleButtonGroup'],
};
