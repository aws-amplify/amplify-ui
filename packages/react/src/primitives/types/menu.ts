import * as React from 'react';

import { ButtonProps } from './button';
import { FlexProps } from './flex';
import { Sizes } from './base';

export interface MenuProps extends FlexProps {
  /**
   * @description
   * Alignment of menu against trigger
   */
  menuAlign?: 'start' | 'center' | 'end';

  /**
   * @description
   * Handle open and close event of menu
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * @description
   * Default for controlled menu
   */
  isOpen?: boolean;

  /**
   * @description
   * Size of Menu button and items
   */
  size?: Sizes;

  /**
   * @description
   * Trigger node
   */
  trigger?: React.ReactNode;

  /**
   * @description
   * ClassName to apply to default trigger button
   * Note: only applies if `trigger` prop is null
   */
  triggerClassName?: string;
}

export interface MenuItemProps extends ButtonProps {
  children?: React.ReactNode;
}
