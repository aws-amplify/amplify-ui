import * as React from 'react';

import { BaseFlexProps } from './flex';
import { BaseButtonProps } from './button';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type MessageColorThemes =
  | 'neutral'
  | 'info'
  | 'error'
  | 'warning'
  | 'success';
export type MessageVariations = 'plain' | 'outlined' | 'filled';

export interface BaseMessageProps extends BaseFlexProps {
  /**
   * @description
   * The variation property will affect the overall style of the Message.
   */
  variation?: MessageVariations;

  /**
   * @description
   * The colorTheme property will affect the color and iconography used in the Message.
   */
  colorTheme?: MessageColorThemes;

  /**
   * @description
   * The isDismissible property will affect whether the user can dismiss (close) the Message. Defaults to false (not dismissible).
   */
  isDismissible?: boolean;

  /**
   * @description
   * The onDismiss callback will be called when the user dismisses (closes) the Message.
   */
  onDismiss?: () => void;

  /**
   * @description
   * The hasIcon property will determine whether or not an icon is displayed on the Message. Defaults to true (icon displayed).
   */
  showIcon?: boolean;

  /**
   * @description
   * The heading property will affect the content of the Message heading.
   */
  heading?: React.ReactNode;

  /**
   * @description
   * The heading property will affect the content of the Message heading.
   */
  content?: React.ReactNode;
}

export interface BaseMessageContentProps extends BaseFlexProps {}
export interface BaseMessageDismissProps extends BaseButtonProps {
  onDismiss?: () => void;
  showIcon?: boolean;
}
export interface BaseMessageHeadingProps extends BaseFlexProps {}
export interface BaseMessageIconProps extends BaseViewProps {}

export type MessageContentProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageContentProps, Element>;

export type MessageDismissProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseMessageDismissProps, Element>;

export type MessageHeadingProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageHeadingProps, Element>;

export type MessageIconProps<Element extends ElementType = 'span'> =
  PrimitiveProps<BaseMessageHeadingProps, Element>;

export type MessageProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseMessageProps,
  Element
>;
