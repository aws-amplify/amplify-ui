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
   * Explain. Defaults to zero (0). Index of active tab.
   */
  defaultTabIndex?: number;

  grow?: TabsGrow;

  disabledTabs: number[];

  // Is there a way to do this such that a customer can create a custom component that returns a TabItem?
  children: React.ReactElement | React.ReactElement[];
}

export interface TabItemProps {
  title: React.ReactNode;
}
