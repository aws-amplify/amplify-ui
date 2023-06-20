import * as React from 'react';

import { BaseButtonProps } from './button';
import { BaseFlexProps } from './flex';
import { Sizes } from './base';
import { ElementType, PrimitiveProps } from './view';

export interface BaseMenuProps extends BaseFlexProps {
  /**
   * @description
   * Alignment of menu against trigger
   * @default
   * "start"
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
   * @default
   * MenuButton with IconMenu
   * @note
   * Must forward refs to DOM element
   */
  trigger?: React.ReactNode;

  /**
   * @description
   * ClassName to apply to default trigger button
   * Note: only applies if `trigger` prop is null
   */
  triggerClassName?: string;
}
export type MenuProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseMenuProps,
  Element
>;

export interface BaseMenuItemProps extends BaseButtonProps {
  /**
   * @description
   * Accepts any number of MenuItem components
   */
  children?: React.ReactNode;
}

export type MenuItemProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseMenuItemProps,
  Element
>;
