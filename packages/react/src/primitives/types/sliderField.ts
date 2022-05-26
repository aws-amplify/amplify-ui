import { Property } from 'csstype';

import { StyleToken } from './style';
import { TextInputFieldProps } from './textField';
import { ViewProps } from './view';

type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderFieldProps extends TextInputFieldProps, ViewProps {
  min?: number;
  max?: number;
  step?: number;
  orientation?: SliderOrientation;
  isValueHidden?: boolean;
  trackSize?: string;
  emptyTrackColor?: StyleToken<Property.Color>;
  filledTrackColor?: StyleToken<Property.Color>;
  thumbColor?: StyleToken<Property.Color>;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}
