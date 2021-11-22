import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { ComponentClassNames } from '../shared/constants';
import { FieldGroupIcon } from './FieldGroupIcon';
import { FieldGroupIconButtonProps, PrimitiveWithForwardRef } from '../types';

const FieldGroupIconButtonPrimitive: PrimitiveWithForwardRef<
  FieldGroupIconButtonProps,
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
);

FieldGroupIconButton.displayName = 'FieldGroupIconButton';
