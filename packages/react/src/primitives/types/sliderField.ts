import { Property } from 'csstype';

import { TextInputFieldProps } from './textField';
import { ViewProps } from './view';

type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderFieldProps extends TextInputFieldProps, ViewProps {
  min?: number;
  max?: number;
  step?: number;
  orientation?: SliderOrientation;
  isValueHidden?: boolean;
  trackWidth?: string;
  emptyTrackColor?: Property.Color;
  filledTrackColor?: Property.Color;
  thumbColor?: Property.Color;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}
