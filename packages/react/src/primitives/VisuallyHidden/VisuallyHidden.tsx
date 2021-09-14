import classNames from 'classnames';
import React from 'react';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { VisuallyHiddenProps } from '../types/visuallyHidden';

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  as = 'span',
  children,
  className,
  ...rest
}) => {
  return (
    <View
      as={as}
      className={classNames(ComponentClassNames.VisuallyHidden, className)}
      {...rest}
    >
      {children}
    </View>
  );
};
