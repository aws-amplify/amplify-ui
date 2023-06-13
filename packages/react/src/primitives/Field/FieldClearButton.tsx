import * as React from 'react';

import {
  BaseFieldClearButtonProps,
  FieldClearButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconClose } from '../Icon/internal';
import { ComponentText } from '../shared/constants';

const ariaLabelText = ComponentText.Fields.clearButtonLabel;

const FieldClearButtonPrimitive: Primitive<FieldClearButtonProps, 'button'> = (
  { ariaLabel = ariaLabelText, size, ...rest },
  ref
) => (
  <FieldGroupIconButton ariaLabel={ariaLabel} size={size} ref={ref} {...rest}>
    <IconClose />
  </FieldGroupIconButton>
);

export const FieldClearButton: ForwardRefPrimitive<
  BaseFieldClearButtonProps,
  'button'
> = React.forwardRef(FieldClearButtonPrimitive);

FieldClearButton.displayName = 'FieldClearButton';
