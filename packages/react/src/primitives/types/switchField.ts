import { AriaProps, BaseComponentProps, Sizes } from './base';
import { BaseStyleProps } from './style';
import { InputProps } from './input';
import { FieldProps } from './field';
import { Property } from 'csstype';

export type labelPositions = 'start' | 'end' | 'top' | 'bottom';
export interface SwitchFieldProps
  extends InputProps,
    FieldProps,
    BaseStyleProps {
  /**
   * Use this to provide a default checked value for an uncontrolled SwitchField
   */
  defaultChecked?: boolean;

  /**
   * If isChecked is provided, this will be a controlled SwitchField
   */
  isChecked?: boolean;

  /**
   * This property will set the switch to disabled
   */
  isDisabled?: boolean;

  /**
   * Visually hide the label, but the associated label text will still be required for accessibility.
   * @default false
   */
  isLabelHidden?: boolean;

  /**
   * Label text for field (required)
   */
  label: React.ReactNode;

  /**
   * Position of label in relation to the switchfield
   */
  labelPosition?: labelPositions;

  /**
   * This prop adds a name attribute to the input element
   */
  name?: string;

  /**
   * Assign an onChange event to the switch field
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * This prop adjusts the size of the switch component
   */
  size?: Sizes;

  /**
   * This property will change the color of the thumb in the switch component
   */

  thumbColor?: Property.Color;

  /**
   * This property will change the color of the track in the switch component
   */
  trackColor?: Property.Color;

  /**
   * This property will change the color of the checked track in the switch component
   */
  trackCheckedColor?: Property.Color;

  /**
   * This is the value of the switch input and will be submitted with a form submission
   */
  value?: string | number;
}
