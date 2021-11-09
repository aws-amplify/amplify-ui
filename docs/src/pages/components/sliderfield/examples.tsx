import * as React from 'react';

import { Button, SliderField } from '@aws-amplify/ui-react';

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const ControlledSliderField = () => {
  const [value, setValue] = React.useState(50);
  return (
    <SliderField
      label="Controlled slider"
      min={0}
      max={100}
      step={1}
      value={value}
      onChange={setValue}
      labelHidden
    />
  );
};

export const SliderInForm = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    alert(event.target.slider.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <SliderField
        name="slider"
        label="Slider"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        labelHidden
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const DaySlider = () => {
  const [value, setValue] = React.useState(2);
  return (
    <SliderField
      ariaValuetext={dayNames[value]}
      label="Day slider"
      min={0}
      max={6}
      step={1}
      value={value}
      onChange={setValue}
      labelHidden
    />
  );
};
