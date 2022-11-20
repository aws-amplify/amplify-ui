import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultHeader,
  DefaultRadioFormFields,
} from '../../common';
import { useFieldValues } from '../../hooks';
import { DefaultVerifyUserComponent } from '../types';

const COMPONENT_NAME = 'VerifyUser';

const {
  getSkipText,
  getVerifyContactText,
  getVerifyText,
  getAccountRecoveryInfoText,
} = authenticatorTextUtil;

const VerifyUser: DefaultVerifyUserComponent = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  skipVerification,
  ...rest
}) => {
  const { fields: fieldsWithHandlers, handleFormSubmit } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  const headerText = getVerifyContactText();
  const skipText = getSkipText();
  const verifyText = getVerifyText();
  const bodyText = getAccountRecoveryInfoText();

  const buttons = useMemo(
    () => ({
      primary: { children: verifyText, onPress: handleFormSubmit },
      links: [{ children: skipText, onPress: skipVerification }],
    }),
    [handleFormSubmit, skipText, skipVerification, verifyText]
  );

  return (
    <DefaultContent
      {...rest}
      body={bodyText}
      buttons={buttons}
      fields={fieldsWithHandlers}
      headerText={headerText}
    />
  );
};

VerifyUser.Footer = DefaultFooter;
VerifyUser.FormFields = DefaultRadioFormFields;
VerifyUser.Header = DefaultHeader;

VerifyUser.displayName = COMPONENT_NAME;
export default VerifyUser;
