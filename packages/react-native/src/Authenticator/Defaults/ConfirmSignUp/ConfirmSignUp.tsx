import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmSignUpProps } from '../types';

const COMPONENT_NAME = 'ConfirmSignUp';

const {
  getDeliveryMethodText,
  getDeliveryMessageText,
  getConfirmingText,
  getConfirmText,
  getResendCodeText,
} = authenticatorTextUtil;

const ConfirmSignUp = ({
  codeDeliveryDetails,
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  resendCode,
  validationErrors,
  ...rest
}: DefaultConfirmSignUpProps): JSX.Element => {
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

  const headerText = getDeliveryMethodText(codeDeliveryDetails);
  const bodyText = getDeliveryMessageText(codeDeliveryDetails);
  const primaryButtonText = isPending ? getConfirmingText() : getConfirmText();
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
      body={bodyText}
      buttons={buttons}
      headerText={headerText}
      fields={fieldsWithHandlers}
      isPending={isPending}
      validationErrors={fieldValidationErrors}
    />
  );
};

ConfirmSignUp.FormFields = DefaultTextFormFields;
ConfirmSignUp.Footer = DefaultFooter;
ConfirmSignUp.Header = DefaultHeader;

ConfirmSignUp.displayName = COMPONENT_NAME;
export default ConfirmSignUp;
