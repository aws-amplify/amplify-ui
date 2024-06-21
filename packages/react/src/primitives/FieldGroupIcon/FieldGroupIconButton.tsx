import * as React from 'react';
import { fieldGroupClasses } from '@aws-amplify/ui';

import { Button } from '../Button';
import { FieldGroupIcon } from './FieldGroupIcon';

import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import {
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
    className={fieldGroupClasses({ _element: 'icon-button' }, [className])}
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
