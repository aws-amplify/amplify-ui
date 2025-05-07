import type * as React from 'react';

import type { BaseFlexProps } from './flex';
import type { BaseButtonProps } from './button';
import type { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type MessageColorTheme =
  | 'neutral'
  | 'info'
  | 'error'
  | 'warning'
  | 'success';
// export type MessageVariation = ;

export interface BaseMessageContainerProps extends BaseFlexProps {
  /**
   * @description
   * The variation property will affect the overall style of the Message.
   */
  variation?: 'plain' | 'outlined' | 'filled';

  /**
   * @description
   * The colorTheme property will affect the color and iconography used in the Message.
   */
  colorTheme?: MessageColorTheme;
}

export interface BaseMessageProps extends BaseMessageContainerProps {
  /**
   * @description
   * Configures the accessible label for the Message's dismiss button.
   */
  dismissLabel?: string;

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
  hasIcon?: boolean;

  /**
   * @description
   * The heading property will affect the content of the Message heading.
   */
  heading?: React.ReactNode;
}

export interface BaseMessageContentProps extends BaseFlexProps {}
export interface BaseMessageDismissProps extends BaseButtonProps {
  onDismiss?: () => void;

  /**
   * @description
   * hasIcon determines whether the close icon will be displayed.
   * @default true
   */
  hasIcon?: boolean;

  /**
   * @description
   * Configures the accessible label for the Message's dismiss button.
   */
  dismissLabel?: string;
}
export interface BaseMessageHeadingProps extends BaseFlexProps {}
export interface BaseMessageIconProps extends BaseViewProps {}

export type MessageContainerProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageContainerProps, Element>;

export type MessageContentProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageContentProps, Element>;

export type MessageDismissProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseMessageDismissProps, Element>;

export type MessageHeadingProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageHeadingProps, Element>;

export type MessageIconProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseMessageIconProps, Element>;

export type MessageProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseMessageProps,
  Element
>;
