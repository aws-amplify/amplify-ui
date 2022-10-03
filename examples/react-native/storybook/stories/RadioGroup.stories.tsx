import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
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

storiesOf('RadioGroup', module).add('default', () => (
  <StatefulRadioGroup label="This is the default" />
));

// const styles = StyleSheet.create({
//   redText: {
//     color: 'red',
//   },
// });
