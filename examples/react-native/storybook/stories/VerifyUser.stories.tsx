import React from 'react';
import { storiesOf } from '@storybook/react-native';
import noop from 'lodash/noop';

import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {
  fields: [],
  Footer: Authenticator.VerifyUser.Footer,
  FormFields: Authenticator.VerifyUser.FormFields,
  Header: Authenticator.VerifyUser.Header,
  isPending: false,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  error: null as unknown as string,
  skipVerification: noop,
};

storiesOf('Authenticator.VerifyUser', module)
  .add('Default', () => <Authenticator.VerifyUser {...props} />)
  .add('With error', () => (
    <Authenticator.VerifyUser {...props} error={'Error!'} />
  ));
