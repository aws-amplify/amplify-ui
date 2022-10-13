import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import { ButtonProps } from '../Button';

export interface TabsProps extends ViewProps {
  /**
   * @description
   * The Tabs component only accepts Tab components as children.
   */
  children: React.ReactElement<TabProps>[];

  /**
   * @description
   * Controls which Tab's content is initially displayed when using Tabs as an
   * uncontrolled component. Defaults to index 0 (the first Tab).
   */
  defaultIndex?: number;

  /**
   * @description
   * The controlled index of the currently selected Tab. This should be
   * used in tandem with `onChange` to use Tabs as a controlled component.
   */
  selectedIndex?: number;

  /**
   * @description
   * For controlled usage, use the `onChange` event to listen to when a Tab is
   * clicked and update the `selectedIndex` accordingly. The index of the Tab
   * clicked is passed to `onChange`.
   */
  onChange?: (index: number) => void;

  /**
   * @description
   * Styling for each Tab
   */
  tabStyle?: StyleProp<ViewStyle>;

  /**
   * @description
   * Styling for each Tab's text (title)
   */
  textStyle?: StyleProp<TextStyle>;
}

export interface TabProps extends ButtonProps {
  /**
   * @description
   * Sets the title corresponding with each Tab's content panel.
   */
  title: string;
}

export interface TabsStyles {
  container: ViewStyle;
  tabList: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  selected: ViewStyle;
}
