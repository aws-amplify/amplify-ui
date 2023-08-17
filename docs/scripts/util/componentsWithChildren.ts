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
    'MessageContent',
    'MessageDismiss',
    'MessageHeading',
    'MessageIcon',
  ],
  RadioGroupField: ['Radio'],
  Tabs: ['TabItem'],
  Table: ['TableBody', 'TableCell', 'TableFoot', 'TableHead', 'TableRow'],
  ToggleButton: ['ToggleButtonGroup'],
};
