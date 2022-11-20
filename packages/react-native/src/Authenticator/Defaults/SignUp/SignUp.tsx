import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSignUpComponent } from '../types';

const COMPONENT_NAME = 'SignUp';

const { getCreateAccountText, getCreatingAccountText, getSignInTabText } =
  authenticatorTextUtil;

const SignUp: DefaultSignUpComponent = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  hideSignIn,
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

  const primaryButtonText = isPending
    ? getCreatingAccountText()
    : getCreateAccountText();
  const secondaryButtontext = getSignInTabText();

  const buttons = useMemo(
    () => ({
      primary: { children: primaryButtonText, onPress: handleFormSubmit },
      links: hideSignIn
        ? undefined
        : [{ children: secondaryButtontext, onPress: toSignIn }],
    }),
    [
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
      isPending={isPending}
    />
  );
};

SignUp.Footer = DefaultFooter;
SignUp.FormFields = DefaultTextFormFields;
SignUp.Header = DefaultHeader;

SignUp.displayName = COMPONENT_NAME;
export default SignUp;
