import * as React from 'react';

import { FlexProps } from './flex';

export type MessageColorThemes =
  | 'neutral'
  | 'info'
  | 'error'
  | 'warning'
  | 'success';
export type MessageVariations = 'plain' | 'outline' | 'filled';

export interface MessageProps extends FlexProps {
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

export interface MessageHeadingProps extends FlexProps {}
