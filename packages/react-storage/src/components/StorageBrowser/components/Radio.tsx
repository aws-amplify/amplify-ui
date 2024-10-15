import React from 'react';

import { CLASS_BASE } from '../views/constants';
import {
  ViewElement,
  LabelElement,
  InputElement,
} from '../context/elements/definitions';

const BLOCK_NAME = `${CLASS_BASE}__radio`;
export const INPUT_CLASSNAME = `${BLOCK_NAME}-input`;
export const LABEL_CLASSNAME = `${BLOCK_NAME}-label`;

interface RadioControlProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  labelHidden?: boolean;
  labelText?: string;
  onSelect?: () => void;
  name?: string;
  value?: string;
}

export const RadioControl = ({
  checked,
  disabled,
  id,
  labelHidden = false,
  labelText,
  onSelect,
  name,
  value,
}: RadioControlProps): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME}>
    <InputElement
      checked={checked}
      className={INPUT_CLASSNAME}
      disabled={disabled}
      id={id}
      onChange={onSelect}
      type="radio"
      name={name}
      variant="something"
      value={value}
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
