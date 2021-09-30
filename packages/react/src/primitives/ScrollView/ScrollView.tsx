import classNames from 'classnames';
import React from 'react';

import { View } from '../View';
import { ScrollViewProps } from '../types/scrollView';
import { ComponentClassNames } from '../shared/constants';
export const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  className,
  orientation = 'both',
  ...rest
}) => (
  <View
    className={classNames(ComponentClassNames.ScrollView, className)}
    data-orientation={orientation}
    {...rest}
  >
    {children}
  </View>
);
