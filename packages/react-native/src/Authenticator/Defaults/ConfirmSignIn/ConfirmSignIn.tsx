import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmSignInComponent } from '../types';

const COMPONENT_NAME = 'ConfirmSignIn';

const {
  getBackToSignInText,
  getChallengeText,
  getConfirmText,
  getConfirmingText,
} = authenticatorTextUtil;

const ConfirmSignIn: DefaultConfirmSignInComponent = ({
  challengeName,
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  toSignIn,
  validationErrors,
  ...rest
}) => {
  const {
    disableFormSubmit: disabled,
    fields: fieldsWithHandlers,
    formValidationErrors,
    handleFormSubmit,
  } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
    validationErrors,
  });

  const headerText = getChallengeText(challengeName);
  const primaryButtonText = isPending ? getConfirmingText() : getConfirmText();
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
      validationErrors={formValidationErrors}
    />
  );
};

ConfirmSignIn.Footer = DefaultFooter;
ConfirmSignIn.FormFields = DefaultTextFormFields;
ConfirmSignIn.Header = DefaultHeader;

ConfirmSignIn.displayName = COMPONENT_NAME;
export default ConfirmSignIn;
