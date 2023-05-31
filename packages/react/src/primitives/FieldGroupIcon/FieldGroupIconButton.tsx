import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { ComponentClassNames } from '../shared/constants';
import { FieldGroupIcon } from './FieldGroupIcon';
import {
  BaseFieldGroupIconButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

const FieldGroupIconButtonPrimitive: Primitive<
  BaseFieldGroupIconButtonProps,
  'button'
> = ({ children, className, ...rest }, ref) => (
  <FieldGroupIcon
    as={Button}
    className={classNames(ComponentClassNames.FieldGroupIconButton, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </FieldGroupIcon>
);

export const FieldGroupIconButton = React.forwardRef(
  FieldGroupIconButtonPrimitive
) as ForwardRefPrimitive<BaseFieldGroupIconButtonProps, 'button'>;

FieldGroupIconButton.displayName = 'FieldGroupIconButton';
