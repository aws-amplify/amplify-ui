import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { AlertVariations } from '../types';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';

interface AlertIconProps {
  variation?: AlertVariations;
  ariaHidden?: boolean;
}

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const AlertIcon: React.FC<AlertIconProps> = ({
  variation,
  ariaHidden,
}) => {
  const { icons } = useTheme();
  if (variation) {
    const icon = icons.alert[variation];

    return (
      <Icon
        {...icon}
        aria-hidden={ariaHidden}
        className={ComponentClassNames.AlertIcon}
      />
    );
  } else {
    return null;
  }
};

AlertIcon.displayName = 'AlertIcon';
