import * as React from 'react';

import { FieldClearButtonProps, Primitive } from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconClose } from '../Icon';
import { SharedText } from '../shared/i18n';

const ariaLabelText = SharedText.Fields.ariaLabel.clearField;

const FieldClearButtonPrimitive: Primitive<FieldClearButtonProps, 'button'> = (
  props,
  ref
) => (
  <FieldGroupIconButton ariaLabel={ariaLabelText} ref={ref} {...props}>
    <IconClose size={props.size} />
  </FieldGroupIconButton>
);

export const FieldClearButton = React.forwardRef(FieldClearButtonPrimitive);

FieldClearButton.displayName = 'FieldClearButton';
