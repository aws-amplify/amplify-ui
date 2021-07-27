import React from 'react';
import { ComponentClassNames } from '../shared';
import { PlaceholderProps } from '../types';
import { View } from '../View';

export const Placeholder: React.FC<PlaceholderProps> = ({
  className,
  children,
  isLoaded,
  size = 'medium',
  ...rest
}) => (
  <>
    {isLoaded ? (
      children
    ) : (
      <View
        className={ComponentClassNames.Placeholder}
        data-size={size}
        {...rest}
      ></View>
    )}
  </>
);
