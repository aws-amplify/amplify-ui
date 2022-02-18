import { Property } from 'csstype';

import { TextFieldProps } from './textField';
import { ViewProps } from './view';

type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderFieldProps extends TextFieldProps, ViewProps {
  min?: number;
  max?: number;
  step?: number;
  orientation?: SliderOrientation;
  isValueHidden?: boolean;
  trackSize?: string;
  emptyTrackColor?: Property.Color;
  filledTrackColor?: Property.Color;
  thumbColor?: Property.Color;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}
