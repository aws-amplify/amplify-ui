import * as React from 'react';
import { SliderField, SliderFieldProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { SliderFieldPropControls } from './SliderFieldPropControls';
import { useSliderFieldProps } from './useSliderFieldProps';
import { getPropString } from '../utils/getPropString';

/*

What's the difference between size and trackSize?
- trackSize is the width of the track itself (e.g., 0.5rem)
- size is the overall size of the SliderField, including the thumb (e.g., small, large or default)

Demonstrate defaultValue?

*/
const propsToCode = (props: SliderFieldProps) => {
  return (
    `<SliderField` +
    `\n  label="${props.label}"` +
    (props.min ? `\n  min={${props.min}}` : '') +
    `\n  max={${props.max}}` +
    (props.step !== 1 ? `\n  step={${props.step}}` : '') +
    getPropString(props.trackSize, 'trackSize') +
    getPropString(props.emptyTrackColor, 'emptyTrackColor') +
    getPropString(props.filledTrackColor, 'filledTrackColor') +
    getPropString(props.thumbColor, 'thumbColor') +
    (props.orientation === 'vertical'
      ? `\n  orientation="${props.orientation}"`
      : '') +
    getPropString(props.size, 'size') +
    (props.isDisabled ? `\n  isDisabled` : '') +
    (props.isValueHidden ? `\n  isValueHidden` : '') +
    (props.labelHidden ? `\n  labelHidden` : '') +
    `\n/>`
  );
};

export const SliderFieldDemo = () => {
  // Needs to persist demo state using demoState
  const sliderFieldProps = useSliderFieldProps({
    label: 'Slider',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  });

  return (
    <Demo
      code={propsToCode(sliderFieldProps)}
      propControls={<SliderFieldPropControls {...sliderFieldProps} />}
    >
      <SliderField
        defaultValue={sliderFieldProps.defaultValue}
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
