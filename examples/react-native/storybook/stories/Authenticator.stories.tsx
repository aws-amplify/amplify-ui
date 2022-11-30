import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { AuthChallengeName, CodeDeliveryDetails } from '@aws-amplify/ui';
import { GetTotpSecretCode } from '@aws-amplify/ui-react-core/src/Authenticator/hooks';
import {
  InnerContainer,
  DefaultContainer,
} from '@aws-amplify/ui-react-native/src/Authenticator/common';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';

const componentFields = {
  code: {
    name: 'code',
    label: 'Code',
    placeholder: 'Code',
    type: 'default' as const,
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    type: 'password' as const,
  },
  newPassword: {
    name: 'newPassword',
    label: 'New Password',
    placeholder: 'New Password',
    type: 'password' as const,
  },
  password: {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password' as const,
  },
  phone: {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Phone',
    type: 'phone' as const,
  },
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
    type: 'default' as const,
  },
};

type Fields = keyof typeof componentFields;

const getComponentFields = (fields: Fields[]) => {
  return {
    fields: fields.map((field) => componentFields[field]),
  };
};

const getComponentSlots = (subcomponent: any) => {
  return {
    Footer: subcomponent.Footer,
    FormFields: subcomponent.FormFields,
    Header: subcomponent.Header,
  };
};

const sharedProps = {
  error: null as unknown as string,
  handleBlur: noop,
  handleChange: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  isPending: false,
};

const confirmResetPasswordProps = {
  ...sharedProps,
  ...getComponentFields(['code', 'newPassword', 'confirmPassword']),
  ...getComponentSlots(Authenticator.ConfirmResetPassword),
  resendCode: noop,
};

const confirmSignInProps = {
  ...sharedProps,
  ...getComponentFields(['code']),
  ...getComponentSlots(Authenticator.ConfirmSignIn),
  challengeName: 'SMS_MFA' as AuthChallengeName,
  toSignIn: noop,
};

const confirmSignUpProps = {
  ...sharedProps,
  ...getComponentFields(['code']),
  ...getComponentSlots(Authenticator.ConfirmSignUp),
  codeDeliveryDetails: {
    AttributeName: 'email',
    DeliveryMedium: 'EMAIL',
    Destination: 'a***@e***.com',
  } as CodeDeliveryDetails,
  resendCode: noop,
};

const confirmVerifyUserProps = {
  ...sharedProps,
  ...getComponentFields(['username']),
  ...getComponentSlots(Authenticator.ConfirmResetPassword),
  skipVerification: noop,
};

const forceNewPasswordProps = {
  ...sharedProps,
  ...getComponentFields(['newPassword', 'confirmPassword']),
  ...getComponentSlots(Authenticator.ForceNewPassword),
  toSignIn: noop,
};

const resetPasswordProps = {
  ...sharedProps,
  ...getComponentFields(['username']),
  ...getComponentSlots(Authenticator.ResetPassword),
  toSignIn: noop,
};

const setupTOTPProps = {
  ...sharedProps,
  ...getComponentFields(['code']),
  ...getComponentSlots(Authenticator.SetupTOTP),
  getTotpSecretCode: noop as GetTotpSecretCode,
  toSignIn: noop,
};

const signInProps = {
  ...sharedProps,
  ...getComponentFields(['username', 'password']),
  ...getComponentSlots(Authenticator.SignIn),
  toFederatedSignIn: noop,
  toResetPassword: noop,
  toSignUp: noop,
};

const signUpProps = {
  ...sharedProps,
  ...getComponentFields(['username', 'password', 'confirmPassword', 'phone']),
  ...getComponentSlots(Authenticator.SignUp),
  toFederatedSignIn: noop,
  toSignIn: noop,
};

const verifyUserProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.VerifyUser),
  fields: [
    { name: 'email', type: 'radio' as const, value: 'jeff@example.com' },
  ],
  skipVerification: noop,
};

storiesOf('Authenticator', module)
  .addDecorator((Story: any) => (
    <DefaultContainer>
      <InnerContainer>
        <Story />
      </InnerContainer>
    </DefaultContainer>
  ))
  .add('ConfirmResetPassword', () => (
    <Authenticator.ConfirmResetPassword {...confirmResetPasswordProps} />
  ))
  .add('ConfirmSignIn', () => (
    <Authenticator.ConfirmSignIn {...confirmSignInProps} />
  ))
  .add('ConfirmSignUp', () => (
    <Authenticator.ConfirmSignUp {...confirmSignUpProps} />
  ))
  .add('ConfirmVerifyUser', () => (
    <Authenticator.ConfirmVerifyUser {...confirmVerifyUserProps} />
  ))
  .add('ForceNewPassword', () => (
    <Authenticator.ForceNewPassword {...forceNewPasswordProps} />
  ))
  .add('ResetPassword', () => (
    <Authenticator.ResetPassword {...resetPasswordProps} />
  ))
  .add('SetupTOTP', () => <Authenticator.SetupTOTP {...setupTOTPProps} />)
  .add('SignIn', () => <Authenticator.SignIn {...signInProps} />)
  .add('SignUp', () => <Authenticator.SignUp {...signUpProps} />)
  .add('VerifyUser', () => <Authenticator.VerifyUser {...verifyUserProps} />);
