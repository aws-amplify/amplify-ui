import { Property } from 'csstype';
import React from 'react';

import { StyleToken } from './style';
import { TextFieldProps } from './textField';
import { ViewProps } from './view';

type SliderOrientation = 'horizontal' | 'vertical';
type Direction = 'ltr' | 'rtl';

export interface SliderFieldProps extends TextFieldProps, ViewProps {
  /**
   * @description
   * Sets the minimum value for the SliderField range
   */
  min?: number;

  /**
   * @description
   * Sets the maximum value for the SliderField range
   */
  max?: number;

  /**
   * @description
   * Controls the interval between selectable values
   */
  step?: number;

  /**
   * @description
   * Changes the orientation of the SliderField to either 'vertical' or 'horizontal' (default)
   */
  orientation?: SliderOrientation;

  /**
   * @description
   * When `true`, hides the numerical value to the right of the label
   */
  isValueHidden?: boolean;

  /**
   * @description
   * Controls the width of the track and size of the thumb. Options include 'small', none (default), and 'large'
   */
  trackSize?: string;

  /**
   * @description
   * Applies to the empty part of the SliderField track
   */
  emptyTrackColor?: StyleToken<Property.Color>;

  /**
   * @description
   * Applies to the filled-in part of the SliderField track
   */
  filledTrackColor?: StyleToken<Property.Color>;

  /**
   * @description
   * Applies to the thumb component that users can slide
   */
  thumbColor?: StyleToken<Property.Color>;

  /**
   * @description
   * Controls the current value when using the SliderField as a controlled component
   */
  value?: number;

  /**
   * @description
   * Sets the SliderField’s initial value on render
   */
  defaultValue?: number;

  /**
   * @description
   * Use to format how the value gets rendered
   */
  formatValue?: (value: number) => React.ReactNode;

  /**
   * @description
   * Handles changes to the current value when using the SliderField as a controlled component
   */
  onChange?: (value: number) => void;

  /**
   * @description
   * sets the direction of the slider.
   * @see
   * [Radix docs](https://www.radix-ui.com/docs/primitives/components/slider)
   */
  dir?: Direction;
}
