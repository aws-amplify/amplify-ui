import { BaseComponentProps, AriaProps } from './base';
import { TabItem } from '../Tabs';

import { BaseStyleProps } from './style';
import { FlexStyleProps } from './flex';
import React from 'react';

export interface TabsProps
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps,
    FlexStyleProps {
  /**
   * Explain. Defaults to zero (0). Index of active tab.
   */
  defaultTabIndex?: number;

  // Is there a way to do this such that a customer can create a custom component that returns a TabItem?
  children: React.ReactElement;
}

export interface TabItemProps {
  title: React.ReactNode;
}
