import * as React from 'react';

import { FieldClearButtonProps, Primitive } from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconClose } from '../Icon/internal';
import { ComponentText } from '../shared/constants';

const ariaLabelText = ComponentText.Fields.clearButtonLabel;

const FieldClearButtonPrimitive: Primitive<FieldClearButtonProps, 'button'> = (
  { ariaLabel = ariaLabelText, size, ...rest },
  ref
) => (
  <FieldGroupIconButton ariaLabel={ariaLabel} ref={ref} {...rest}>
    <IconClose size={size} />
  </FieldGroupIconButton>
);

export const FieldClearButton = React.forwardRef(FieldClearButtonPrimitive);

FieldClearButton.displayName = 'FieldClearButton';
