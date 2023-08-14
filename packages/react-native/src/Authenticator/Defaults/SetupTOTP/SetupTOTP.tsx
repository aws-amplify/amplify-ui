import React, { useMemo } from 'react';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Label } from '../../../primitives';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSetupTOTPProps } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'SetupTOTP';

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getSetupTOTPText,
  getSetupTOTPInstructionsText,
} = authenticatorTextUtil;

const SetupTOTP = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  toSignIn,
  totpSecretCode,
  validationErrors,
  ...rest
}: DefaultSetupTOTPProps): JSX.Element => {
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

  const headerText = getSetupTOTPText();
  const primaryButtonText = isPending ? getConfirmingText() : getConfirmText();
  const secondaryButtonText = getBackToSignInText();

  const body = (
    <>
      <Label style={styles.secretKeyText}>
        {getSetupTOTPInstructionsText()}
      </Label>
      <Label selectable style={styles.secretKeyText}>
        {totpSecretCode}
      </Label>
    </>
  );

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
      body={body}
      buttons={buttons}
      headerText={headerText}
      fields={fieldsWithHandlers}
      isPending={isPending}
      validationErrors={fieldValidationErrors}
    />
  );
};

SetupTOTP.Footer = DefaultFooter;
SetupTOTP.FormFields = DefaultTextFormFields;
SetupTOTP.Header = DefaultHeader;

SetupTOTP.displayName = COMPONENT_NAME;
export default SetupTOTP;
