import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.SignIn', module)
  .add('default', () => <Authenticator.SignIn {...props} />)
  .add('header', () => <Authenticator.SignIn.Header />)
  .add('footer', () => <Authenticator.SignIn.Footer />)
  .add('formFields', () => <Authenticator.SignIn.FormFields {...props} />);
