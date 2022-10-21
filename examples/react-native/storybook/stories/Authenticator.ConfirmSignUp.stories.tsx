import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.ConfirmSignUp', module)
  .add('default', () => <Authenticator.ConfirmSignUp {...props} />)
  .add('header', () => <Authenticator.ConfirmSignUp.Header />)
  .add('footer', () => <Authenticator.ConfirmSignUp.Footer />)
  .add('formFields', () => (
    <Authenticator.ConfirmSignUp.FormFields {...props} />
  ));
