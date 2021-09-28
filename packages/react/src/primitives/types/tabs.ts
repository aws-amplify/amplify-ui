import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';
import { FlexContainerStyleProps } from './flex';
import React from 'react';

export type TabsSpacing = 'equal' | 'relative';

export interface TabsProps
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps,
    FlexContainerStyleProps {
  /**
   * The Tabs component only accepts TabItem components as children.
   */
  children: React.ReactElement | React.ReactElement[];

  /**
   * Change which Tab content is initially displayed. Pass in the index of the Tab you wish to show. The default is index 0 (the first tab).
   */
  defaultIndex?: number | string;

  /**
   * The controlled index of the currently selected tab. This should be used with
   * `onChange` as well to make the component controlled.
   */
  currentIndex?: number | string;

  /**
   * For controlled usage, use the onChange event to listen to when a tab is clicked
   * and update the `currentIndex` accordingly. The index of the tab clicked is passed
   * to onChange.
   */
  onChange?: (value: number | string) => void;

  /**
   * Control how Tabs take up the remaining space. Pass `equal` to make each tab take up the same amount of space,
   * and `relative` to make each tab take up space relative to the size of its title.
   */
  spacing?: TabsSpacing;

  /**
   * Sets the border and indicator of the tabs to be the top or bottom.
   */
  indicatorPosition?: 'top' | 'bottom';
}

export interface TabItemProps extends BaseComponentProps, BaseStyleProps {
  /**
   * Change the title corresponding with each Tab's content panel.
   */
  title: React.ReactNode;

  /**
   * Make a Tab not clickable and its content not visible to the user. Defaults to false (i.e., visible).
   */
  isDisabled?: boolean;
}
