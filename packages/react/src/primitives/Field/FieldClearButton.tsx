import * as React from 'react';

import {
  BaseFieldClearButtonProps,
  FieldClearButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconClose, useIcons } from '../Icon';
import { ComponentText } from '../shared/constants';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const ariaLabelText = ComponentText.Fields.clearButtonLabel;

const FieldClearButtonPrimitive: Primitive<FieldClearButtonProps, 'button'> = (
  { ariaLabel = ariaLabelText, size, ...rest },
  ref
) => {
  const icons = useIcons('field');
  return (
    <FieldGroupIconButton ariaLabel={ariaLabel} size={size} ref={ref} {...rest}>
      {icons?.clear ?? <IconClose />}
    </FieldGroupIconButton>
  );
};

export const FieldClearButton: ForwardRefPrimitive<
  BaseFieldClearButtonProps,
  'button'
> = primitiveWithForwardRef(FieldClearButtonPrimitive);

FieldClearButton.displayName = 'FieldClearButton';
