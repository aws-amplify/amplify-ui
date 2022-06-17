import { Property } from 'csstype';

import { StyleToken } from './style';
import { TextInputFieldProps } from './textField';
import { ViewProps } from './view';

type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderFieldProps extends TextInputFieldProps, ViewProps {
  /**
   * Sets the minimum value for the SliderField range
   */
  min?: number;

  /**
   * Sets the maximum value for the SliderField range
   */
  max?: number;

  /**
   * Controls the interval between selectable values
   */
  step?: number;

  /**
   * Changes the orientation of the SliderField to either 'vertical' or 'horizontal' (default)
   */
  orientation?: SliderOrientation;

  /**
   * When `true`, hides the numerical value to the right of the label
   */
  isValueHidden?: boolean;

  /**
   * Controls the width of the track and size of the thumb. Options include 'small', none (default), and 'large'
   */
  trackSize?: string;

  /**
   * Applies to the empty part of the SliderField track
   */
  emptyTrackColor?: StyleToken<Property.Color>;

  /**
   * Applies to the filled-in part of the SliderField track
   */
  filledTrackColor?: StyleToken<Property.Color>;

  /**
   * Applies to the thumb component that users can slide
   */
  thumbColor?: StyleToken<Property.Color>;

  /**
   * Controls the current value when using the SliderField as a controlled component
   */
  value?: number;

  /**
   * Sets the SliderField’s initial value on render
   */
  defaultValue?: number;

  /**
   * Handles changes to the current value when using the SliderField as a controlled component
   */
  onChange?: (value: number) => void;
}
