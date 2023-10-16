import { ComponentName } from '../types/catalog';

export const componentsWithChildren: {
  [key in ComponentName]?: ComponentName[];
} = {
  Expander: ['ExpanderItem'],
  Breadcrumbs: [
    'Breadcrumbs.Item',
    'Breadcrumbs.Link',
    'Breadcrumbs.Separator',
  ],
  Menu: ['MenuButton', 'MenuItem'],
  RadioGroupField: ['Radio'],
  Tabs: ['Tabs.Tab', 'Tabs.List', 'Tabs.Panel'],
  Table: ['TableBody', 'TableCell', 'TableFoot', 'TableHead', 'TableRow'],
  ToggleButton: ['ToggleButtonGroup'],
};
