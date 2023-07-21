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
import { useIcons } from '../../hooks/useIcons';

const ariaLabelText = ComponentText.Fields.clearButtonLabel;

const FieldClearButtonPrimitive: Primitive<FieldClearButtonProps, 'button'> = (
  { ariaLabel = ariaLabelText, size, ...rest },
  ref
) => {
  const icons = useIcons();
  return (
    <FieldGroupIconButton ariaLabel={ariaLabel} size={size} ref={ref} {...rest}>
      {icons?.field?.clear ?? <IconClose />}
    </FieldGroupIconButton>
  );
};

export const FieldClearButton: ForwardRefPrimitive<
  BaseFieldClearButtonProps,
  'button'
> = React.forwardRef(FieldClearButtonPrimitive);

FieldClearButton.displayName = 'FieldClearButton';
