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
  // Is there a way to do this such that a customer can create a custom component that returns a TabItem?
  children: React.ReactElement | React.ReactElement[];

  /**
   * Explain. Defaults to zero (0). Index of active tab.
   */
  defaultTab?: number;

  /**
   * Explain.
   */
  grow?: TabsGrow;
}

export interface TabItemProps {
  /**
   * Explain.
   */
  title: React.ReactNode;

  /**
   * Explain.
   */
  isDisabled?: boolean;
}
