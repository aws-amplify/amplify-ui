import { FieldClearButtonProps, Primitive } from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconClose } from '../Icon';
import { SharedText } from '../shared/i18n';

const ariaLabelText = SharedText.Fields.ariaLabel.clearField;

export const FieldClearButton: Primitive<FieldClearButtonProps, 'button'> = (
  props
) => (
  <FieldGroupIconButton ariaLabel={ariaLabelText} {...props}>
    <IconClose size={props.size} />
  </FieldGroupIconButton>
);

FieldClearButton.displayName = 'FieldClearButton';
