import { Property } from 'csstype';
import * as React from 'react';

import { TextInputFieldProps } from './textField';
import { ViewProps } from './view';

type SliderOrientation = 'vertical';

export interface SliderFieldProps extends TextInputFieldProps, ViewProps {
  min: number;
  max: number;
  step: number;
  orientation?: SliderOrientation;
  trackHeight?: Property.Height;
  emptyTrackColor?: Property.Color;
  filledTrackColor?: Property.Color;
  thumbColor?: Property.Color;
  thumbComponent?: React.ReactNode;
}
