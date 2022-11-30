import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
  DefaultContent,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSignInComponent } from '../types';

const COMPONENT_NAME = 'SignIn';

const SignIn: DefaultSignInComponent = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  hideSignUp,
  toResetPassword,
  toSignUp,
  ...rest
}) => {
  const {
    getSignInTabText,
    getSignInText,
    getSignUpTabText,
    getForgotPasswordText,
  } = authenticatorTextUtil;

  const { fields: fieldsWithHandlers, handleFormSubmit } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  const headerText = getSignInTabText();
  const forgotPasswordText = getForgotPasswordText(true);
  const signInText = getSignInText();
  const signUpText = getSignUpTabText();

  const buttons = useMemo(() => {
    const forgotPassword = {
      children: forgotPasswordText,
      onPress: toResetPassword,
    };
    return {
      primary: { children: signInText, onPress: handleFormSubmit },
      links: hideSignUp
        ? [forgotPassword]
        : [forgotPassword, { children: signUpText, onPress: toSignUp }],
    };
  }, [
    forgotPasswordText,
    handleFormSubmit,
    hideSignUp,
    signInText,
    signUpText,
    toResetPassword,
    toSignUp,
  ]);

  return (
    <DefaultContent
      {...rest}
      buttons={buttons}
      fields={fieldsWithHandlers}
      headerText={headerText}
    />
  );
};

SignIn.Footer = DefaultFooter;
SignIn.FormFields = DefaultTextFormFields;
SignIn.Header = DefaultHeader;

SignIn.displayName = COMPONENT_NAME;
export default SignIn;
