import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSignUpProps } from '../types';

const COMPONENT_NAME = 'SignUp';

const {
  getCreateAccountText,
  getCreatingAccountText,
  getSignInTabText,
  getSignUpTabText,
} = authenticatorTextUtil;

const SignUp = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  hasValidationErrors,
  hideSignIn,
  isPending,
  toSignIn,
  validationErrors,
  ...rest
}: DefaultSignUpProps): JSX.Element => {
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
  const headerText = getSignUpTabText();
  const primaryButtonText = isPending
    ? getCreatingAccountText()
    : getCreateAccountText();
  const secondaryButtonText = getSignInTabText();

  const buttons = useMemo(
    () => ({
      primary: {
        children: primaryButtonText,
        disabled,
        onPress: handleFormSubmit,
      },
      links: hideSignIn
        ? undefined
        : [{ children: secondaryButtonText, onPress: toSignIn }],
    }),
    [
      disabled,
      handleFormSubmit,
      hideSignIn,
      primaryButtonText,
      secondaryButtonText,
      toSignIn,
    ]
  );

  return (
    <DefaultContent
      {...rest}
      buttons={buttons}
      fields={fieldsWithHandlers}
      headerText={headerText}
      isPending={isPending}
      validationErrors={fieldValidationErrors}
    />
  );
};

SignUp.Footer = DefaultFooter;
SignUp.FormFields = DefaultTextFormFields;
SignUp.Header = DefaultHeader;

SignUp.displayName = COMPONENT_NAME;
export default SignUp;
