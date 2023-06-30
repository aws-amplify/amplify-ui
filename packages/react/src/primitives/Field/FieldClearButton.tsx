import * as React from 'react';

import {
  BaseFieldClearButtonProps,
  FieldClearButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { ComponentText } from '../shared/constants';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';

const ariaLabelText = ComponentText.Fields.clearButtonLabel;

const FieldClearButtonPrimitive: Primitive<FieldClearButtonProps, 'button'> = (
  { ariaLabel = ariaLabelText, size, ...rest },
  ref
) => {
  const { icons } = useTheme();
  return (
    <FieldGroupIconButton ariaLabel={ariaLabel} size={size} ref={ref} {...rest}>
      <Icon {...icons.field.clear} />
    </FieldGroupIconButton>
  );
};

export const FieldClearButton: ForwardRefPrimitive<
  BaseFieldClearButtonProps,
  'button'
> = React.forwardRef(FieldClearButtonPrimitive);

FieldClearButton.displayName = 'FieldClearButton';
