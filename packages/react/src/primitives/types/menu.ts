import * as React from 'react';

import { ButtonProps } from './button';
import { FlexProps } from './flex';
import { Sizes } from './base';

export interface MenuProps extends FlexProps {
  /**
   * Alignment of menu against trigger
   * @default "start"
   */
  menuAlign?: 'start' | 'center' | 'end';

  /**
   * Handle open and close event of menu
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Default for controlled menu
   */
  isOpen?: boolean;

  /**
   * Size of Menu button and items
   */
  size?: Sizes;

  /**
   * Trigger node
   * @default MenuButton with IconMenu
   * @note Must forward refs to DOM element
   */
  trigger?: React.ReactNode;

  /**
   * ClassName to apply to default trigger button
   * Note: only applies if `trigger` prop is null
   */
  triggerClassName?: string;
}

export interface MenuItemProps extends ButtonProps {
  children?: React.ReactNode;
}
