import React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { LinkProps } from '../types';
import { View } from '../View';

export const Link: React.FC<LinkProps> = ({
  as = 'a',
  children,
  className,
  isExternal,
  ...rest
}) => {
  return (
    <View
      as={as}
      className={classNames(ComponentClassNames.Link, className)}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      {...rest}
    >
      {children}
    </View>
  );
};
