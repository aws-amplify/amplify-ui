import * as React from 'react';

import { FieldClearButtonProps, Primitive } from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconClose } from '../Icon';
import { SharedText } from '../shared/constants';

const ariaLabelText = SharedText.Fields.ariaLabel.clearField;

const FieldClearButtonPrimitive: Primitive<FieldClearButtonProps, 'button'> = (
  { ariaLabel, size, ...rest },
  ref
) => (
  <FieldGroupIconButton
    ariaLabel={ariaLabel || ariaLabelText}
    ref={ref}
    {...rest}
  >
    <IconClose size={size} />
  </FieldGroupIconButton>
);

export const FieldClearButton = React.forwardRef(FieldClearButtonPrimitive);

FieldClearButton.displayName = 'FieldClearButton';
