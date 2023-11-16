import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
  DefaultContent,
  FederatedProviderButtons,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSignInProps } from '../types';

const COMPONENT_NAME = 'SignIn';

const SignIn = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  hideSignUp,
  socialProviders,
  toFederatedSignIn,
  toForgotPassword,
  toSignUp,
  validationErrors,
  ...rest
}: DefaultSignInProps): JSX.Element => {
  const {
    getSignInTabText,
    getSignInText,
    getSignUpTabText,
    getForgotPasswordText,
  } = authenticatorTextUtil;

  const {
    disableFormSubmit: disabled,
    fields: fieldsWithHandlers,
    fieldValidationErrors,
    handleFormSubmit,
  } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
    validationErrors,
  });

  const headerText = getSignInTabText();
  const forgotPasswordText = getForgotPasswordText(true);
  const signInText = getSignInText();
  const signUpText = getSignUpTabText();

  const body = socialProviders ? (
    <FederatedProviderButtons
      route="signIn"
      socialProviders={socialProviders}
      toFederatedSignIn={toFederatedSignIn}
    />
  ) : null;

  const buttons = useMemo(() => {
    const forgotPassword = {
      children: forgotPasswordText,
      onPress: toForgotPassword,
    };
    return {
      primary: { children: signInText, disabled, onPress: handleFormSubmit },
      links: hideSignUp
        ? [forgotPassword]
        : [forgotPassword, { children: signUpText, onPress: toSignUp }],
    };
  }, [
    disabled,
    forgotPasswordText,
    handleFormSubmit,
    hideSignUp,
    signInText,
    signUpText,
    toForgotPassword,
    toSignUp,
  ]);

  return (
    <DefaultContent
      {...rest}
      body={body}
      buttons={buttons}
      fields={fieldsWithHandlers}
      headerText={headerText}
      validationErrors={fieldValidationErrors}
    />
  );
};

SignIn.Footer = DefaultFooter;
SignIn.FormFields = DefaultTextFormFields;
SignIn.Header = DefaultHeader;

SignIn.displayName = COMPONENT_NAME;
export default SignIn;
