import React from 'react';

import { ViewElement, LabelElement, InputElement } from '../elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from './constants';

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
  <ViewElement className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__checkbox`}>
    <InputElement
      checked={checked}
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__checkbox-input`}
      disabled={disabled}
      id={id}
      onChange={onSelect}
      type="checkbox"
    />
    <LabelElement
      className={[
        `${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__checkbox-label`,
        labelHidden
          ? `${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}-visually-hidden`
          : undefined,
      ].join(' ')}
      htmlFor={id}
    >
      {labelText}
    </LabelElement>
  </ViewElement>
);
