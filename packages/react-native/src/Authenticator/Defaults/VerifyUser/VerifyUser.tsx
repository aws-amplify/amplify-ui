import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultHeader,
  DefaultVerifyUserFormFields,
} from '../../common';
import { useFieldValues } from '../../hooks';
import type { DefaultVerifyUserProps } from '../types';

const COMPONENT_NAME = 'VerifyUser';

const {
  getSkipText,
  getVerifyContactText,
  getVerifyText,
  getAccountRecoveryInfoText,
} = authenticatorTextUtil;

const VerifyUser = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  skipVerification,
  validationErrors,
  ...rest
}: DefaultVerifyUserProps): React.JSX.Element => {
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

  const headerText = getVerifyContactText();
  const skipText = getSkipText();
  const verifyText = getVerifyText();
  const bodyText = getAccountRecoveryInfoText();

  const buttons = useMemo(
    () => ({
      primary: { children: verifyText, disabled, onPress: handleFormSubmit },
      links: [{ children: skipText, onPress: skipVerification }],
    }),
    [disabled, handleFormSubmit, skipText, skipVerification, verifyText]
  );

  return (
    <DefaultContent
      {...rest}
      body={bodyText}
      buttons={buttons}
      fields={fieldsWithHandlers}
      headerText={headerText}
      validationErrors={fieldValidationErrors}
    />
  );
};

VerifyUser.Footer = DefaultFooter;
VerifyUser.FormFields = DefaultVerifyUserFormFields;
VerifyUser.Header = DefaultHeader;

VerifyUser.displayName = COMPONENT_NAME;
export default VerifyUser;
