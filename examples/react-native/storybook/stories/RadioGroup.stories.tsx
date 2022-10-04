import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  Radio,
  RadioGroup,
} from '@aws-amplify/ui-react-native/dist/primitives';

const StatefulRadioGroup = ({ ...props }: any) => {
  const [value, setValue] = useState(props.value);
  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  return (
    <RadioGroup {...props} value={value} onChange={onChange}>
      <Radio value="option-1" label="Option 1" />
      <Radio value="option-2" label="Option 2" />
      <Radio value="option-3" label="Option 3" />
    </RadioGroup>
  );
};

const CustomRadioGroup = ({ ...props }: any) => {
  const [value, setValue] = useState<string>('green');
  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  return (
    <RadioGroup {...props} value={value} onChange={onChange}>
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
  .add('default', () => <StatefulRadioGroup label="Basic RadioGroup" />)
  .add('defaultValue', () => (
    <StatefulRadioGroup label="Default value" defaultValue="option-2" />
  ))
  .add('direction', () => (
    <StatefulRadioGroup label="Horizontal" direction="horizontal" />
  ))
  .add('disabled', () => (
    <StatefulRadioGroup label="All options should be disabled" disabled />
  ))
  .add('labelStyle', () => (
    <StatefulRadioGroup
      label="This should be red"
      labelStyle={styles.redText}
    />
  ))
  .add('size', () => (
    <StatefulRadioGroup label="Radios should be small" size="small" />
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
