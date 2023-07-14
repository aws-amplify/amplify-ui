import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmResetPasswordProps } from '../types';

const COMPONENT_NAME = 'ConfirmResetPassword';

const {
  getResetYourPasswordText,
  getSubmitText,
  getSubmittingText,
  getResendCodeText,
} = authenticatorTextUtil;

const ConfirmResetPassword = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  hasValidationErrors,
  isPending,
  resendCode,
  validationErrors,
  ...rest
}: DefaultConfirmResetPasswordProps): JSX.Element => {
  const {
    disableFormSubmit,
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

  const disabled = hasValidationErrors || disableFormSubmit;
  const headerText = getResetYourPasswordText();
  const primaryButtonText = isPending ? getSubmittingText() : getSubmitText();
  const secondaryButtonText = getResendCodeText();

  const buttons = useMemo(
    () => ({
      primary: {
        children: primaryButtonText,
        disabled,
        onPress: handleFormSubmit,
      },
      secondary: { children: secondaryButtonText, onPress: resendCode },
    }),
    [
      disabled,
      handleFormSubmit,
      primaryButtonText,
      resendCode,
      secondaryButtonText,
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

ConfirmResetPassword.Footer = DefaultFooter;
ConfirmResetPassword.FormFields = DefaultTextFormFields;
ConfirmResetPassword.Header = DefaultHeader;

ConfirmResetPassword.displayName = COMPONENT_NAME;
export default ConfirmResetPassword;
