import * as React from 'react';

import { FlexProps } from './flex';
import { HeadingLevel } from './heading';
import { IconSize } from './icon';

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
   * The hasIcon property will determine whether or not an icon is displayed on the Alert. Defaults to true (icon displayed).
   */
  hasIcon?: boolean;

  /**
   * The iconSize property will affect the size of the Alert icon.
   */
  iconSize?: IconSize;

  /**
   * The heading property will affect the content of the Alert heading.
   */
  heading?: React.ReactNode;

  /**
   * The headingLevel property will determine what type of heading renders (e.g., h1 - h6).
   */
  headingLevel?: HeadingLevel;
}
