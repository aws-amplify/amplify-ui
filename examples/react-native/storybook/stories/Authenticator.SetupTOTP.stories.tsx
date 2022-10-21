import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.SetupTOTP', module)
  .add('default', () => <Authenticator.SetupTOTP {...props} />)
  .add('header', () => <Authenticator.SetupTOTP.Header />)
  .add('footer', () => <Authenticator.SetupTOTP.Footer />)
  .add('formFields', () => <Authenticator.SetupTOTP.FormFields {...props} />);
