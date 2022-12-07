import { TextStyle, ViewProps, ViewStyle } from 'react-native';

import { ButtonProps } from '../Button';

type IndicatorPosition = 'top' | 'bottom';

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

  /**
   * @description
   * Sets the border and indicator of the tabs to be the top or bottom.
   */
  indicatorPosition?: IndicatorPosition;
}

export interface TabProps extends ButtonProps {
  /**
   * @description
   * Indicates if a Tab is currently selected
   */
  selected?: boolean;
  indicatorPosition?: IndicatorPosition;
}

export interface TabsStyles {
  pressed?: ViewStyle;
  readonly?: ViewStyle;
  selected?: ViewStyle;
  tabList?: ViewStyle;
  tab?: ViewStyle;
  tabText?: TextStyle;
}
