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

import { DefaultSetupTotpProps } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'SetupTotp';

const {
  getBackToSignInText,
  getConfirmingText,
  getConfirmText,
  getSetupTotpText,
  getSetupTotpInstructionsText,
} = authenticatorTextUtil;

const SetupTotp = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  toSignIn,
  totpSecretCode,
  validationErrors,
  ...rest
}: DefaultSetupTotpProps): JSX.Element => {
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

  const headerText = getSetupTotpText();
  const primaryButtonText = isPending ? getConfirmingText() : getConfirmText();
  const secondaryButtonText = getBackToSignInText();

  const body = (
    <>
      <Label style={styles.secretKeyText}>
        {getSetupTotpInstructionsText()}
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

SetupTotp.Footer = DefaultFooter;
SetupTotp.FormFields = DefaultTextFormFields;
SetupTotp.Header = DefaultHeader;

SetupTotp.displayName = COMPONENT_NAME;
export default SetupTotp;
