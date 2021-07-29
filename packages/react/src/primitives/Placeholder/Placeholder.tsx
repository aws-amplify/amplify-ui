import React from 'react';
import { ComponentClassNames } from '../shared';
import classNames from 'classnames';
import { PlaceholderProps } from '../types';
import { View } from '../View';

export const Placeholder: React.FC<PlaceholderProps> = ({
  className,
  children,
  isLoaded,
  size,
  ...rest
}) => {
  if (isLoaded) {
    return <>children</>;
  }

  return (
    <View
      className={classNames(ComponentClassNames.Placeholder, className)}
      data-size={size}
      {...rest}
    ></View>
  );
};
