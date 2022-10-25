import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';
import { CodeDeliveryDetails } from '@aws-amplify/ui';

const codeDeliveryDetails: CodeDeliveryDetails = {
  AttributeName: 'email',
  DeliveryMedium: 'EMAIL',
  Destination: 'a***@e***.com',
};

const props = {
  codeDeliveryDetails,
  fields: [],
  Footer: Authenticator.ConfirmSignUp.Footer,
  FormFields: Authenticator.ConfirmSignUp.FormFields,
  Header: Authenticator.ConfirmSignUp.Header,
  hideSignUp: false,
  isPending: false,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  error: null as unknown as string,
  resendCode: noop,
};

storiesOf('ConfirmSignUp', module)
  .add('default', () => <Authenticator.ConfirmSignUp {...props} />)
  .add('with error', () => (
    <Authenticator.ConfirmSignUp {...props} error={'Error!'} />
  ))
  .add('pending', () => <Authenticator.ConfirmSignUp {...props} isPending />);
