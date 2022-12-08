import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  Radio,
  RadioGroup,
} from '@aws-amplify/ui-react-native/dist/primitives';

const ControlledRadioGroup = ({ ...props }: any) => {
  const [value, setValue] = useState(props.value);
  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  return (
    <RadioGroup {...props} initialValue={value} onChange={onChange}>
      <Radio value="option-1" label="Option 1" />
      <Radio value="option-2" label="Option 2" />
      <Radio value="option-3" label="Option 3" />
    </RadioGroup>
  );
};

const UncontrolledRadioGroup = ({ ...props }: any) => {
  const [selectedValue, setSelectedValue] = useState('Empty :(');

  return (
    <RadioGroup
      {...props}
      label={selectedValue}
      onValueChange={setSelectedValue}
    >
      <Radio value="option-1" label="Option 1" />
      <Radio value="option-2" label="Option 2" />
      <Radio value="option-3" label="Option 3" />
    </RadioGroup>
  );
};

const CustomRadioGroup = ({ ...props }: any) => {
  const [value, setValue] = useState('green');
  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  return (
    <RadioGroup {...props} initialValue={value} onChange={onChange}>
      <Radio value="small" label="Should be small" size="small" />
      <Radio
        value="red"
        label="Should be red text"
        labelStyle={styles.redText}
      />
      <Radio value="disabled" label="Should be disabled" disabled />
      <Radio
        value="green"
        label="Should be green dot"
        radioDotStyle={styles.radioDotStyle}
      />
    </RadioGroup>
  );
};

storiesOf('RadioGroup', module)
  .add('default', () => <ControlledRadioGroup label="Basic RadioGroup" />)
  .add('controlled', () => (
    <ControlledRadioGroup label="Defaults to Option 2" />
  ))
  .add('uncontrolled', () => <UncontrolledRadioGroup initialValue="option-2" />)
  .add('direction', () => (
    <>
      <ControlledRadioGroup label="Horizontal" direction="horizontal" />
      <ControlledRadioGroup label="Vertical" direction="vertical" />
    </>
  ))
  .add('disabled', () => (
    <ControlledRadioGroup label="All options should be disabled" disabled />
  ))
  .add('labelStyle', () => (
    <ControlledRadioGroup
      label="This should be red"
      labelStyle={styles.redText}
    />
  ))
  .add('size', () => (
    <ControlledRadioGroup label="Radios should be small" size="small" />
  ))
  .add('Radio overrides', () => <CustomRadioGroup label="Custom overrides" />);

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
  radioDotStyle: {
    backgroundColor: 'green',
  },
});
