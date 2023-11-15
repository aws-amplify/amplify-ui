import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultForgotPasswordProps } from '../types';

const COMPONENT_NAME = 'ForgotPassword';
const {
  getResetYourPasswordText,
  getSendCodeText,
  getSendingText,
  getBackToSignInText,
} = authenticatorTextUtil;

const ForgotPassword = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  toSignIn,
  validationErrors,
  ...rest
}: DefaultForgotPasswordProps): JSX.Element => {
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

  const headerText = getResetYourPasswordText();
  const primaryButtonText = isPending ? getSendingText() : getSendCodeText();
  const secondaryButtonText = getBackToSignInText();

  const buttons = useMemo(
    () => ({
      primary: {
        children: primaryButtonText,
        disabled,
        onPress: handleFormSubmit,
      },
      links: [{ children: secondaryButtonText, onPress: toSignIn }],
    }),
    [
      disabled,
      handleFormSubmit,
      primaryButtonText,
      secondaryButtonText,
      toSignIn,
    ]
  );

  return (
    <DefaultContent
      {...rest}
      buttons={buttons}
      headerText={headerText}
      fields={fieldsWithHandlers}
      isPending={isPending}
      validationErrors={fieldValidationErrors}
    />
  );
};

ForgotPassword.Footer = DefaultFooter;
ForgotPassword.FormFields = DefaultTextFormFields;
ForgotPassword.Header = DefaultHeader;

ForgotPassword.displayName = COMPONENT_NAME;
export default ForgotPassword;
