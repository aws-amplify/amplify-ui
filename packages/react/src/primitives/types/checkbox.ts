import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { FlexProps } from './flex';
import { InputProps } from './input';
import { FieldProps, LabelPositions } from './field';
import { BaseStyleProps } from './style';

export interface CheckboxProps extends FlexProps, InputProps {
  /**
   * @description
   * Sets the label text
   */
  label: FieldProps['label'];

  /**
   * Visually hide label (not recommended in most cases)
   * @default
   * false
   */
  labelHidden?: boolean;

  /**
   * The name of the input field in a checkbox (Useful for form submission).
   */
  name: string;

  /**
   * The submitted value when checked
   * Shows on form submission as key pair `name:value`
   */
  value: string;

  /**
   * @description
   * Sets the position of label in relation to the CheckboxField,
   * @default
   * "start"
   */
  labelPosition?: LabelPositions;

  /**
   * @description
   * Determines whether a checkbox is in indeterminate state
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * @description
   * Style props to be applied to the input element
   */
  inputStyles?: BaseStyleProps;
}

export interface UseCheckbox {
  dataChecked: boolean;
  dataFocus: boolean;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  setDataChecked: Dispatch<SetStateAction<boolean>>;
}
