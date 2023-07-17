import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultForceNewPasswordProps } from '../types';

const COMPONENT_NAME = 'ForceNewPassword';

const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

const ForceNewPassword = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  hasValidationErrors,
  isPending,
  toSignIn,
  ...rest
}: DefaultForceNewPasswordProps): JSX.Element => {
  const {
    disableFormSubmit,
    fields: fieldsWithHandlers,
    handleFormSubmit,
  } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  const disabled = hasValidationErrors || disableFormSubmit;
  const headerText = getChangePasswordText();
  const primaryButtonText = isPending
    ? getChangingText()
    : getChangePasswordText();
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
    />
  );
};

ForceNewPassword.Footer = DefaultFooter;
ForceNewPassword.FormFields = DefaultTextFormFields;
ForceNewPassword.Header = DefaultHeader;

ForceNewPassword.displayName = COMPONENT_NAME;
export default ForceNewPassword;
