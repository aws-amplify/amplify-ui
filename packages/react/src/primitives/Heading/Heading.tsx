import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { HeadingProps } from '../types';
import { View } from '../View';

interface HeadingLevels {
  [key: number]: keyof JSX.IntrinsicElements;
}

const headingLevels: HeadingLevels = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export const Heading: React.FC<HeadingProps> = ({
  className,
  children,
  level = 6,
  ...rest
}) => (
  <View
    as={headingLevels[level]}
    className={classNames(ComponentClassNames.Heading, className)}
    {...rest}
  >
    {children}
  </View>
);
