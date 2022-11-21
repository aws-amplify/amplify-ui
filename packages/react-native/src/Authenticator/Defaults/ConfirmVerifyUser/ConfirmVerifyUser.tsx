import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmVerifyUserComponent } from '../types';

const COMPONENT_NAME = 'ConfirmVerifyUser';

const {
  getAccountRecoveryInfoText,
  getSkipText,
  getSubmitText,
  getSubmittingText,
} = authenticatorTextUtil;

const ConfirmVerifyUser: DefaultConfirmVerifyUserComponent = ({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
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

  const headerText = getAccountRecoveryInfoText();
  const primaryButtonText = isPending ? getSubmittingText() : getSubmitText();
  const secondaryButtonText = getSkipText();

  const buttons = useMemo(
    () => ({
      primary: { children: primaryButtonText, onPress: handleFormSubmit },
      links: [{ children: secondaryButtonText, onPress: skipVerification }],
    }),
    [handleFormSubmit, primaryButtonText, skipVerification, secondaryButtonText]
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

ConfirmVerifyUser.Footer = DefaultFooter;
ConfirmVerifyUser.FormFields = DefaultTextFormFields;
ConfirmVerifyUser.Header = DefaultHeader;

ConfirmVerifyUser.displayName = COMPONENT_NAME;
export default ConfirmVerifyUser;
