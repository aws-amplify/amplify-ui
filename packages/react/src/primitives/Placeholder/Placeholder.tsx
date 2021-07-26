import React from 'react';
import { ComponentClassNames } from '../shared';
import classNames from 'classnames';
import { PlaceholderProps } from '../types';
import { View } from '../View';

export const Placeholder: React.FC<PlaceholderProps> = ({
  className,
  children,
  isLoaded = false, // what should the default be? (true or false)
  size = 'medium',
  ...rest
}) => (
  <View
    className={classNames(ComponentClassNames.Placeholder, className)}
    data-loaded={isLoaded}
    data-size={size}
    {...rest}
  >
    {/* If isLoaded is true, show the children (what if there are no children?). Else, show the placeholder */}
    {isLoaded && children}
  </View>
);
