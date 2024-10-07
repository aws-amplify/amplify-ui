import React from 'react';

import { CLASS_BASE } from '../views/constants';
import {
  ViewElement,
  LabelElement,
  InputElement,
} from '../context/elements/definitions';

const BLOCK_NAME = `${CLASS_BASE}__checkbox`;
const LABEL_CLASSNAME = `${BLOCK_NAME}-label`;

interface CheckboxControlProps {
  checked: boolean;
  disabled?: boolean;
  id: string;
  labelHidden?: boolean;
  labelText: string;
  onSelect?: () => void;
}

export const CheckboxControl = ({
  disabled,
  checked,
  onSelect,
  labelText,
  labelHidden = false,
  id,
}: CheckboxControlProps): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME}>
    <InputElement
      checked={checked}
      className={`${BLOCK_NAME}-input`}
      disabled={disabled}
      id={id}
      onChange={onSelect}
      type="checkbox"
    />
    <LabelElement
      className={[
        LABEL_CLASSNAME,
        labelHidden ? `${CLASS_BASE}-visually-hidden` : undefined,
      ].join(' ')}
      htmlFor={id}
    >
      {labelText}
    </LabelElement>
  </ViewElement>
);
