import * as React from 'react';

import { Flex, SliderField } from '@aws-amplify/ui-react';

import { SliderFieldPropControls } from '@/components/SliderFieldPropControls';
import { useSliderFieldProps } from '@/components/useSliderFieldProps';
import { Example } from '@/components/Example';

export const SliderFieldDemo = () => {
  const sliderFieldProps = useSliderFieldProps({
    label: 'Slider',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  });
  return (
    <Flex direction="column">
      <SliderFieldPropControls {...sliderFieldProps} />
      <Example>
        <SliderField
          defaultValue={sliderFieldProps.defaultValue}
          label={sliderFieldProps.label}
          max={sliderFieldProps.max}
          min={sliderFieldProps.min}
          step={sliderFieldProps.step}
          orientation={sliderFieldProps.orientation}
          isDisabled={sliderFieldProps.isDisabled}
          isValueHidden={sliderFieldProps.isValueHidden}
          labelHidden={sliderFieldProps.labelHidden}
          emptyTrackColor={sliderFieldProps.emptyTrackColor}
          filledTrackColor={sliderFieldProps.filledTrackColor}
          thumbColor={sliderFieldProps.thumbColor}
          trackSize={sliderFieldProps.trackSize}
          size={sliderFieldProps.size}
        />
      </Example>
    </Flex>
  );
};
