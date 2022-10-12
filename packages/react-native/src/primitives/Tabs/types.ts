import { TextStyle, ViewProps, ViewStyle } from 'react-native';
import { ButtonProps } from '../Button';

export interface TabsProps extends ViewProps {
  // only accepts Tab components as children
  children: React.ReactElement<TabProps>[];

  // should this be required until Tabs can also be an uncontrolled component?
  selectedIndex?: number;

  // should this be required until Tabs can also be an uncontrolled component?
  onChange?: (index: number) => void; // to update the selectedIndex

  // relative spacing could be accomplished through flexGrow: 1
  spacing?: 'equal' | 'relative';

  indicatorPosition?: 'top' | 'bottom';
}

export interface TabProps extends ButtonProps {
  title: string;
}

export interface TabsStyles {
  container: ViewStyle;
  tabList: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  selected: ViewStyle;
}
