import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { HeadingProps } from '../types';

const headingLevels = {
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
  level,
  ...rest
}) =>
  React.createElement(
    headingLevels[level] ?? headingLevels[6],
    { className: classNames(ComponentClassNames.Heading, className), ...rest },
    children
  );
