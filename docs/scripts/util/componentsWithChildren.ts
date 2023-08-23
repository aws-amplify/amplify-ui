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
  Message: [
    'Message.Container',
    'Message.Content',
    'Message.Dismiss',
    'Message.Heading',
    'Message.Icon',
  ],
  RadioGroupField: ['Radio'],
  Tabs: ['TabItem'],
  Table: ['TableBody', 'TableCell', 'TableFoot', 'TableHead', 'TableRow'],
  ToggleButton: ['ToggleButtonGroup'],
};
