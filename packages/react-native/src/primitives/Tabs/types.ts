import { TextStyle, ViewProps, ViewStyle } from 'react-native';

import { ButtonProps } from '../Button';

export interface TabsProps extends ViewProps {
  /**
   * @description
   * The Tabs component only accepts Tab components as children.
   */
  children: React.ReactElement<TabProps>[];

  /**
   * @description
   * For controlled usage, use the `onChange` event to listen to when a Tab is
   * clicked and update the `selectedIndex` accordingly. The index of the Tab
   * clicked is passed to `onChange`.
   */
  onChange?: (index: number) => void;

  /**
   * @description
   * The controlled index of the currently selected Tab. This should be
   * used in tandem with `onChange` to use Tabs as a controlled component.
   */
  selectedIndex?: number;
}

export interface TabProps extends ButtonProps {
  /**
   * @description
   * Indicates if a Tab is currently selected
   */
  selected?: boolean;
}

export interface TabsStyles {
  tabList: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  selected: ViewStyle;
}
