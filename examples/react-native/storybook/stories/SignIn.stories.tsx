import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SignIn } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('SignIn', module)
  .add('default', () => <SignIn {...props} />)
  .add('header', () => <SignIn.Header />)
  .add('footer', () => <SignIn.Footer />)
  .add('formFields', () => <SignIn.FormFields fields={[]} />);
