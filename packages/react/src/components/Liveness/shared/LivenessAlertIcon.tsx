/**
 * Copied from src/primitives/Alert/AlertIcon.tsx because we want to re-use the icon but it is not currently expored by AlertIcon.
 * We currently don't want to make a change to the AlertIcon primitive itself and may expose the icon in the future but for now so as not to introduce cross component dependencies we have duplicated it.
 */

import * as React from 'react';

import { ComponentClassNames } from '../../../primitives';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
} from '../../../primitives/Icon/icons';

type AlertVariations = 'info' | 'error' | 'warning' | 'success';

interface LivenessAlertIconProps {
  variation: AlertVariations;
  ariaHidden?: boolean;
}

export const LivenessAlertIcon: React.FC<LivenessAlertIconProps> = ({
  variation,
  ariaHidden = true,
}) => {
  switch (variation) {
    case 'info':
      return (
        <IconInfo
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    case 'error':
      return (
        <IconError
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    case 'warning':
      return (
        <IconWarning
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    case 'success':
      return (
        <IconCheckCircle
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    default:
      return null;
  }
};

LivenessAlertIcon.displayName = 'LivenessAlertIcon';
