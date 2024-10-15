import React from 'react';

import { CLASS_BASE } from '../views/constants';
import { ViewElement, LabelElement, InputElement } from '../context/elements';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  labelHidden?: boolean;
  labelText?: string;
  onSelect?: () => void;
}

export const Checkbox = ({
  checked,
  disabled,
  id,
  labelHidden = false,
  labelText,
  onSelect,
}: CheckboxProps): React.JSX.Element => (
  <ViewElement className={`${CLASS_BASE}__checkbox`}>
    <InputElement
      checked={checked}
      className={`${CLASS_BASE}__checkbox-input`}
      disabled={disabled}
      id={id}
      onChange={onSelect}
      type="checkbox"
    />
    <LabelElement
      className={[
        `${CLASS_BASE}__checkbox-label`,
        labelHidden ? `${CLASS_BASE}-visually-hidden` : undefined,
      ].join(' ')}
      htmlFor={id}
    >
      {labelText}
    </LabelElement>
  </ViewElement>
);
