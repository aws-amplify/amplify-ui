import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SignUp } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('SignUp', module)
  .add('default', () => <SignUp {...props} />)
  .add('header', () => <SignUp.Header />)
  .add('footer', () => <SignUp.Footer />)
  .add('formFields', () => <SignUp.FormFields {...props} />);
