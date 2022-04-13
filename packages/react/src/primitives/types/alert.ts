import * as React from 'react';

import { FlexProps } from './flex';

export type AlertVariations = 'info' | 'error' | 'warning' | 'success';

export interface AlertProps extends FlexProps {
  /**
   * The variation property will affect the background color of the Alert.
   */
  variation?: AlertVariations;

  /**
   * The isDismissible property will affect whether the user can dismiss (close) the Alert. Defaults to false (not dismissible).
   */
  isDismissible?: boolean;

  /**
   * The onDismiss callback will be called when the user dismisses (closes) the Alert.
   */
  onDismiss?: () => void;

  /**
   * @deprecated
   * hasIcon property will be removed in the next major release in favor of isIconHidden. Please use isIconHidden instead.
   */
  hasIcon?: boolean;

  /**
   * @default false
   * Determines whether or not an icon is hidden on the Alert.
   */
  isIconHidden?: boolean;

  /**
   * The heading property will affect the content of the Alert heading.
   */
  heading?: React.ReactNode;

  /**
   * The ref will be forwarded to the dismiss button
   */
  buttonRef?: React.Ref<HTMLButtonElement>;
}
