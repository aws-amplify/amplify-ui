import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import {
  PhoneNumberField,
  PhoneNumberFieldProps,
} from '@aws-amplify/ui-react-native/dist/primitives';

const styles = StyleSheet.create({
  container: {
    width: '75%',
  },
  inputStyle: {
    width: '50%',
  },
  picker: {
    color: 'red',
    fontSize: 16,
    width: '50%',
  },
  pickerItem: {
    color: 'red',
    fontSize: 16,
  },
});

const codes = ['+1', '+7', '+20', '+27', '+30'];
const props: PhoneNumberFieldProps = {
  style: styles.container,
  defaultDialCode: '+1',
  dialCodes: codes,
};

storiesOf('PhoneNumberField', module)
  .add('default', () => <PhoneNumberField {...props} />)
  .add('disabled', () => <PhoneNumberField {...props} disabled />)
  .add('styled', () => (
    <PhoneNumberField
      {...props}
      style={styles.container}
      inputStyle={styles.inputStyle}
      pickerStyle={styles.picker}
      pickerItemStyle={styles.pickerItem}
    >
      Dial code should be red
    </PhoneNumberField>
  ));
