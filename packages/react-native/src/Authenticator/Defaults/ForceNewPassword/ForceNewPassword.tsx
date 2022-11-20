import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultForceNewPasswordComponent } from '../types';

const COMPONENT_NAME = 'ForceNewPassword';

const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

const ForceNewPassword: DefaultForceNewPasswordComponent = ({
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

  const headerText = getChangePasswordText();
  const primaryButtonText = isPending
    ? getChangingText()
    : getChangePasswordText();
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

ForceNewPassword.Footer = DefaultFooter;
ForceNewPassword.FormFields = DefaultTextFormFields;
ForceNewPassword.Header = DefaultHeader;

ForceNewPassword.displayName = COMPONENT_NAME;
export default ForceNewPassword;
