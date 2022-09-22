import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { select } from '@storybook/addon-knobs';
import { Checkbox } from '@aws-amplify/ui-react-native/dist/primitives';

const StatefulCheckbox = ({ ...props }: any) => {
  const [value, setValue] = useState(props.value);
  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  return <Checkbox {...props} value={value} onChange={onChange} size={20} />;
};
storiesOf('Checkbox', module)
  .add('default', () => <StatefulCheckbox />)
  .add('with Label', () => (
    <StatefulCheckbox
      label="Label"
      labelPosition={select(
        'LabelPosition',
        ['start', 'end', 'top', 'bottom'],
        'end'
      )}
    />
  ))
  .add('selected', () => <StatefulCheckbox selected />)
  .add('disabled', () => <StatefulCheckbox label="Disabled" disabled />);
