import * as React from 'react';

import { FieldClearButtonProps } from '../types';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { IconClose } from '../Icon';
import { SharedText } from '../shared/i18n';

const ariaLabelText = SharedText.Fields.ariaLabel.clearField;

export const FieldClearButton: React.FC<FieldClearButtonProps> = (props) => {
  return (
    <FieldGroupIconButton ariaLabel={ariaLabelText} {...props}>
      <IconClose size={props.size} />
    </FieldGroupIconButton>
  );
};
