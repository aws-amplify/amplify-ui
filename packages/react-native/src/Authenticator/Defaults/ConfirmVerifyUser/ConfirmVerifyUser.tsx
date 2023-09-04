import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmVerifyUserProps } from '../types';

const COMPONENT_NAME = 'ConfirmVerifyUser';

const {
  getAccountRecoveryInfoText,
  getSkipText,
  getSubmitText,
  getSubmittingText,
} = authenticatorTextUtil;

const ConfirmVerifyUser = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  skipVerification,
  validationErrors,
  ...rest
}: DefaultConfirmVerifyUserProps): JSX.Element => {
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

  const headerText = getAccountRecoveryInfoText();
  const primaryButtonText = isPending ? getSubmittingText() : getSubmitText();
  const secondaryButtonText = getSkipText();

  const buttons = useMemo(
    () => ({
      primary: {
        children: primaryButtonText,
        disabled,
        onPress: handleFormSubmit,
      },
      links: [{ children: secondaryButtonText, onPress: skipVerification }],
    }),
    [
      disabled,
      handleFormSubmit,
      primaryButtonText,
      skipVerification,
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

ConfirmVerifyUser.Footer = DefaultFooter;
ConfirmVerifyUser.FormFields = DefaultTextFormFields;
ConfirmVerifyUser.Header = DefaultHeader;

ConfirmVerifyUser.displayName = COMPONENT_NAME;
export default ConfirmVerifyUser;
