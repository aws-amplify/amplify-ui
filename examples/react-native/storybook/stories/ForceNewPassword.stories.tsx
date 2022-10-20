import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ForceNewPassword } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('ForceNewPassword', module)
  .add('default', () => <ForceNewPassword {...props} />)
  .add('header', () => <ForceNewPassword.Header />)
  .add('footer', () => <ForceNewPassword.Footer />)
  .add('formFields', () => <ForceNewPassword.FormFields {...props} />);
