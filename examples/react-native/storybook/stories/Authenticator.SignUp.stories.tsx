import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.SignUp', module)
  .add('default', () => <Authenticator.SignUp {...props} />)
  .add('header', () => <Authenticator.SignUp.Header />)
  .add('footer', () => <Authenticator.SignUp.Footer />)
  .add('formFields', () => <Authenticator.SignUp.FormFields {...props} />);
