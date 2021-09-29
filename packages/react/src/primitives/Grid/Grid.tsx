import classNames from 'classnames';
import React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { GridProps } from '../types';
import { View } from '../View';

export const Grid: React.FC<GridProps> = ({ className, children, ...rest }) => (
  <View className={classNames(ComponentClassNames.Grid, className)} {...rest}>
    {children}
  </View>
);
