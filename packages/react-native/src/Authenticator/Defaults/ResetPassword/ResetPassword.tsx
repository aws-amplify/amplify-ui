import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultResetPasswordComponent } from '../types';

const COMPONENT_NAME = 'ResetPassword';
const {
  getResetYourPasswordText,
  getSendCodeText,
  getSendingText,
  getBackToSignInText,
} = authenticatorTextUtil;

const ResetPassword: DefaultResetPasswordComponent = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  toSignIn,
  ...rest
}) => {
  const { fields: fieldsWithHandlers, handleFormSubmit } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  const headerText = getResetYourPasswordText();
  const primaryButtonText = isPending ? getSendingText() : getSendCodeText();
  const secondaryButtonText = getBackToSignInText();

  const buttons = useMemo(
    () => ({
      primary: { children: primaryButtonText, onPress: handleFormSubmit },
      links: [{ children: secondaryButtonText, onPress: toSignIn }],
    }),
    [handleFormSubmit, primaryButtonText, secondaryButtonText, toSignIn]
  );

  return (
    <DefaultContent
      {...rest}
      buttons={buttons}
      headerText={headerText}
      fields={fieldsWithHandlers}
      isPending={isPending}
    />
  );
};

ResetPassword.Footer = DefaultFooter;
ResetPassword.FormFields = DefaultTextFormFields;
ResetPassword.Header = DefaultHeader;

ResetPassword.displayName = COMPONENT_NAME;
export default ResetPassword;
