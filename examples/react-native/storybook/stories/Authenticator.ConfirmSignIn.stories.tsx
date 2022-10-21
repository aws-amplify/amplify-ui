import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.ConfirmSignIn', module)
  .add('default', () => <Authenticator.ConfirmSignIn {...props} />)
  .add('header', () => <Authenticator.ConfirmSignIn.Header />)
  .add('footer', () => <Authenticator.ConfirmSignIn.Footer />)
  .add('formFields', () => (
    <Authenticator.ConfirmSignIn.FormFields {...props} />
  ));
