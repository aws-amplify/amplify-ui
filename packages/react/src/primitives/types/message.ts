import * as React from 'react';

import { BaseFlexProps } from './flex';
import { BaseButtonProps } from './button';
import { ElementType, PrimitiveProps } from './view';

export type MessageColorThemes =
  | 'neutral'
  | 'info'
  | 'error'
  | 'warning'
  | 'success';
export type MessageVariations = 'plain' | 'outline' | 'filled';

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
   * icon allows you to pass your own element in this slot for the Message.
   */
  icon?: React.ReactNode;

  /**
   * @description
   * The isDismissible property will affect whether the user can dismiss (close) the Message. Defaults to false (not dismissible).
   */
  isDismissible?: boolean;

  /**
   * @description
   * Configures the accessible label for the Message's dismiss button.
   */
  dismissButtonLabel?: string;

  /**
   * @description
   * The onDismiss callback will be called when the user dismisses (closes) the Message.
   */
  onDismiss?: () => void;

  /**
   * @description
   * The hasIcon property will determine whether or not an icon is displayed on the Message. Defaults to true (icon displayed).
   */
  hasIcon?: boolean;

  // /**
  //  * @description
  //  * The heading property will affect the content of the Message heading.
  //  */
  // heading?: React.ReactNode;

  /**
   * @description
   * The ref will be forwarded to the dismiss button
   */
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export interface BaseMessageTitleProps extends BaseFlexProps {}
export interface BaseMessageContentProps extends BaseFlexProps {}
export interface BaseMessageDismissProps extends BaseButtonProps {
  onDismiss?: () => void;
  hasIcon?: boolean;
}
export type MessageProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseMessageProps,
  Element
>;

export type MessageTitleProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageTitleProps, Element>;

export type MessageContentProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageContentProps, Element>;

export type MessageDismissProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseMessageDismissProps, Element>;
