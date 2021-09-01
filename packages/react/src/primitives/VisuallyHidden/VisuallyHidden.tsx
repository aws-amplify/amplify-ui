import React from 'react';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { VisuallyHiddenProps } from '../types/visuallyHidden';

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  ...rest
}) => {
  return (
    <View as="span" className={ComponentClassNames.VisuallyHidden} {...rest}>
      {children}
    </View>
  );
};
