import * as React from 'react';

import { FlexProps } from './flex';
import { MenuButton } from '../Menu/MenuButton';
import { ButtonProps } from './button';

export interface MenuProps extends FlexProps {
  /**
   * Trigger node
   * @default MenuButton with IconMenu
   * @note Must forward refs to DOM element
   */
  trigger?: React.ReactNode;

  /**
   * Menu primitive only accepts MenuItem components as children.
   */
  children: React.ReactElement | React.ReactElement[];

  /**
   * Default for uncontrolled menu
   *
   */
  defaultOpen?: boolean;

  /**
   * Default for controlled menu
   */
  isOpen?: boolean;

  /**
   * Handle open and close event of menu
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Alignment of menu against trigger
   * @default "start"
   */
  align?: 'start' | 'center' | 'end';
}

export interface MenuItemProps extends ButtonProps {}
