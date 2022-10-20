import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ConfirmSignUp } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('ConfirmSignUp', module)
  .add('default', () => <ConfirmSignUp {...props} />)
  .add('header', () => <ConfirmSignUp.Header />)
  .add('footer', () => <ConfirmSignUp.Footer />)
  .add('formFields', () => <ConfirmSignUp.FormFields {...props} />);
