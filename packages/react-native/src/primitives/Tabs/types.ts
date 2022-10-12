import { ViewProps, TextStyle } from 'react-native';

export interface TabsProps extends ViewProps {
  // only accepts Tab components as children
  children: React.ReactElement<TabProps>[];

  // should this be required until Tabs can also be an uncontrolled component?
  selectedIndex?: number;

  // should this be required until Tabs can also be an uncontrolled component?
  onChange?: (index: number) => void; // to update the selectedIndex

  spacing?: 'equal' | 'relative';

  indicatorPosition?: 'top' | 'bottom';
}

export interface TabProps extends ViewProps {
  title: string;
}

export interface TabsStyles {
  label: TextStyle;
}
