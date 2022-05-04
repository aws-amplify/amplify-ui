import * as React from 'react';
import { SliderField } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { SliderFieldPropControls } from './SliderFieldPropControls';
import { useSliderFieldProps } from './useSliderFieldProps';

const propsToCode = (props) => {
  return (
    `<SliderField` +
    (props.variation
      ? `\n  variation=${JSON.stringify(props.variation)}`
      : '') +
    `
  isDismissible={${props.isDismissible}}
  hasIcon={${props.hasIcon}}
  heading="${props.heading}"
  >
  ${props.body}
/>`
  );
};

export const SliderFieldDemo = () => {
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
        // what is defaultValue?
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

/*
import * as React from 'react';

import { Flex, SliderField } from '@aws-amplify/ui-react';

import { SliderFieldPropControls } from 'src/pages/components/sliderfield/SliderFieldPropControls';
import { useSliderFieldProps } from 'src/pages/components/sliderfield/useSliderFieldProps';
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
*/
