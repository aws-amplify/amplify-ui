import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';
import { FlexStyleProps } from './flex';
import React from 'react';

export type TabsGrow = 'equal' | 'relative';

export interface TabsProps
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps,
    FlexStyleProps {
  /**
   * The Tabs component only accepts TabItem components as children.
   */
  children: React.ReactElement | React.ReactElement[];

  /**
   * Change which Tab content is initially displayed. Pass in the index of the Tab you wish to show. The default is index 0 (the first tab).
   */
  defaultTab?: number;

  /**
   * Control how Tabs take up the remaining space. Pass `equal` to make each tab take up the same amount of space, and `relative` to make each tab take up space relative to the size of its title.
   */
  grow?: TabsGrow;
}

export interface TabItemProps {
  /**
   * Change the title corresponding with each Tab's content panel.
   */
  title: React.ReactNode;

  /**
   * Make a Tab not clickable and its content not visible to the user. Defaults to false (i.e., visible).
   */
  isDisabled?: boolean;
}
