import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupIconProps } from '../types';
import { View } from '../View';

export const FieldGroupIcon: React.FC<FieldGroupIconProps> = ({
  as,
  ariaLabel,
  className,
  children,
  onClick,
  isVisible = true,
  excludeFromTabOrder = false,
  ...rest
}) => {
  return isVisible ? (
    <View
      as={as}
      className={classNames(ComponentClassNames.FieldGroupIcon, className)}
      onClick={onClick}
      ariaLabel={ariaLabel}
      tabIndex={excludeFromTabOrder ? '-1' : undefined}
      {...rest}
    >
      {children}
    </View>
  ) : null;
};
