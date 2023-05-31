import * as React from 'react';

import { BaseFlexProps } from './flex';
import { ElementType, PrimitiveProps } from './view';

export type AlertVariations = 'info' | 'error' | 'warning' | 'success';

export interface BaseAlertProps extends BaseFlexProps {
  /**
   * @description
   * The variation property will affect the background color of the Alert.
   */
  variation?: AlertVariations;

  /**
   * @description
   * The isDismissible property will affect whether the user can dismiss (close) the Alert. Defaults to false (not dismissible).
   */
  isDismissible?: boolean;

  /**
   * @description
   * Configures the accessible label for the Alert's dismiss button.
   */
  dismissButtonLabel?: string;

  /**
   * @description
   * The onDismiss callback will be called when the user dismisses (closes) the Alert.
   */
  onDismiss?: () => void;

  /**
   * @description
   * The hasIcon property will determine whether or not an icon is displayed on the Alert. Defaults to true (icon displayed).
   */
  hasIcon?: boolean;

  /**
   * @description
   * The heading property will affect the content of the Alert heading.
   */
  heading?: React.ReactNode;

  /**
   * @description
   * The ref will be forwarded to the dismiss button
   */
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export type AlertProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseAlertProps,
  Element
>;
