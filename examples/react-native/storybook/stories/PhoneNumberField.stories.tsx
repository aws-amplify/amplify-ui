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
  fieldStyle: { backgroundColor: 'red' },
});

const props: PhoneNumberFieldProps = {
  style: styles.container,
};

storiesOf('PhoneNumberField', module)
  .add('default', () => <PhoneNumberField {...props} />)
  .add('disabled', () => <PhoneNumberField {...props} disabled />)
  .add('styled', () => (
    <PhoneNumberField
      {...props}
      style={styles.container}
      fieldStyle={styles.fieldStyle}
    >
      Input should be red
    </PhoneNumberField>
  ));
