import { ComponentName } from '../types/catalog';

export const componentsWithChildren: {
  [key in ComponentName]?: ComponentName[];
} = {
  Accordion: ['Accordion.Item'],
  Breadcrumbs: [
    'Breadcrumbs.Item',
    'Breadcrumbs.Link',
    'Breadcrumbs.Separator',
  ],
  Menu: ['MenuButton', 'MenuItem'],
  RadioGroupField: ['Radio'],
  Tabs: ['TabItem'],
  Table: ['TableBody', 'TableCell', 'TableFoot', 'TableHead', 'TableRow'],
  ToggleButton: ['ToggleButtonGroup'],
};
