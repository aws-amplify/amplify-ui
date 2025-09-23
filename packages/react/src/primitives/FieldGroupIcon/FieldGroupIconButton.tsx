import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { Button } from '../Button';
import { ComponentClassName } from '@aws-amplify/ui';
import { FieldGroupIcon } from './FieldGroupIcon';

import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import type {
  BaseFieldGroupIconButtonProps,
  FieldGroupIconButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

const FieldGroupIconButtonPrimitive: Primitive<
  FieldGroupIconButtonProps,
  'button'
> = ({ children, className, ...rest }, ref) => (
  <FieldGroupIcon
    as={Button}
    className={classNames(ComponentClassName.FieldGroupIconButton, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </FieldGroupIcon>
);

export const FieldGroupIconButton: ForwardRefPrimitive<
  BaseFieldGroupIconButtonProps,
  'button'
> = primitiveWithForwardRef(FieldGroupIconButtonPrimitive);

FieldGroupIconButton.displayName = 'FieldGroupIconButton';
