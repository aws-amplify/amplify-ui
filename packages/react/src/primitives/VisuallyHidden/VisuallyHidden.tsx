import classNames from 'classnames';
import React from 'react';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { VisuallyHiddenProps } from '../types/visuallyHidden';

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  as,
  children,
  className,
  ...rest
}) => {
  return (
    <View
      as={as ?? 'span'}
      className={classNames(ComponentClassNames.VisuallyHidden, className)}
      {...rest}
    >
      {children}
    </View>
  );
};
