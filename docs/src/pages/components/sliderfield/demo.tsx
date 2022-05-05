import * as React from 'react';
import { SliderField, SliderFieldProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { SliderFieldPropControls } from './SliderFieldPropControls';
import { useSliderFieldProps } from './useSliderFieldProps';
import { getPropString } from '../utils/getPropString';
import { demoState } from '@/utils/demoState';

const propsToCode = (props: SliderFieldProps) => {
  return (
    `<SliderField` +
    `\n  label="${props.label}"` +
    (props.min ? `\n  min={${props.min}}` : '') +
    `\n  max={${props.max}}` +
    (props.step !== 1 ? `\n  step={${props.step}}` : '') +
    getPropString(props.size, 'size') +
    getPropString(props.trackSize, 'trackSize') +
    getPropString(props.emptyTrackColor, 'emptyTrackColor') +
    getPropString(props.filledTrackColor, 'filledTrackColor') +
    getPropString(props.thumbColor, 'thumbColor') +
    (props.orientation === 'vertical'
      ? `\n  orientation="${props.orientation}"`
      : '') +
    (props.isDisabled ? `\n  isDisabled` : '') +
    (props.isValueHidden ? `\n  isValueHidden` : '') +
    (props.labelHidden ? `\n  labelHidden` : '') +
    `\n/>`
  );
};

const defaultSliderFieldProps = {
  label: 'Slider',
  value: 50,
  min: 0,
  max: 100,
  step: 1,
};

export const SliderFieldDemo = () => {
  const sliderFieldProps = useSliderFieldProps(
    demoState.get(SliderField.displayName) || defaultSliderFieldProps
  );

  return (
    <Demo
      code={propsToCode(sliderFieldProps)}
      propControls={<SliderFieldPropControls {...sliderFieldProps} />}
    >
      <SliderField
        value={sliderFieldProps.value}
        onChange={sliderFieldProps.setValue}
        isDisabled={sliderFieldProps.isDisabled}
        isValueHidden={sliderFieldProps.isValueHidden}
        label={sliderFieldProps.label}
        labelHidden={sliderFieldProps.labelHidden}
        max={sliderFieldProps.max}
        min={sliderFieldProps.min}
        step={sliderFieldProps.step}
        orientation={sliderFieldProps.orientation}
        trackSize={sliderFieldProps.trackSize}
        emptyTrackColor={sliderFieldProps.emptyTrackColor}
        filledTrackColor={sliderFieldProps.filledTrackColor}
        thumbColor={sliderFieldProps.thumbColor}
        size={sliderFieldProps.size}
      />
    </Demo>
  );
};
