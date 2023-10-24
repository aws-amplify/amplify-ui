import * as React from 'react';

import {
  ElementType,
  PrimitiveProps,
  BaseViewProps,
  BaseFlexProps,
} from '../types';

export type TabsSpacing = 'equal' | 'relative';

export interface BaseTabsProps extends BaseTabsListProps {
  /**
   * @description
   * An array of tabs for easy use if you don't want to compose the
   * tabs yourself. Each object in the array should have a `value`,
   * `label`, and `content` property. The value is what will be passed to
   * `onValueChange` when a tab is clicked. The label is what will be displayed
   * on the tab. The content is what will be displayed when the tab is
   * clicked.
   *
   * @example
   * ```tsx
   * <Tabs
   *   items={[
   *     {
   *       value: 'tab-1',
   *       label: 'Tab 1',
   *       content: <div>Tab 1 content</div>,
   *     },
   *     {
   *       value: 'tab-2',
   *       label: 'Tab 2',
   *       content: <div>Tab 2 content</div>,
   *     },
   *   ]}
   */
  items?: Array<{
    value: string;
    isDisabled?: boolean;
    label: React.ReactNode;
    content: React.ReactNode;
  }>;
}

export type TabsProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseTabsProps,
  Element
>;

export interface BaseTabsItemProps extends BaseViewProps {
  /**
   * @description
   * Make a Tab not clickable and its content not visible to the user. Defaults to false (i.e., visible).
   */
  isDisabled?: boolean;

  /**
   * @description
   * Accepts any number of TabItem components
   */
  children?: React.ReactNode;

  value: string;
}
export type TabsItemProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseTabsItemProps, Element>;

export interface BaseTabsPanelProps extends BaseViewProps {
  value: string;
}

export type TabsPanelProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseTabsPanelProps, Element>;

export interface BaseTabsListProps extends BaseFlexProps {
  /**
   * @description
   * Change which Tab content is initially displayed. Pass in the index of the Tab you wish to show. The default is index 0 (the first tab).
   */
  defaultValue?: string;

  /**
   * @description
   * The controlled value of the currently selected tab.
   */
  value?: string;

  /**
   * @description
   * For controlled usage, use the onChange event to listen to when a tab is clicked
   * and update the `currentIndex` accordingly. The index of the tab clicked is passed
   * to onChange.
   */
  onValueChange?: (value: string) => void;

  /**
   * @description
   * Make the tabs lazy load the content. This means tab content will not render until it is
   * active. This does mean that it will be unmounted and re-mounted switching back and forth
   * between tabs.
   */
  isLazy?: boolean;

  /**
   * @description
   * Control how Tabs take up the remaining space. Pass `equal` to make each tab take up the same amount of space,
   * and `relative` to make each tab take up space relative to the size of its title.
   */
  spacing?: TabsSpacing;

  /**
   * @description
   * Sets the border and indicator of the tabs to be the top or bottom.
   */
  indicatorPosition?: 'top' | 'bottom';
}

export type TabsListProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseTabsListProps,
  Element
>;
